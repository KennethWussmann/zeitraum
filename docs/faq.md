# FAQ

## Why no webinterface and why so complicated?

I'm currently prioritzing third-party interfaces higher than a first-party webinterface, because that's what I already use.
Of course a webinterface could make it much more accessible for users who are not interested in all the automations, customizations and integrations that Zeitraum has to offer. If this is the case for you, Zeitraum indeed does not fit your needs. Maybe check [traggo](https://traggo.net/) instead. 

Also the Zeitraum has a [GraphQL and REST API](../packages/server/README.md#api) and also a [TypeScript client](../packages/client/README.md) that allows anyone to build a webinterface. 

Feel free to suggest features and open pull requests to improve the API, in order to support a third-party webinterface.

## Why online-first with a server application?

Because that's the only way to synchronize all the different integrations Zeitraum supports.

I see the use-case of an offline-first mobile app that will synchronize once the server is reachable again, but I currently don't have that use-case.
Also Docker containers can be deployed for very cheap on the internet. Remeber to only expose Zeitraum via HTTPS.