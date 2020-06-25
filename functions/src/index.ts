import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as Koa from "koa";
import * as cors from "@koa/cors";
import * as Router from "@koa/router";
import * as bodyParser from "koa-bodyparser";
import handshake from "./controllers/handshake";
import getUsers from "./controllers/user/get";
import getProject from "./controllers/project/get";
import getWorkspace from "./controllers/workspace/get";
import updateUser from "./controllers/user/update";

admin.initializeApp({
    credential: admin.credential.cert(require("./serviceAccount.json")),
});

export const db = admin.firestore();
const app = new Koa();
const router = new Router();

app.use(router.routes()).use(router.allowedMethods());
app.use(cors());
app.use(bodyParser());

router.get("/", handshake);

// === user ===
router.get("/users/:id", getUsers);
router.put("/users/:id", updateUser);

// === project ===
router.get("/projects/:id", getProject);

// === workspace ===
router.get("/workspaces/:id", getWorkspace);

export const api = functions.https.onRequest(app.callback());
