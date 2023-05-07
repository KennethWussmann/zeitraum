package cmd

import (
	"strings"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func isValidFormat(format string) bool {
	return format == "plain" || format == "json" || format == "csv"
}

func GetOutputFormat(cmd *cobra.Command) string {
	flagFormat := strings.ToLower(cmd.Flag("output").Value.String())
	configFormat := strings.ToLower(viper.GetString("output"))
	if flagFormat != "" {
		if (!isValidFormat(flagFormat)) {
			panic("Invalid output format supplied via --output flag. Valid formats: plain, json, csv")
		}
		return flagFormat
	}
	if configFormat != "" {
		if (!isValidFormat(configFormat)) {
			panic("Invalid output format configured in configuration. Valid formats: plain, json, csv")
		}
		return configFormat
	}
	return "plain"
}