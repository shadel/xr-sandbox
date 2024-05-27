import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IMessageHandler } from "./interfaces/IMessageHandler";
import { CommunicationPageScriptInjector } from "./CommunicationPageScriptInjector";
import { SanboxMessageHandler } from "./SandboxMessageHandler";
import { IPageSandbox } from "./interfaces/IPageSandbox";
import { IScriptFunctionExecutor } from "./interfaces/IScriptFunctionExecutor";
import { ScriptFunctionExecutor } from "./ScriptFunctionExecutor";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import {
  FallbackOnetimeSandboxScript,
  FallbackType,
} from "./sandbox-scripts/FallbackOnetimeSandboxScript";
import { SandboxScriptBlock } from "./sandbox-scripts/SandboxScriptBlock";

class PageSandbox implements IPageSandbox {
  private communicationScriptInjector: ICommunicationScriptInjector;
  private messageHandler: IMessageHandler;
  private functionExecutor: IScriptFunctionExecutor;
  private sandboxIframe: HTMLIFrameElement;

  constructor({
    documentElement,
    sandboxUrl,
  }: {
    documentElement: HTMLElement;
    sandboxUrl: string;
  }) {
    this.sandboxIframe = this.createIframe(documentElement, sandboxUrl);
    this.functionExecutor = new ScriptFunctionExecutor(this.sandboxIframe);
    this.communicationScriptInjector = new CommunicationPageScriptInjector(
      this.functionExecutor
    );
    this.messageHandler = new SanboxMessageHandler({});

    this.setupMessageListener();
    this.communicationScriptInjector.injectCommunicationScript();
  }
  getMessageHandler(): IMessageHandler {
    return this.messageHandler;
  }
  load(): Promise<IPageSandbox> {
    throw new Error("Method not implemented.");
  }

  private destroyExistIframe(sandboxUrl: string) {
    const existElement = document.querySelector(`iframe[src='${sandboxUrl}']`);
    if (existElement) {
      existElement.remove();
    }
  }
  private createIframe(
    documentElement: HTMLElement,
    sandboxUrl: string
  ): HTMLIFrameElement {
    this.destroyExistIframe(sandboxUrl);

    const iframe = document.createElement("iframe");
    // iframe.style.display = "none";
    iframe.src = sandboxUrl;
    iframe.setAttribute("width", "800");
    iframe.setAttribute("height", "600");

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

  public getFunctionExecutor() {
    return this.functionExecutor;
  }
  executeScript(
    script: ISandboxScript,
    { type = FallbackType.VOID, timeout = 10 * 1000 }
  ) {
    const sandboxCode = new FallbackOnetimeSandboxScript({
      script,
      type,
    });

    const evtKey = sandboxCode.getId();

    const eventRespone = new Promise<any>((resolve, reject) => {
      let isTimeout = false;
      const timeoutHandler = setTimeout(() => {
        isTimeout = true;
        clearTimeout(timeoutHandler);
        reject(
          new Error(
            `Script: ${script.getName()} by call ${evtKey} time out ${timeout}`
          )
        );
      }, timeout);

      const messageHandler = this.getMessageHandler();
      messageHandler.add({
        type: "capturedEvent",
        handler: (eventData: any, destroy) => {
          if (isTimeout) {
            return;
          }
          console.log(
            "capturedEvent",
            script.getId(),
            eventData.data.eventType,
            evtKey
          );
          if (eventData.data.eventType !== evtKey) {
            return;
          }
          clearTimeout(timeoutHandler);
          destroy();
          resolve(eventData.data);
        },
      });
    });

    this.executeScriptInBlock([sandboxCode]);

    return eventRespone;
  }

  private executeScriptInBlock(scripts: ISandboxScript[]) {
    const codeblock = new SandboxScriptBlock();
    scripts.forEach((scipt) => {
      codeblock.add(scipt);
    });
    this.functionExecutor.executeScript(codeblock);
  }
}

export default PageSandbox;
