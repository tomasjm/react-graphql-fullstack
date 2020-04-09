import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { connect } from "./database";
import AuthorResolver from "./modules/author";
import BookResolver from "./modules/book";
import * as http from "http";

const main = async () => {
    const PORT: number = 4000;
    await connect();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [AuthorResolver, BookResolver]
        }),
        subscriptions: {
            path: "/subscriptions"
        },
        playground: true
    });

    const app = Express();
    apolloServer.applyMiddleware({ app });
    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`)
        console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`)
    })
}
main()