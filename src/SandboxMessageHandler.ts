import { IMessageHandler } from "./interfaces/IMessageHandler";

export interface IEventHandler {
  type: string;
  handler: (eventData: any, destroy: () => void) => void;
}

class EventHandler implements IEventHandler {
  isDestroyed: boolean;
  get type() {
    return this.eh.type;
  }
  get handler() {
    if (this.isDestroyed) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {};
    }
    return this.eh.handler;
  }

  constructor(private eh: IEventHandler) {
    this.isDestroyed = false;
  }

  destroy() {
    this.isDestroyed = true;
  }
}

export class SanboxMessageHandler implements IMessageHandler {
  private handlers: EventHandler[];

  constructor({ handlers = [] }: { handlers?: IEventHandler[] }) {
    this.handlers = handlers.map((hdl) => new EventHandler(hdl));
  }
  handleMessage(event: MessageEvent) {
    // if (event.data.type === "capturedEvent") {
    //   this.handleCapturedEvent(event.data);
    // }
    this.handlers
      .filter(({ isDestroyed }) => !isDestroyed)
      .filter(({ type }) => type === event.data.type)
      .forEach((item) => {
        item.handler(event.data, () => item.destroy());
      });
  }

  add(handler: IEventHandler) {
    this.handlers.push(new EventHandler(handler));
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
