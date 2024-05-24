import { IPageSanbox } from "./interfaces/IPageSandbox";
import { ISanboxElement } from "./interfaces/ISanboxElement";
import { ISanboxElementSelector } from "./interfaces/ISanboxElementSelector";
import { ISandboxScript } from "./interfaces/ISandboxScript";
import { ISandboxScriptBlock } from "./interfaces/ISandboxScriptBlock";
import { EventcaptureOnetimeSandboxScript } from "./sandbox-scripts/EventcaptureOnetimeSandboxScript";
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
    const selectorScript = this.selector.getScript();
    const dispatchScript = new EventDispatchSandboxScript(
      event,
      selectorScript
    );
    this.executeScriptInBlock([dispatchScript]);
  }
  exist(timeout = 10 * 1000): Promise<void> {
    const selectorScript = this.selector.getScript();
    const evtKey = `step1-completed-${selectorScript.getId()}`;
    const step1Checker = new EventcaptureOnetimeSandboxScript({
      checker: `
    ${selectorScript.getString()}
    if (!element) {
      return false;
    }
    return {eventType: '${evtKey}'}
  `,
    });

    const eventRespone = new Promise<void>((resolve, reject) => {
      let isTimeout = false;
      const timeoutHandler = setTimeout(() => {
        isTimeout = true;
        clearTimeout(timeoutHandler);
        reject(
          new Error(`Element: ${this.selector.getName()} time out ${timeout}`)
        );
      }, timeout);

      const messageHandler = this.page.getMessageHandler();
      messageHandler.add({
        type: "capturedEvent",
        handler: (eventData: any) => {
          if (isTimeout) {
            return;
          }
          console.log(
            "exist capturedEvent",
            eventData.data.eventType,
            evtKey,
            eventData
          );
          if (eventData.data.eventType !== evtKey) {
            return;
          }
          clearTimeout(timeoutHandler);
          resolve(eventData);
        },
      });
    });

    this.executeScriptInBlock([step1Checker]);

    return eventRespone;
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
