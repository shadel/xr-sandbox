import { IEventHandler } from "../SandboxMessageHandler";

export interface IMessageHandler {
  handleMessage(event: MessageEvent): void;
  add(handler: IEventHandler): void;
}
