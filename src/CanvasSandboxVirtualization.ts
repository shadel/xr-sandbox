import BaseSandbox from "./BaseSandbox";
import CanvasLogic from "./CanvasLogic";

class CanvasSandboxVirtualization extends BaseSandbox {
  private canvasLogic: CanvasLogic;
  private canvasId: string;

  constructor(
    documentElement: HTMLElement,
    sandboxUrl: string,
    canvasId: string
  ) {
    super(documentElement, sandboxUrl);
    this.canvasId = canvasId;
    this.canvasLogic = new CanvasLogic(documentElement);
    this.canvasLogic.setupMouseEvents(this.sendMessage.bind(this));
  }

  injectCommunicationScript() {
    const commonScriptContent = `
      (function() {
        const canvas = document.getElementById('${this.canvasId}');
        const ctx = canvas.getContext('2d');
        const sandboxFunctions = {};

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

        function injectFunction(objectName, functionName, functionBody) {
          const func = new Function('ctx', 'canvas', 'streamCanvasData', 'args', functionBody);
          if (objectName) {
            window[objectName][functionName] = func;
          } else {
            window[functionName] = func;
          }
        }

        function replaceFunction(objectName, functionName, functionBody) {
          const func = new Function('ctx', 'canvas', 'streamCanvasData', 'args', functionBody);
          if (objectName) {
            window[objectName][functionName] = func;
          } else {
            window[functionName] = func;
          }
        }

        function hookFunction(objectName, functionName, hookBody) {
          const originalFunction = objectName ? window[objectName][functionName] : window[functionName];
          const hookFunc = new Function('originalFunction', 'ctx', 'canvas', 'streamCanvasData', 'args', hookBody);
          if (objectName) {
            window[objectName][functionName] = function(args) {
              hookFunc(originalFunction, ctx, canvas, streamCanvasData, args);
            };
          } else {
            window[functionName] = function(args) {
              hookFunc(originalFunction, ctx, canvas, streamCanvasData, args);
            };
          }
        }

        function captureEvent(eventType) {
          canvas.addEventListener(eventType, (event) => {
            const eventData = {
              type: 'capturedEvent',
              eventType,
              clientX: event.clientX,
              clientY: event.clientY,
              offsetX: event.offsetX,
              offsetY: event.offsetY,
              button: event.button
            };
            window.parent.postMessage(eventData, '*');
          });
        }

        window.addEventListener('message', (event) => {
          if (event.data.type === 'mouseEvent') {
            handleMouseEvent(event.data);
          } else if (event.data.type === 'executeFunction') {
            executeFunction(event.data.functionBody, event.data.args);
          } else if (event.data.type === 'injectFunction') {
            injectFunction(event.data.objectName, event.data.functionName, event.data.functionBody);
          } else if (event.data.type === 'replaceFunction') {
            replaceFunction(event.data.objectName, event.data.functionName, event.data.functionBody);
          } else if (event.data.type === 'hookFunction') {
            hookFunction(event.data.objectName, event.data.functionName, event.data.hookBody);
          } else if (event.data.type === 'captureEvent') {
            captureEvent(event.data.eventType);
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
    } else if (event.data.type === "capturedEvent") {
      this.handleCapturedEvent(event.data);
    }
  }

  handleCapturedEvent(eventData: any) {
    const customEvent = new CustomEvent(eventData.eventType, {
      detail: eventData,
    });
    window.dispatchEvent(customEvent);
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

  injectFunction(
    objectName: string | null,
    functionName: string,
    functionBody: string
  ) {
    this.sendMessage({
      type: "injectFunction",
      objectName,
      functionName,
      functionBody,
    });
  }

  replaceFunction(
    objectName: string | null,
    functionName: string,
    functionBody: string
  ) {
    this.sendMessage({
      type: "replaceFunction",
      objectName,
      functionName,
      functionBody,
    });
  }

  hookFunction(
    objectName: string | null,
    functionName: string,
    hookBody: string
  ) {
    this.sendMessage({
      type: "hookFunction",
      objectName,
      functionName,
      hookBody,
    });
  }

  captureEvent(eventType: string) {
    this.sendMessage({ type: "captureEvent", eventType });
  }
}

export default CanvasSandboxVirtualization;
