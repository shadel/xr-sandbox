import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";

export class FunctionExecutor implements IFunctionExecutor {
  private sandboxIframe: HTMLIFrameElement;

  constructor(sandboxIframe: HTMLIFrameElement) {
    this.sandboxIframe = sandboxIframe;
  }

  injectScript(scriptContent: string) {
    const sandboxWindow = this.sandboxIframe.contentWindow;
    const sandboxDocument =
      this.sandboxIframe.contentDocument || sandboxWindow!.document;
    const script = sandboxDocument.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = scriptContent;
    sandboxDocument.body.appendChild(script);
  }

  executeFunction(functionName: string, args?: any) {
    this.sandboxIframe.contentWindow?.postMessage(
      { type: "executeFunction", functionName, args },
      "*"
    );
  }
}
