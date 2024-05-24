import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";

export class CommunicationPageScriptInjector
  implements ICommunicationScriptInjector
{
  private functionExecutor: IFunctionExecutor;

  constructor(functionExecutor: IFunctionExecutor) {
    this.functionExecutor = functionExecutor;
  }

  injectCommunicationScript() {
    const commonScriptContent = `
      (function() {
        // CommunicationPageScriptInjector
      })();
    `;
    this.functionExecutor.injectScript(commonScriptContent);
  }
}
