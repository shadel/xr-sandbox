import { IMessageHandler } from "./interfaces/IMessageHandler";

export interface IEventHandler {
  type: string;
  handler: (eventData: any) => void;
}

export class SanboxMessageHandler implements IMessageHandler {
  private handlers: IEventHandler[];

  constructor({ handlers = [] }: { handlers?: IEventHandler[] }) {
    this.handlers = handlers;
  }
  handleMessage(event: MessageEvent) {
    // if (event.data.type === "capturedEvent") {
    //   this.handleCapturedEvent(event.data);
    // }
    console.log("handleMessage", event.data, this.handlers.length);
    this.handlers
      .filter(({ type }) => type === event.data.type)
      .forEach(({ handler }) => handler(event.data));
  }

  add(handler: IEventHandler) {
    this.handlers.push(handler);
  }

  private handleCapturedEvent(eventData: any) {
    // const customEvent = new CustomEvent(eventData.eventType, {
    //   detail: eventData,
    // });
    // window.dispatchEvent(customEvent);

    console.log("handleCapturedEvent", eventData);
    // this.capturedEventHandler(eventData);
  }
}
