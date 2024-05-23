export interface IMessageHandler {
  handleMessage(event: MessageEvent): void;
}
