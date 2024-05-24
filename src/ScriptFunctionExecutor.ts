import { FunctionExecutor } from "./FunctionExecutor";
import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";
import { ISandboxScriptBlock } from "./interfaces/ISandboxScriptBlock";
import { IScriptFunctionExecutor } from "./interfaces/IScriptFunctionExecutor";

export class ScriptFunctionExecutor implements IScriptFunctionExecutor {
  private functionExecutor: IFunctionExecutor;

  constructor(sandboxIframe: HTMLIFrameElement) {
    this.functionExecutor = new FunctionExecutor(sandboxIframe);
  }
  executeScript(scriptContent: ISandboxScriptBlock): void {
    this.functionExecutor.executeScript(scriptContent.getString());
  }

  injectScript(scriptContent: ISandboxScriptBlock) {
    this.functionExecutor.injectScript(scriptContent.getString());
  }

  executeFunction(functionName: string, args?: any) {
    this.functionExecutor.executeFunction(functionName, args);
  }
}
