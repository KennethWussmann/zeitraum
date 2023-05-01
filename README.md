<div align="center">
  <h1><code>Zeitraum</code></h1>
  <p>
    <strong>Zeitraum is a versatile time tracking service for developers, designed to seamlessly integrate into your existing workflow.</strong>
  </p>
</div>

## ✨ Features

Zeitraum focuses on persisting time spans labeled with custom tags and offering a powerful API for effortless integration with the tools you already use. Perfect for automation enthusiasts, self-hosting lovers, and anyone looking to track time efficiently and effectively.

- [x] 💻 **Command-line Interface**: Streamline your scripts and workflow with ease by tracking time right from the terminal.
- [x] 🔗 **GraphQL API**: The backbone of all integrations, empowering you to create a personalized experience.
- [x] 🌐 **REST API**: For simple integrations, everywhere where HTTP works.
- [x] ⚡ **[Raycast](https://www.raycast.com/) Extension**: Blazingly fast time tracking at your fingertips.
- [x] 📈 **[Prometheus](https://prometheus.io/) Integration**: Export time spans for alerts, monitoring, and enhanced observability.
- [x] 🎛️ **[Grafana](https://grafana.com/) Compatibility**: Design your own stunning dashboard to keep an eye on your time investments.

## 🚢 Deploy

To deploy Zeitraum yourself, `docker-compose` is a great way:

```YAML
version: '3.8'
services:
  database:
    image: postgres:15
    volumes:
      - database:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: zeitraum
      POSTGRES_USER: zeitraum
      POSTGRES_DB: zeitraum
  server:
    image: ghcr.io/kennethwussmann/zeitraum/server:latest
    ports:
      - 3000:3000
    depends_on:
      - database
    environment:
      DATABASE_URL: postgresql://zeitraum:zeitraum@database:5432/zeitraum
      API_TOKENS: fdHww82okrvB...

volumes:
  database:
```

Learn more about the server deployment and configuration: [Read more](./packages/server/)

## 🏷️ Philosophy

In Zeitraum you track time by starting time spans and assigning tags to them. Tags offer an intuitive and flexible way to categorize and organize your time tracking data. They embody Zeitraum's core principle of adapting to your workflow by allowing you to customize your tag structure. The possibilities are endless, whether you want to differentiate work and personal time tracking, track projects, or categorize by clients.

The API-first design of Zeitraum ensures that your workflow is always highest priority. I figured time tracking is a very time intense process, therefore it needs to be easy, quick and always at your fingertips to actually be useful. That's also why Zeitraum is a server-based application, so one can track time from every device no matter where you are.
I also don't like to sign up for complicated UIs that may be buggy, unresponsive or strip away important features. Therefore I want Zeitraum to adapt to the user which is only possible by providing a wide variety interfaces.

Zeitraum is inspired by [traggo](https://traggo.net/) and [watson](http://tailordev.github.io/Watson/). Check them out too.

## 🔄 Integrate Yourself

There are multiple ways to integrate Zeitraum into your workflow. Take a look at which one suits you best.

### 📱 Apps

Zeitraum is only a server to store your time tracking data. It doesn't ship with an interface directly.

Apps are integrations of the Zeitraum API that offer an easy to use user interface.

- Raycast Extension - Track time using Raycast launcher.

### 💻 Command-line Interface

The CLI allows to write scripts, track and manage your time directly from your terminal.
It's available for all systems and architectures:

- macOS
- Linux
- Windows

Download here: [Latest release](https://github.com/KennethWussmann/zeitraum/releases)

Learn more: [Getting started](./packages/cli/)

### 📦 `@zeitraum/client`

The NPM package [`@zeitraum/client`](https://www.npmjs.com/package/@zeitraum/client) allows to start building JavaScript and TypeScript based integrations without dealing with GraphQL or REST.

Get started using the client here: [Read more](./packages/client)

### 🔗 GraphQL & REST API

The API offers the most capabilities and is compatible with everything that can execute HTTP requests, even iOS Shortcuts!

Get started using the API: [Read more](./packages/server/README.md#api)

## 📈 Observability

Getting an overview about where you spend your time is important. That's why we track time, right?

Therefore Zeitraum ships with [Prometheus](https://prometheus.io/) metrics. That makes it possible to build beautiful [Grafana](https://grafana.com/) dashboards.

Learn more [how to configure Prometheus and Zeitraum](./packages/server/README.md#prometheus).
