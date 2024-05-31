import { IPageSandbox } from "./interfaces/IPageSandbox";
import { ISanboxElement } from "./interfaces/ISanboxElement";
import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import { ISandboxScriptBlock } from "./interfaces/ISandboxScriptBlock";
import { ElementExecuteSandboxScript } from "./sandbox-scripts/ElementExecuteSandboxScript";
import { EventCreateSandboxScript } from "./sandbox-scripts/EventCreateSandboxScript";
import { EventDispatchSandboxScript } from "./sandbox-scripts/EventDispatchSandboxScript";
import { FallbackType } from "./sandbox-scripts/FallbackOnetimeSandboxScript";
import { SandboxScriptBlock } from "./sandbox-scripts/SandboxScriptBlock";

export class SanboxElement implements ISanboxElement {
  private page: IPageSandbox;
  private selector: ISanboxElementSelector;
  constructor(page: IPageSandbox, selector: ISanboxElementSelector) {
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

  executeCommand(command: string, args: any[]) {
    const selectorScript = this.selector.getScript();
    const commandScript = new ElementExecuteSandboxScript(selectorScript, {
      command,
      args,
    });
    return this.page.executeScript(commandScript, {});
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
