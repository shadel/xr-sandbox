import { ICommunicationScriptInjector } from './interfaces/ICommunicationScriptInjector';
import { IMessageHandler } from './interfaces/IMessageHandler';

abstract class SandboxVirtualizationBase
  implements ICommunicationScriptInjector, IMessageHandler
{
  protected sandboxIframe: HTMLIFrameElement;
  protected sandboxUrl: string;
  protected documentElement: HTMLElement;

  constructor(documentElement: HTMLElement, sandboxUrl: string) {
    this.documentElement = documentElement;
    this.sandboxUrl = sandboxUrl;
    this.initialize();
  }

  private initialize() {
    this.createIframe();
    this.setupMessageListener();
  }

  private createIframe() {
    this.sandboxIframe = document.createElement('iframe');
    this.sandboxIframe.style.display = 'none';
    this.sandboxIframe.src = this.sandboxUrl;
    this.documentElement.appendChild(this.sandboxIframe);
    this.sandboxIframe.onload = () => this.injectCommunicationScript();
  }

  private setupMessageListener() {
    window.addEventListener(
      'message',
      (event) => this.handleMessage(event),
      false
    );
  }

  protected injectScript(scriptContent: string) {
    const sandboxWindow = this.sandboxIframe.contentWindow;
    const sandboxDocument =
      this.sandboxIframe.contentDocument || sandboxWindow!.document;
    const script = sandboxDocument.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = scriptContent;
    sandboxDocument.body.appendChild(script);
  }

  protected sendMessage(message: object) {
    this.sandboxIframe.contentWindow?.postMessage(message, '*');
  }

  abstract injectCommunicationScript(): void;
  abstract handleMessage(event: MessageEvent): void;
}

export default SandboxVirtualizationBase;