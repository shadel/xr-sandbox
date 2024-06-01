import { ISanboxElement } from "./interfaces/ISanboxElement";
import { IPageSandbox } from "./interfaces/IPageSandbox";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import { FallbackType } from "./sandbox-scripts/FallbackOnetimeSandboxScript";

export class Flow {
  async waitElementExist(element: ISanboxElement, timeout?: number) {
    return element.exist(timeout);
  }
  async waitElementExecute(
    element: ISanboxElement,
    options: { command: string; args?: any[] },
    timeout?: number
  ) {
    return element.executeCommand(options.command, options.args || [], timeout);
  }
  async waitDispatch(
    element: ISanboxElement,
    evnt: ISandboxScript,
    timeout?: number
  ) {
    return element.dispatchEvent(evnt, timeout);
  }
  async waitScriptRun(
    page: IPageSandbox,
    script: ISandboxScript,
    options?: { type: FallbackType; timeout?: number }
  ) {
    return page.executeScript(script, options || {});
  }
}
