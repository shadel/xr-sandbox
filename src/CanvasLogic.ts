class CanvasLogic {
  private mainCanvas: HTMLCanvasElement;
  private mainCtx: CanvasRenderingContext2D;

  constructor(documentElement: HTMLElement) {
    this.mainCanvas = document.createElement("canvas");
    this.mainCanvas.id = "mainCanvas";
    this.mainCanvas.width = 800;
    this.mainCanvas.height = 600;
    documentElement.appendChild(this.mainCanvas);
    this.mainCtx = this.mainCanvas.getContext("2d")!;
  }

  public drawImage(dataUrl: string) {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      this.mainCtx.clearRect(
        0,
        0,
        this.mainCanvas.width,
        this.mainCanvas.height
      );
      this.mainCtx.drawImage(img, 0, 0);
    };
  }

  public setupMouseEvents(sendMessage: (message: object) => void) {
    const mouseEvents = [
      "mousedown",
      "mouseup",
      "mousemove",
      "click",
      "dblclick",
      "mouseover",
      "mouseout",
    ];

    mouseEvents.forEach((eventType) => {
      this.mainCanvas.addEventListener(eventType, (event) => {
        sendMessage({
          type: "mouseEvent",
          eventType,
          clientX: event.clientX,
          clientY: event.clientY,
          offsetX: event.offsetX,
          offsetY: event.offsetY,
          button: event.button,
        });
      });
    });
  }
}

export default CanvasLogic;
