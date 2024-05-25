import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class EventDispatchDataSandboxScript extends SandboxScript {
  constructor(
    private event: Event,
    private selectorScript: ISandboxScript,
    id?: string
  ) {
    super(id);
  }
  args() {
    return this.event;
  }
  getName(): string {
    return "EventDispatchDataSandboxScript";
  }
  getChilds(): ISandboxScript[] {
    return [this.selectorScript];
  }
  getString(): string {
    return `
        const element = ${this.selectorScript.code()}
        const event = ${this.argsCode()}
        console.log({event});
        return element.dispatchEvent(event);
        `;
  }
}
