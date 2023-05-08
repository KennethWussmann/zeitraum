package cmd

import (
	"fmt"
	"strings"
	"time"

	"github.com/olebedev/when"
	"github.com/olebedev/when/rules/common"
	"github.com/olebedev/when/rules/en"
)

func ParseDateTimeInput(input string) (*time.Time, error) {
	w := when.New(nil)
	w.Add(en.All...)
	w.Add(common.All...)
	r, err := w.Parse(input, time.Now())
	if err != nil {
		return nil, err
	}
	if r == nil {
		return nil, fmt.Errorf("no time found")
	}
	return &r.Time, nil
}

func FormatTimerRuntime(from time.Time, to time.Time) string {
	if to.IsZero() {
		to = time.Now()
	}
	return FormatSeconds(int(to.Sub(from).Seconds()))
}

func FormatSeconds(secondsDiff int) string {
	days := secondsDiff / (3600 * 24)
	hours := (secondsDiff % (3600 * 24)) / 3600
	minutes := (secondsDiff % 3600) / 60
	seconds := secondsDiff % 60

	result := []string{}
	if days > 0 {
		result = append(result, fmt.Sprintf("%dd", days))
	}
	if hours > 0 {
		result = append(result, fmt.Sprintf("%dh", hours))
	}
	if minutes > 0 {
		result = append(result, fmt.Sprintf("%dm", minutes))
	}
	result = append(result, fmt.Sprintf("%02ds", seconds))

	return strings.Join(result, " ")
}
