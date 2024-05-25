import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";

export class FunctionExecutor implements IFunctionExecutor {
  private sandboxIframe: HTMLIFrameElement;
  id: string;

  constructor(sandboxIframe: HTMLIFrameElement) {
    this.sandboxIframe = sandboxIframe;
    this.id = `FunctionExecutor-${Date.now()}`;
  }
  executeScript(scriptContent: string, args?: any): void {
    this.sandboxIframe.contentWindow?.postMessage(
      { type: "executeAnonymousFunction", functionBody: scriptContent, args },
      "*"
    );
  }

  injectScript(scriptContent: string) {
    const sandboxWindow = this.sandboxIframe.contentWindow;
    const sandboxDocument =
      this.sandboxIframe.contentDocument || sandboxWindow!.document;
    console.log("injectScript", this.id, scriptContent);
    const script = sandboxDocument.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = scriptContent;
    script.id = this.id;

    sandboxDocument.body.appendChild(script);
  }

  executeFunction(functionName: string, args?: any) {
    this.sandboxIframe.contentWindow?.postMessage(
      { type: "executeFunction", functionName, args },
      "*"
    );
  }
}
