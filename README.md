# Zeitraum

Zeitraum is a versatile time tracking app designed to seamlessly integrate into your existing workflow. As a backend server, it focuses on persisting time spans labeled with custom tags, offering a powerful API for effortless integration with the tools you already use. Perfect for automation enthusiasts, self-hosting lovers, and anyone looking to track time efficiently and effectively.

## ✨ Features

- [x] 🔗 **GraphQL API**: The backbone of all integrations, empowering you to create a personalized experience.
- [x] 🌐 **REST API**: For simple integrations, everywhere where HTTP works.
- [ ] 💻 **Command-line Interface** (WIP): Streamline your scripts and workflow with ease.
- [x] ⚡ **[Raycast](https://www.raycast.com/) Extension**: Blazingly fast time tracking at your fingertips.
- [x] 📈 **Prometheus Integration**: Export time spans for alerts, monitoring, and enhanced observability.
- [x] 🎛️ **Grafana Compatibility**: Design your own stunning dashboard to keep an eye on your time investments.

## 🏷️ Harness the Power of Tags

Tags offer an intuitive and flexible way to categorize and organize your time tracking data. They embody Zeitraum's core principle of adapting to your workflow by allowing you to customize your tag structure. The possibilities are endless, whether you want to differentiate work and personal time tracking, track projects, or categorize by clients.

## 🔄 Integrate

There are multiple ways to integrate Zeitraum into your workflow. Take a look at which one suits you best.

### 📦 `@zeitraum/client`

The NPM package [`@zeitraum/client`](https://www.npmjs.com/package/@zeitraum/client) allows to start building JavaScript and TypeScript based integrations without dealing with GraphQL or REST. The client abstracts the GraphQL API in an easy to use client:

```shell
npm install @zeitraum/client
```

```TypeScript
// initialize a client instance
const client = zeitraum({
  baseUrl: "https://example.com",
  apiToken: "fdHww82okrvB..."
})

// use everywhere
await client.createTimeSpan({
  start: new Date().toISOString(),
  tags: ["work", "zeitraum"]
  note: "Writing a usage example for the Zeitraum client"
})
```

### 🔗 GraphQL

When the API client doesn't work for the implemention, GraphQL is the way to go. It's super easy to implement and [many languages have great tooling](https://graphql.org/code/) to make it simple.

Check out the schema here: [Open Schema](./packages/server/src/api/graphql/schema.graphql)

### 🌐 REST API

Less fun and more work, but of course Zeitraum has a REST API as well. This is handy for limited environments where one can do an HTTP request but does not have a great programming environment, for example iOS Shortcuts.

To get the OpenAPI spec, open this URL on your Zeitraum instance:

```
https://your-zeitraum.com/openapi.json?token=<API-TOKEN>
```

> Replace `your-zeitraum.com` with your URL where your installation lives and `<API-TOKEN>` with an API token
