package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

var removeIdArg string

var removeCmd = &cobra.Command{
	Use:     "remove",
	Aliases: []string{"rm"},
	Short:   "Remove a time span",
	Long:    `Supply the number of the list command (without any filters applied) to remove a specific time span.`,
	Args:    cobra.MaximumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		format := GetOutputFormat(cmd)
		client := CreateClient(ClientOptions{})

		var err error
		var id string
		if removeIdArg != "" {
			id = removeIdArg
		} else {
			if len(args) > 0 {
				var idFound string
				idFound, err = GetIdByIndex(client, args[0])
				if err != nil {
					if format == "json" {
						json, _ := json.MarshalIndent(err, "", "  ")
						fmt.Println(string(json))
						os.Exit(1)
						return
					}
					fmt.Println("Time span by index not found: ", err)
					os.Exit(1)
					return
				}
				id = idFound
			}
		}

		if id == "" {
			panic("no time span specified")
		}

		response, err := deleteTimeSpan(context.Background(), client, id)

		if err != nil {
			if format == "json" {
				json, _ := json.MarshalIndent(err, "", "  ")
				fmt.Println(string(json))
				os.Exit(1)
				return
			}
			fmt.Println("Time span not found")
			os.Exit(1)
			return
		}

		if format == "json" {
			json, _ := json.MarshalIndent(response, "", "  ")
			fmt.Println(string(json))
			return
		}

		fmt.Println("Removed time span")
	},
}

func init() {
	rootCmd.AddCommand(removeCmd)
	removeCmd.Flags().StringVarP(&removeIdArg, "id", "i", "", "Remove time span by id")
}
