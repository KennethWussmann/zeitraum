/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var url string
var token string

// loginCmd represents the login command
var loginCmd = &cobra.Command{
	Use:   "login",
	Short: "Login to your Zeitraum server",
	Long:  `Given the URL of your server and an API token, a config file is created that will hold the credentials for future requests. It's required to run login at least once before using the CLI.`,
	Run: func(cmd *cobra.Command, args []string) {
		username, err := IsAuthenticated(ClientOptions{&url, &token})
		if err != nil {
			fmt.Println("Server not reachable or credentials ivaild.")
			os.Exit(1)
			return
		}
		viper.Set("url", url)
		viper.Set("token", token)
		viper.Set("username", username)
		viper.WriteConfig()
		fmt.Println("Logged in successfully. Welcome " + *username + "!")
	},
}

func init() {
	rootCmd.AddCommand(loginCmd)

	loginCmd.Flags().StringVarP(&url, "url", "u", "", "URL of Zeitraum server (required)")
	loginCmd.Flags().StringVarP(&token, "token", "t", "", "API token for Zeitraum server (required)")
	loginCmd.MarkFlagRequired("url")
	loginCmd.MarkFlagRequired("token")
}
