import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class EventClickCreateSandboxScript extends SandboxScript {
  getName(): string {
    return "EventClickCreateSandboxScript";
  }
  getString(): string {
    return `
        const event = document.createEvent("MouseEvents");
        event.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null);
        return event;
        `;
  }
}
