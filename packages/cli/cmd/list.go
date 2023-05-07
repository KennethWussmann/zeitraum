package cmd

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/jedib0t/go-pretty/table"
	"github.com/spf13/cobra"
)

func formatDateTime(outputFormat string, dateTime *time.Time) string {
	if dateTime == nil {
		return ""
	}
	if outputFormat == "csv" {
		return dateTime.Format(time.RFC3339)
	}
	return dateTime.String()
}

var fromArg, toArg string
var todayArg, runningArg, noRunningArg, extendedArg bool
var limitArg, offsetArg int

var listCmd = &cobra.Command{
	Use:     "list",
	Aliases: []string{"ls"},
	Short:   "List time spans",
	Run: func(cmd *cobra.Command, args []string) {
		format := GetOutputFormat(cmd)
		client := CreateClient(ClientOptions{})

		var running *bool = nil
		if cmd.Flag("running").Changed {
			truePointer := true
			running = &truePointer
		}
		if cmd.Flag("no-running").Changed {
			falsePointer := false
			running = &falsePointer
		}

		var extended bool = false
		if cmd.Flag("extended").Changed {
			extended = true
		}

		if todayArg && fromArg != "" {
			panic("cannot use --today together with --from")
		}
		if todayArg {
			fromArg = "today, 00:00"
		}
		fromParsed, _ := ParseDateTimeInput(fromArg)
		toParsed, _ := ParseDateTimeInput(toArg)

		response, err := timeSpans(context.Background(), client, &TimeSpanSearch{
			FromInclusive: fromParsed,
			ToInclusive:   toParsed,
			Running:       running,
			Limit:         &limitArg,
			Offset:        &offsetArg,
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

		t := table.NewWriter()
		t.SetOutputMirror(os.Stdout)
		t.SetStyle(table.StyleRounded)
		if extended {
			t.AppendHeader(table.Row{"#", "id", "duration", "tags", "note", "running", "start", "end"})
		} else {
			t.AppendHeader(table.Row{"#", "duration", "tags", "note", "running"})
		}
		for i, timeSpan := range response.TimeSpans.Items {
			var tags []string
			for _, tag := range timeSpan.Tags {
				tags = append(tags, tag.Name)
			}
			var runningFormatted string
			if timeSpan.Running {
				runningFormatted = "Yes"
			} else {
				runningFormatted = "No"
			}

			var end time.Time = time.Now()
			if timeSpan.End != nil {
				end = *timeSpan.End
			}

			var note string = ""
			if timeSpan.Note != nil {
				note = *timeSpan.Note
			}

			if extended {
				t.AppendRow(
					table.Row{
						i,
						timeSpan.Id,
						FormatTimerRuntime(timeSpan.Start, end),
						strings.Join(tags, ", "),
						note,
						runningFormatted,
						formatDateTime(format, &timeSpan.Start),
						formatDateTime(format, &end),
					},
				)
			} else {
				t.AppendRow(
					table.Row{
						i,
						FormatTimerRuntime(timeSpan.Start, end),
						strings.Join(tags, ", "),
						note,
						runningFormatted,
					},
				)
			}
		}
		if format == "csv" {
			t.RenderCSV()
		} else {
			t.Render()
		}
	},
}

func init() {
	rootCmd.AddCommand(listCmd)

	listCmd.Flags().StringVarP(&fromArg, "from", "f", "", "From date")
	listCmd.Flags().StringVarP(&toArg, "to", "t", "", "To date")
	listCmd.Flags().IntVarP(&limitArg, "limit", "l", 1000, "Amount of time spans to fetch")
	listCmd.Flags().IntVarP(&offsetArg, "offset", "o", 0, "Offset of time spans to fetch")
	listCmd.Flags().BoolVar(&todayArg, "today", false, "Short hand for -f \"today, 00:00\"")
	listCmd.Flags().BoolVar(&runningArg, "running", false, "Only show running time spans")
	listCmd.Flags().BoolVar(&noRunningArg, "no-running", false, "Only show closed time spans")
	listCmd.Flags().BoolVarP(&extendedArg, "extended", "e", false, "Show extended time span information")
}
