import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IScriptFunctionExecutor } from "./interfaces/IScriptFunctionExecutor";
import { AnonymousFunctionExecutorSandboxScript } from "./sandbox-scripts/AnonymousFunctionExecutorSandboxScript";
import { FakeParentExecutorSandboxScript } from "./sandbox-scripts/FakeParentSandboxScript";
import { SandboxScriptBlock } from "./sandbox-scripts/SandboxScriptBlock";

export class CommunicationPageScriptInjector
  implements ICommunicationScriptInjector
{
  private functionExecutor: IScriptFunctionExecutor;

  constructor(functionExecutor: IScriptFunctionExecutor) {
    this.functionExecutor = functionExecutor;
  }

  injectCommunicationScript() {
    const commonScripts = new SandboxScriptBlock();
    commonScripts.add(new FakeParentExecutorSandboxScript());
    commonScripts.add(new AnonymousFunctionExecutorSandboxScript());
    this.functionExecutor.injectScript(commonScripts);
  }
}
