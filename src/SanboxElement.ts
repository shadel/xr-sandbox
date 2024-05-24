import { IPageSanbox } from "./interfaces/IPageSandbox";
import { ISanboxElement } from "./interfaces/ISanboxElement";
import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import { EventClickCreateSandboxScript } from "./sandbox-scripts/EventClickCreateSandboxScript";
import { EventDispatchSandboxScript } from "./sandbox-scripts/EventDispatchSandboxScript";
import { SandboxScriptBlock } from "./SandboxScriptBlock";

export class SanboxElement implements ISanboxElement {
  private page: IPageSanbox;
  private selector: ISanboxElementSelector;
  constructor(page: IPageSanbox, selector: ISanboxElementSelector) {
    this.page = page;
    this.selector = selector;
  }
  click() {
    const clickEvent = new EventClickCreateSandboxScript();
    this.dispatchEvent(clickEvent);
  }

  dispatchEvent(event: ISandboxScript) {
    const codeblock = new SandboxScriptBlock();
    const selectorScript = this.selector.getScript();
    const dispatchScript = new EventDispatchSandboxScript(
      event,
      selectorScript
    );
    codeblock.add(dispatchScript);
    this.executeScript(codeblock);
  }

  private executeScript(codeblock: SandboxScriptBlock) {
    const executor = this.page.getFunctionExecutor();
    executor.executeScript(codeblock);
  }
}
