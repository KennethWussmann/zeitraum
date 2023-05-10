package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"github.com/Khan/genqlient/graphql"
	"github.com/spf13/cobra"
)

func getTimeSpanById(client graphql.Client, id string) (*timeSpanTimeSpan, error) {
	response, err := timeSpan(context.Background(), client, id)
	if err != nil {
		return nil, err
	}
	return response.TimeSpan, nil
}

var editIdArg, editStartArg, editEndArg, editNoteArg string
var editTagsArg []string

var editCmd = &cobra.Command{
	Use:     "edit",
	Aliases: []string{"update"},
	Short:   "Edit a time span",
	Long:    `Supply the number of the list command (without any filters applied) to edit a specific time span.`,
	Args:    cobra.MaximumNArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		VerifyConfiguration()
		format := GetOutputFormat(cmd)
		client := CreateClient(ClientOptions{})

		var err error
		var id string
		if editIdArg != "" {
			id = editIdArg
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

		_, err = getTimeSpanById(client, id)

		if err != nil {
			if format == "json" {
				json, _ := json.MarshalIndent(err, "", "  ")
				fmt.Println(string(json))
				os.Exit(1)
				return
			}
			fmt.Println("Time span by id not found: ", err)
			os.Exit(1)
		}

		startParsed, _ := ParseDateTimeInput(editStartArg)
		endParsed, _ := ParseDateTimeInput(editEndArg)

		var note *string = nil
		if cmd.Flag("note").Changed {
			note = &editNoteArg
		}

		var tags []string = nil
		if cmd.Flag("tags").Changed {
			tags = editTagsArg
		}

		response, err := updateTimeSpan(context.Background(), client, id, &UpdateTimeSpan{
			Start: startParsed,
			End:   endParsed,
			Tags:  tags,
			Note:  note,
		})

		if err != nil {
			if format == "json" {
				json, _ := json.MarshalIndent(err, "", "  ")
				fmt.Println(string(json))
				os.Exit(1)
				return
			}
			panic(err)
		}

		if format == "json" {
			json, _ := json.MarshalIndent(response, "", "  ")
			fmt.Println(string(json))
			return
		}

		fmt.Println("Updated time span")
	},
}

func init() {
	rootCmd.AddCommand(editCmd)
	editCmd.Flags().StringVarP(&editIdArg, "id", "i", "", "Remove time span by id")
	editCmd.Flags().StringVarP(&editStartArg, "start", "s", "", "Overwrite start time")
	editCmd.Flags().StringVarP(&editEndArg, "end", "e", "", "Overwrite end time")
	editCmd.Flags().StringVarP(&editNoteArg, "note", "n", "", "Overwrite note")
	editCmd.Flags().StringArrayVarP(&editTagsArg, "tags", "t", []string{}, "Overwrite tags")
}
