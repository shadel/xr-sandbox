import BaseSandbox from "./BaseSandbox";
import CanvasLogic from "./CanvasLogic";

class CanvasSandboxVirtualization extends BaseSandbox {
  private canvasLogic: CanvasLogic;

  constructor(documentElement: HTMLElement, sandboxUrl: string) {
    super(documentElement, sandboxUrl);
    this.canvasLogic = new CanvasLogic(documentElement);
    this.canvasLogic.setupMouseEvents(this.sendMessage.bind(this));
  }

  injectCommunicationScript() {
    const commonScriptContent = `
      (function() {
        const canvas = document.getElementById('sandboxCanvas');
        const ctx = canvas.getContext('2d');

        function streamCanvasData() {
          const dataUrl = canvas.toDataURL();
          window.parent.postMessage({ type: 'canvasData', data: dataUrl }, '*');
        }

        function handleMouseEvent(data) {
          const mouseEvent = new MouseEvent(data.eventType, {
            clientX: data.clientX,
            clientY: data.clientY,
            offsetX: data.offsetX,
            offsetY: data.offsetY,
            button: data.button,
            bubbles: true,
            cancelable: true,
            view: window
          });
          canvas.dispatchEvent(mouseEvent);
          streamCanvasData();
        }

        function executeFunction(functionBody, args) {
          const func = new Function('ctx', 'canvas', 'streamCanvasData', 'args', functionBody);
          func(ctx, canvas, streamCanvasData, args);
        }

        window.addEventListener('message', (event) => {
          if (event.data.type === 'mouseEvent') {
            handleMouseEvent(event.data);
          } else if (event.data.type === 'executeFunction') {
            executeFunction(event.data.functionBody, event.data.args);
          }
        });

        setInterval(streamCanvasData, 200);
      })();
    `;
    this.injectScript(commonScriptContent);
  }

  handleMessage(event: MessageEvent) {
    if (event.data.type === "canvasData") {
      this.canvasLogic.drawImage(event.data.data);
    }
  }

  sendVirtualKeyPress(key: string) {
    this.sendMessage({ type: "virtualKeyPress", key });
  }

  drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ) {
    const functionBody = `
      ctx.fillStyle = args.color;
      ctx.fillRect(args.x, args.y, args.width, args.height);
      streamCanvasData();
    `;
    this.sendMessage({
      type: "executeFunction",
      functionBody,
      args: { x, y, width, height, color },
    });
  }

  executeCustomFunction(functionBody: string, args?: any) {
    this.sendMessage({ type: "executeFunction", functionBody, args });
  }
}

export default CanvasSandboxVirtualization;
