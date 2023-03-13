import express from 'express'
import http from "http";
import cors from 'cors'
import mongoose from "mongoose";
import 'dotenv/config'
import './firebaseConfig.js'

import {ApolloServer} from "@apollo/server";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import {expressMiddleware} from "@apollo/server/express4";
import {getAuth} from "firebase-admin/auth";


import {typeDefs} from "./schemas/index.js";
import {resolvers} from "./resolvers/index.js";


const app = express()
const httpServer = http.createServer(app)

// connect to db
const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gsmppse.mongodb.net/?retryWrites=true&w=majority`
const PORT = process.env.PORT || 4000
// schema
// resolver
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})]
})

await server.start()

const authorizationJWT = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader) {
        const accessToken = authorizationHeader.split(' ')[1];
        getAuth()
            .verifyIdToken(accessToken)
            .then((decodedToken) => {
                res.locals.uid = decodedToken.uid;
                next();
            })
            .catch((err) => {
                console.log({ err });
                return res.status(403).json({ message: 'Forbidden', error: err });
            });
    } else {
        next();
        // return res.status(401).json({ message: 'Unauthorized' });
    }
};

app.use(cors(), authorizationJWT, bodyParser.json(), expressMiddleware(server, {
    context: async ({ req, res }) => {
        return { uid: res.locals.uid };
    },
}))


mongoose.set('strictQuery', false)
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    console.log('Connected to DB')
    await new Promise((resolve) => httpServer.listen({port: PORT}, resolve));
    console.log(`Server ready at http"//localhost:${PORT}`)

})
