import * as Client from "ws";
import { Manager } from "../Manager";
import { EventHandler } from "./event/EventHandler";
import { MessageUtil } from "./util/MessageUtil";
import { Message } from "./Message";
import { types } from "./util/constants";
const { IDENTIFY_CLIENT } = types;

export class Websocket extends Client {
  client: Manager;
  handler: EventHandler;

  constructor(client: Manager) {
    super(`${process.env.WS_URL}`);
    this.client = client;
    this.handler = new EventHandler(client);
    this.on("open", () => {
      this.send(
        MessageUtil.encode(
          new Message(IDENTIFY_CLIENT, {
            id: this.client.id,
            ready: this.client.client.readyAt ? true : false,
          })
        )
      );
      this.client.client.console.log("[Aether] Sending identify event.");
    });
  }

  init() {
    this.handler.init();

    this.on("message", (message) => {
      this.handler.handle(message);
    });
  }
}