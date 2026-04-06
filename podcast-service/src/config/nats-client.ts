import { NatsConnection } from "nats";

const { connect } = require("nats");

let nc: NatsConnection;

const connectNats = async () => {
    nc = await connect({
        servers: "nats://nats-srv:4222",
    });

    console.log("Connected to NATS");

    nc.closed().then(() => {
        console.log("NATS connection closed");
        process.exit();
    });
};

const getNats = () => {
    if (!nc) {
        throw new Error("NATS not connected");
    }
    return nc;
};

export { connectNats, getNats };