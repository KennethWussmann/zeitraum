package cmd

import (
	"context"
	"net/http"

	"github.com/Khan/genqlient/graphql"
	"github.com/spf13/viper"
)

type authedTransport struct {
	token     string
	wrapped http.RoundTripper
}

func (t *authedTransport) RoundTrip(req *http.Request) (*http.Response, error) {
	req.Header.Set("Authorization", "Bearer "+t.token)
	req.Header.Set("User-Agent", "zeitraum/cli")
	return t.wrapped.RoundTrip(req)
}

type ClientOptions struct {
  baseUrl, token *string
}

func CreateClient(options ClientOptions) graphql.Client {
	var baseUrl, token string
	if options.baseUrl != nil {
		baseUrl = *options.baseUrl
	} else {
		baseUrl = viper.GetString("url")
	}
	if options.token != nil {
		token = *options.token
	} else {
		token = viper.GetString("token")
	}
	httpClient := http.Client{
		Transport: &authedTransport{
			token:     token,
			wrapped: http.DefaultTransport,
		},
	}
	return graphql.NewClient(baseUrl + "/graphql", &httpClient)
}

func IsAuthenticated(options ClientOptions) (*string, error) {
	client := CreateClient(options)
	response, err := me(context.Background(), client)
	if (err != nil) {
		return nil, err
	}
	return &response.Me.Username, nil
}