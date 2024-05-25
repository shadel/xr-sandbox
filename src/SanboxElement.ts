import { IPageSanbox } from "./interfaces/IPageSandbox";
import { ISanboxElement } from "./interfaces/ISanboxElement";
import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import { ISandboxScriptBlock } from "./interfaces/ISandboxScriptBlock";
import { EventCreateSandboxScript } from "./sandbox-scripts/EventCreateSandboxScript";
import { EventDispatchSandboxScript } from "./sandbox-scripts/EventDispatchSandboxScript";
import { FallbackType } from "./sandbox-scripts/FallbackOnetimeSandboxScript";
import { SandboxScriptBlock } from "./SandboxScriptBlock";

export class SanboxElement implements ISanboxElement {
  private page: IPageSanbox;
  private selector: ISanboxElementSelector;
  constructor(page: IPageSanbox, selector: ISanboxElementSelector) {
    this.page = page;
    this.selector = selector;
  }
  click() {
    const clickEvent = new EventCreateSandboxScript("click", { bubbles: true }); // new Event( "click", { bubbles: true } )
    return this.dispatchEvent(clickEvent);
  }

  dispatchEvent(event: ISandboxScript) {
    const selectorScript = this.selector.getScript();
    const dispatchScript = new EventDispatchSandboxScript(
      event,
      selectorScript
    );
    return this.page.executeScript(dispatchScript, {});
  }
  exist(timeout?: number): Promise<void> {
    const selectorScript = this.selector.getScript();
    return this.page.executeScript(selectorScript, {
      type: FallbackType.CHECK,
      timeout,
    });
  }

  private executeScript(codeblock: ISandboxScriptBlock) {
    const executor = this.page.getFunctionExecutor();
    executor.executeScript(codeblock);
  }

  private executeScriptInBlock(scripts: ISandboxScript[]) {
    const codeblock = new SandboxScriptBlock();
    scripts.forEach((scipt) => {
      codeblock.add(scipt);
    });
    this.executeScript(codeblock);
  }
}
