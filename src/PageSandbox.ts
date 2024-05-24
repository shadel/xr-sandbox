import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IMessageHandler } from "./interfaces/IMessageHandler";
import { CommunicationPageScriptInjector } from "./CommunicationPageScriptInjector";
import { SanboxMessageHandler } from "./SandboxMessageHandler";
import { IPageSanbox } from "./interfaces/IPageSandbox";
import { IScriptFunctionExecutor } from "./interfaces/IScriptFunctionExecutor";
import { ScriptFunctionExecutor } from "./ScriptFunctionExecutor";

class PageSandbox implements IPageSanbox {
  private communicationScriptInjector: ICommunicationScriptInjector;
  private messageHandler: IMessageHandler;
  private functionExecutor: IScriptFunctionExecutor;
  private sandboxIframe: HTMLIFrameElement;

  constructor(documentElement: HTMLElement, sandboxUrl: string) {
    this.sandboxIframe = this.createIframe(documentElement, sandboxUrl);
    this.functionExecutor = new ScriptFunctionExecutor(this.sandboxIframe);
    this.communicationScriptInjector = new CommunicationPageScriptInjector(
      this.functionExecutor
    );
    this.messageHandler = new SanboxMessageHandler();

    this.setupMessageListener();
    this.communicationScriptInjector.injectCommunicationScript();
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
}

export default PageSandbox;
