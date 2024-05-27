import { ISanboxElement } from "./interfaces/ISanboxElement";
import { IPageSandbox } from "./interfaces/IPageSandbox";
import { ISandboxScript } from "./interfaces/ISandboxScript";

export class Flow {
  async waitElementExist(element: ISanboxElement, timeout?: number) {
    return element.exist(timeout);
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
    timeout?: number
  ) {
    return page.executeScript(script, { timeout: timeout });
  }
}
