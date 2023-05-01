package cmd

import (
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

func isValidFormat(format string) bool {
	return format == "plain" || format == "json"
}

func GetOutputFormat(cmd *cobra.Command) string {
	flagFormat := cmd.Flag("output").Value.String()
	configFormat := viper.GetString("output")
	if flagFormat != "" {
		if (!isValidFormat(flagFormat)) {
			panic("Invalid output format supplied via --output flag. Valid formats: plain, json")
		}
		return flagFormat
	}
	if configFormat != "" {
		if (!isValidFormat(configFormat)) {
			panic("Invalid output format configured in configuration. Valid formats: plain, json")
		}
		return configFormat
	}
	return "plain"
}