import { IMessageHandler } from "./interfaces/IMessageHandler";

export class SanboxMessageHandler implements IMessageHandler {
  handleMessage(event: MessageEvent) {
    if (event.data.type === "capturedEvent") {
      this.handleCapturedEvent(event.data);
    }
  }

  private handleCapturedEvent(eventData: any) {
    const customEvent = new CustomEvent(eventData.eventType, {
      detail: eventData,
    });
    window.dispatchEvent(customEvent);
  }
}
