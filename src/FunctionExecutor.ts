import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";

export class FunctionExecutor implements IFunctionExecutor {
  private sandboxIframe: HTMLIFrameElement;
  id: string;

  constructor(sandboxIframe: HTMLIFrameElement) {
    this.sandboxIframe = sandboxIframe;
    this.id = `FunctionExecutor-${Date.now()}`;
  }
  executeScript(scriptContent: string): void {
    this.sandboxIframe.contentWindow?.postMessage(
      { type: "executeAnonymousFunction", functionBody: scriptContent },
      "*"
    );
  }

  injectScript(scriptContent: string) {
    const sandboxWindow = this.sandboxIframe.contentWindow;
    const sandboxDocument =
      this.sandboxIframe.contentDocument || sandboxWindow!.document;
    const script = sandboxDocument.createElement("script");
    script.type = "text/javascript";
    script.innerHTML = scriptContent;
    script.id = this.id;

    console.log("injectScript", this.id, scriptContent);
    sandboxDocument.body.appendChild(script);
  }

  executeFunction(functionName: string, args?: any) {
    this.sandboxIframe.contentWindow?.postMessage(
      { type: "executeFunction", functionName, args },
      "*"
    );
  }
}
