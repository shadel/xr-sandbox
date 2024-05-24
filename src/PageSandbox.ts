import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IMessageHandler } from "./interfaces/IMessageHandler";
import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";
import { FunctionExecutor } from "./FunctionExecutor";
import { CommunicationPageScriptInjector } from "./CommunicationPageScriptInjector";
import { SanboxMessageHandler } from "./SandboxMessageHandler";

class PageSandbox {
  private communicationScriptInjector: ICommunicationScriptInjector;
  private messageHandler: IMessageHandler;
  private functionExecutor: IFunctionExecutor;
  private sandboxIframe: HTMLIFrameElement;

  constructor(documentElement: HTMLElement, sandboxUrl: string) {
    this.sandboxIframe = this.createIframe(documentElement, sandboxUrl);
    this.functionExecutor = new FunctionExecutor(this.sandboxIframe);
    this.communicationScriptInjector = new CommunicationPageScriptInjector(
      this.functionExecutor
    );
    this.messageHandler = new SanboxMessageHandler();

    this.setupMessageListener();
    this.communicationScriptInjector.injectCommunicationScript();
  }

  private createIframe(
    documentElement: HTMLElement,
    sandboxUrl: string
  ): HTMLIFrameElement {
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
}

export default PageSandbox;
