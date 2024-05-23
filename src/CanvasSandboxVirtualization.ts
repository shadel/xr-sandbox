import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IMessageHandler } from "./interfaces/IMessageHandler";
import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";
import { CommunicationScriptInjector } from "./CommunicationScriptInjector";
import { FunctionExecutor } from "./FunctionExecutor";
import { CanvasMessageHandler } from "./CanvasMessageHandler";
import CanvasLogic from "./CanvasLogic";

class CanvasSandboxVirtualization {
  private communicationScriptInjector: ICommunicationScriptInjector;
  private messageHandler: IMessageHandler;
  private functionExecutor: IFunctionExecutor;
  private canvasLogic: CanvasLogic;

  constructor(
    documentElement: HTMLElement,
    sandboxUrl: string,
    canvasId: string
  ) {
    const sandboxIframe = this.createIframe(documentElement, sandboxUrl);
    this.canvasLogic = new CanvasLogic(documentElement);
    this.functionExecutor = new FunctionExecutor(sandboxIframe);
    this.communicationScriptInjector = new CommunicationScriptInjector(
      canvasId,
      this.functionExecutor
    );
    this.messageHandler = new CanvasMessageHandler(this.canvasLogic);

    this.setupMessageListener();
    this.communicationScriptInjector.injectCommunicationScript();
  }

  private createIframe(
    documentElement: HTMLElement,
    sandboxUrl: string
  ): HTMLIFrameElement {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = sandboxUrl;
    documentElement.appendChild(iframe);
    return iframe;
  }

  private setupMessageListener() {
    window.addEventListener(
      "message",
      (event) => this.messageHandler.handleMessage(event),
      false
    );
  }

  sendVirtualKeyPress(key: string) {
    this.functionExecutor.executeFunction("virtualKeyPress", { key });
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
    this.injectFunction("drawRectangle", functionBody);
    this.functionExecutor.executeFunction("drawRectangle", {
      x,
      y,
      width,
      height,
      color,
    });
  }

  injectFunction(functionName: string, functionBody: string) {
    const scriptContent = `
      window['${functionName}'] = function(ctx, canvas, streamCanvasData, args) {
        ${functionBody}
      };
    `;
    this.functionExecutor.injectScript(scriptContent);
  }

  executeCustomFunction(functionName: string, args?: any) {
    this.functionExecutor.executeFunction(functionName, args);
  }
}

export default CanvasSandboxVirtualization;
