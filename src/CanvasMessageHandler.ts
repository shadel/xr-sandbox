import { IMessageHandler } from "./interfaces/IMessageHandler";
import { CanvasLogic } from "./CanvasLogic";

export class CanvasMessageHandler implements IMessageHandler {
  private canvasLogic: CanvasLogic;

  constructor(canvasLogic: CanvasLogic) {
    this.canvasLogic = canvasLogic;
  }

  handleMessage(event: MessageEvent) {
    if (event.data.type === "canvasData") {
      this.canvasLogic.drawImage(event.data.data);
    } else if (event.data.type === "capturedEvent") {
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
