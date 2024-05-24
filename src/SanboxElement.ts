import { IPageSanbox } from "./interfaces/IPageSandbox";
import { ISanboxElement } from "./interfaces/ISanboxElement";
import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
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
    const codeblock = new SandboxScriptBlock();
    const clickEvent = new EventClickCreateSandboxScript();
    const selectorScript = this.selector.getScript();
    const dispatchScript = new EventDispatchSandboxScript(
      clickEvent,
      selectorScript
    );
    codeblock.add(dispatchScript);
    const executor = this.page.getFunctionExecutor();
    executor.executeScript(codeblock);
  }
}
