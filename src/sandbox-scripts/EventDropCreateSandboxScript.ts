import { ISandboxScript } from "../interfaces/ISandboxScript";
import { SandboxScript } from "./SandboxScript";

export class EventDropCreateSandboxScript extends SandboxScript {
  constructor(private fileSCript: ISandboxScript) {
    super();
  }
  getName(): string {
    return "EventDropCreateSandboxScript";
  }
  getChilds(): ISandboxScript[] {
    return [this.fileSCript];
  }
  getString(): string {
    return `
      const file = ${this.fileSCript.code()}
      const fakeDropEvent = new DragEvent('drop');
      // You override dataTransfer with whichever property
      // and method the drop function needs
      Object.defineProperty(fakeDropEvent, 'dataTransfer', {
        value: file
      });
      return fakeDropEvent;
    `;
  }
}
