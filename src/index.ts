import express from "express";
import process from "process";
import { MicroService } from "./sd";

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

app.get("/api/v1/catalog", req => {
    req.res.json({
        status: 200,
        data: []
    });
});

app.listen(port, () => {
    const ms = new MicroService({
        application: "micro-commerce",
        service: "service-catalog",
        version: "v0.0.1",
        port
    });
    process.on("SIGINT", async () => {
        await ms.stop();
        process.exit(0);
    });
});
