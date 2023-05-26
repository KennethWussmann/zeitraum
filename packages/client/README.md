# 📦 `@zeitraum/client`

The [`@zeitraum/client`](https://www.npmjs.com/package/@zeitraum/client) allows to start interface with the [Zeitraum](https://github.com/KennethWussmann/zeitraum) API.
Build JavaScript and TypeScript based integrations without dealing with GraphQL. The client abstracts the GraphQL API in an easy to use client:

```shell
npm install @zeitraum/client
```

```TypeScript
import { zeitraum } from '@zeitraum/client'

// initialize a client instance
const client = zeitraum({
  baseUrl: "https://your-zeitraum.com",
  apiToken: "fdHww82okrvB..."
})

// use everywhere
await client.createTimeSpan({
  start: new Date().toISOString(),
  tags: ["work", "zeitraum"]
  note: "Writing a usage example for the Zeitraum client"
})
```
