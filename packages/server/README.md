# 🚢 `@zeitraum/server`

The heart of Zeitraum is the server. It's a dockerized GraphQL and REST API service that can be deployed even on lower-end devices like Raspberry Pis.

## Docker Compose

Here is an example on how to deploy Zeitraum via Docker Compose.

```YAML
version: '3.8'
services:
  # Zeitraum requires a Postgres database.
  database:
    image: postgres:15
    volumes:
      - database:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: zeitraum
      POSTGRES_USER: zeitraum
      POSTGRES_DB: zeitraum

  server:
    # For available versions check the latest releases
    image: ghcr.io/kennethwussmann/zeitraum/server:latest
    ports:
      - 3000:3000
    depends_on:
      - database
    environment:
      # Check the enviroment variables guide below for more infos about available settings
      DATABASE_URL: postgresql://zeitraum:zeitraum@database:5432/zeitraum
      API_TOKENS: fdHww82okrvB,XOEDNXE5MHiB

volumes:
  database:
```

## Configuration

<table>
  <tr>
    <th>Variable</th>
    <th>Required</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>DATABASE_URL</code></td>
    <td>Yes</td>
    <td>Credentials and location of the database server (see above for example)</td>
  </tr>
  <tr>
    <td><code>API_TOKENS</code></td>
    <td>No</td>
    <td>Comma-separated list of API tokens, that have full access to the server. Used for CLI, extensions, clients, etc.</td>
  </tr>
  <tr>
    <td><code>LOG_LEVEL</code></td>
    <td>No</td>
    <td>Show more detailed logs. One of debug, info, warn, error</td>
  </tr>
</table>

## API

### GraphQL

When the API client doesn't work for the implemention, GraphQL is the way to go. It's super easy to implement and [many languages have great tooling](https://graphql.org/code/) to make it simple.

Check out the schema here: [Open Schema](./src/api/graphql/schema.graphql)

### REST

Less fun and more work, but of course Zeitraum has a REST API as well. This is handy for limited environments where one can do an HTTP request but does not have a great programming environment, for example iOS Shortcuts.

To get the OpenAPI spec, open this URL on your Zeitraum instance:

```
https://your-zeitraum.com/openapi.json?token=<API-TOKEN>
```

> Replace `your-zeitraum.com` with your URL where your installation lives and `<API-TOKEN>` with an API token

## Prometheus

The Zeitraum server has a `/metrics` endpoint that can be scraped by Prometheus. This is a great way to add observability to your spent time. This opens Zeitraum to many more use cases:

- Get a Slack/Discord/Telegram/etc. notification when you work more than 8 hours today or to take a break from work
- Build beautiful Grafana dashboard to get an overview on your spent time

Setup a scraping job in your Prometheus config:

```YML
scrape_configs:
  - job_name: "zeitraum"
    scheme: https
    metrics_path: /metrics
    authorization:
      credentials: "fdHww82okrvB..." # set API Token
    static_configs:
      - targets: ["your-zeitraum.com"] # adjust location
```

> **Notice**: Prometheus is another service that you need to deploy and configure in order to leverage more capabilities. Check this project for an [example deployment](https://github.com/vegasbrianc/prometheus/).