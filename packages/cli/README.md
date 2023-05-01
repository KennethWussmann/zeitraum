# 💻 `@zeitraum/cli`

## Installation

Download here: [Latest release](https://github.com/KennethWussmann/zeitraum/releases)

## Usage

After download start with the login. This is required in order to save time tracking data to the server.

```shell
$ zeitraum login --url https://your-zeitraum.com --token
```

This will save your credentials to `$HOME/.zeitraum.yaml`.

The following commands are now available to you.

```shell
$ zeitraum help
Zeitraum is a time tracking server. This CLI allows to use the server from the command line to track time from the terminal and in scripts

Usage:
  zeitraum [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  list        List time spans
  login       Login to your Zeitraum server
  stop        Stop a running time span
  track       Track a time span

Flags:
      --config string   Config file (default is $HOME/.zeitraum.yaml)
  -h, --help            help for zeitraum
      --output string   Set output format (plain, json)

Use "zeitraum [command] --help" for more information about a command.
```

### Start tracking

```shell
$ zeitraum track work zeitraum documentation -n "Working on the CLI documentation"
```

<details>
  <summary>Usage</summary>

```shell
$ zeitraum track --help
Track a time span

Usage:
  zeitraum track [flags]

Aliases:
  track, start, open

Flags:
  -e, --end string Set end time
  -h, --help help for track
  -n, --note string Set note
  -s, --start string Set start time (default "now")
```

</details>

### List time spans

```shell
$ zeitraum list
```

```shell
╭───┬────────────┬─────────────────┬──────┬─────────╮
│ # │ DURATION   │ TAGS            │ NOTE │ RUNNING │
├───┼────────────┼─────────────────┼──────┼─────────┤
│ 0 │ 5m 31s     │ work            │      │ Yes     │
╰───┴────────────┴─────────────────┴──────┴─────────╯
```

<details>
  <summary>Usage</summary>

```shell
$ zeitraum list --help
List time spans

Usage:
  zeitraum list [flags]

Aliases:
  list, ls

Flags:
  -e, --extended      Show extended time span information
  -f, --from string   From date
  -h, --help          help for list
  -l, --limit int     Amount of time spans to fetch (default 1000)
      --no-running    Only show closed time spans
  -o, --offset int    Offset of time spans to fetch
      --running       Only show running time spans
  -t, --to string     To date
      --today         Short hand for -f "today, 00:00"
```

</details>

### Stop active time span

When starting to track a timer will start running until you stop it. This way you can track time actively.

This is how you stop the timer that is running the longest:

```shell
$ zeitraum stop
```

You can also stop other time spans, check the usage.

<details>
  <summary>Usage</summary>

```shell
$ zeitraum stop --help
The time span that is running longest will be stopped first. Supply the number of the list command (without any filters applied) to stop a specific time span.

Usage:
  zeitraum stop [flags]

Aliases:
  stop, close, end

Flags:
  -e, --end string   Set custom end time
  -h, --help         help for stop
  -i, --id string    Stop time span by id
```

</details>

### Remove time span

Remove any time span:

```shell
$ zeitraum rm 0
```

> `0` refers to the number in the list command. You can also use `zeitraum rm -i 347a4f5c-8d90-43...` to remove a specific span by its UUID.

<details>
  <summary>Usage</summary>

```shell
$ zeitraum rm --help
Supply the number of the list command (without any filters applied) to remove a specific time span.

Usage:
  zeitraum remove [flags]

Aliases:
  remove, rm

Flags:
  -h, --help        help for remove
  -i, --id string   Remove time span by id
```

</details>

### Date time formats

The CLI often allows to flexibly set start and end. That's helpful when you forgot something. You can use natural language to set date time.

```
$ zeitraum track sleep --start "8 hours ago" --end now
```

This will create a finished timespan of 8 hours length. This works everywhere, where you need to enter time.

## Scripting

The CLI is great for creating automations and scripting.
To ease working with data in scripts you can change the output format of commands.

```shell
$ zeitraum list --output json
```

```JSON
{
  "timeSpans": {
    "total": 35,
    "items": [
      {
        "id": "0cc5ef31-c238-4e90-9a33-10d2797d8aac",
        "createdAt": "2023-05-01T18:10:52.051Z",
        "updatedAt": "2023-05-01T18:10:52.051Z",
        "start": "2023-05-01T10:10:52.017Z",
        "end": "2023-05-01T18:10:52.017Z",
        "note": null,
        "running": false,
        "tags": [
          {
            "id": "8dc00b09-4c8c-4532-a362-186d4b1a91b8",
            "createdAt": "2023-05-01T18:10:52.066Z",
            "updatedAt": "2023-05-01T18:10:52.066Z",
            "name": "sleep"
          }
        ]
      }
    ]
  }
}
```

> **Hint**: The JSON format is based upon the API responses. Check the [GraphQL schema](../server/src/api/graphql/schema.graphql) for details

This can be chained easily. For example to get the total amount of time spans:

```shell
$ zeitraum list --limit 0 --output json | jq .timeSpans.total
```

```shell
35
```

> [`jq`](https://stedolan.github.io/jq/) is available externally

> We use `--limit 0` here because we don't care about the data, but only the count. That may speed up processing with large outputs.
