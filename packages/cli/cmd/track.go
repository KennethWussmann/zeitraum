package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/spf13/cobra"
)

var startArg, endArg, noteArg string

var trackCmd = &cobra.Command{
	Use:   "track",
	Aliases: []string{"start", "open"},
	Short: "Track a time span",
	Run: func(cmd *cobra.Command, args []string) {
		format := GetOutputFormat(cmd)
		client := CreateClient(ClientOptions{})

		startParsed, _ := ParseDateTimeInput(startArg)
		endParsed, _ := ParseDateTimeInput(endArg)

		var note *string = nil
		if cmd.Flag("note").Changed {
			note = &noteArg
		}

		var start time.Time = time.Now()
		if startParsed != nil {
			start = *startParsed
		}
	
		response, err := createTimeSpan(context.Background(), client, &CreateUpdateTimeSpan{
			Start: start,
			End: endParsed,
			Tags: args,
			Note: note,
		})

		if (err != nil) {
			if (format == "json") {
				json, _ := json.MarshalIndent(err, "", "  ")
				fmt.Println(string(json))
				os.Exit(1)
				return
			}
			panic(err)
		}

		if (format == "json") {
			json, _ := json.MarshalIndent(response, "", "  ")
			fmt.Println(string(json))
			return
		}

		fmt.Println("Created time span")
	},
	Args: cobra.ArbitraryArgs,
}

func init() {
	rootCmd.AddCommand(trackCmd)

	trackCmd.Flags().StringVarP(&startArg, "start", "s", "now", "Set start time")
	trackCmd.Flags().StringVarP(&endArg, "end", "e", "", "Set end time")
	trackCmd.Flags().StringVarP(&noteArg, "note", "n", "", "Set note")
}
