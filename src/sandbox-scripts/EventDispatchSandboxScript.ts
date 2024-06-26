import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class EventDispatchSandboxScript extends SandboxScript {
  constructor(
    private eventScript: ISandboxScript,
    private selectorScript: ISandboxScript,
    id?: string
  ) {
    super(id);
  }
  getName(): string {
    return "EventDispatchSandboxScript";
  }
  getChilds(): ISandboxScript[] {
    return [this.selectorScript, this.eventScript];
  }
  getString(): string {
    return `
        const element = ${this.selectorScript.code()}
        const event = ${this.eventScript.code()}
        return element.dispatchEvent(event);
        `;
  }
}
