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
  getString(): string {
    return `
        ${this.selectorScript.getString()}
        ${this.eventScript.getString()}
        element.dispatchEvent(event);
        `;
  }
}
