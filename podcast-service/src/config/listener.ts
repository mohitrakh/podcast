import { getNats } from "./nats-client";
import { StringCodec } from "nats";


const listenEvents = async () => {
    const sub = getNats().subscribe("episode.created");
    const sc = StringCodec();

    (async () => {
        for await (const msg of sub) {
            const data = JSON.parse(sc.decode(msg.data));
            console.log("Received event:", data);
        }
    })();
};

export { listenEvents };