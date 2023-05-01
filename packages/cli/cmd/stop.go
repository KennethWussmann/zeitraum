package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strconv"
	"time"

	"github.com/Khan/genqlient/graphql"
	"github.com/spf13/cobra"
)

func GetIdByIndex(client graphql.Client, index string) (string, error) {
	response, err := timeSpans(context.Background(), client, &TimeSpanSearch{
		FromInclusive: nil,
		ToInclusive: nil,
		Running: nil,
		Limit: nil,
		Offset: nil,
	})

	if (err != nil) {
		return "", err
	}

	if (len(response.TimeSpans.Items) == 0) {
		return "", fmt.Errorf("no time spans found")
	}
	if (index == "") {
		return response.TimeSpans.Items[0].Id, nil
	}

	var parsedIndex int
	parsedIndex, err = strconv.Atoi(index)
	if (err != nil) {
		return "", err
	}

	item := response.TimeSpans.Items[parsedIndex]
	if (err != nil) {
		return "", fmt.Errorf("no time span found with index %s", index)
	}

	return item.Id, nil
}

var stopEndArg, idArg string

var stopCmd = &cobra.Command{
	Use:   "stop",
	Aliases: []string{"close", "end"},
	Args: cobra.MaximumNArgs(1),
	Short: "Stop a running time span",
	Long: `The time span that is running longest will be stopped first. Supply the number of the list command (without any filters applied) to stop a specific time span.`,
	Run: func(cmd *cobra.Command, args []string) {
		format := GetOutputFormat(cmd)
		client := CreateClient(ClientOptions{})

		endParsed, _ := ParseDateTimeInput(stopEndArg)

		var err error
		var id *string = nil
		if idArg != "" {
			id = &idArg
		} else {
			if (len(args) > 0) {
				var idFound string
				idFound, err = GetIdByIndex(client, args[0])
				if (err != nil) {
					if (format == "json") {
						json, _ := json.MarshalIndent(err, "", "  ")
						fmt.Println(string(json))
						os.Exit(1)
						return
					}
					fmt.Println("Time span by index not found: ", err)
					os.Exit(1)
					return
				}
				id = &idFound
			}
		}

		response, err := closeTimeSpan(context.Background(), client, id, endParsed)

		if (err != nil) {
			if (format == "json") {
				json, _ := json.MarshalIndent(err, "", "  ")
				fmt.Println(string(json))
				os.Exit(1)
				return
			}
			fmt.Println("No running time span found")
			os.Exit(1)
			return
		}

		if (format == "json") {
			json, _ := json.MarshalIndent(response, "", "  ")
			fmt.Println(string(json))
			return
		}

		var end time.Time = time.Now()
		if response.CloseTimeSpan.End != nil {
			end = *response.CloseTimeSpan.End
		}

		fmt.Println("Stopped time span:", FormatTimerRuntime(response.CloseTimeSpan.Start, end))
	},
}

func init() {
	rootCmd.AddCommand(stopCmd)
	stopCmd.Flags().StringVarP(&stopEndArg, "end", "e", "", "Set custom end time")
	stopCmd.Flags().StringVarP(&idArg, "id", "i", "", "Stop time span by id")
}
