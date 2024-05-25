import { SandboxScript } from "./SandboxScript";

export class EventCreateSandboxScript extends SandboxScript {
  constructor(private eventType: string, private options?: any) {
    super();
  }
  getName(): string {
    return "EventClickCreateSandboxScript";
  }
  args() {
    return { eventType: this.eventType, options: this.options };
  }
  getString(): string {
    return `
        const {eventType, options} = ${this.argsCode()}
        const event = new Event(eventType, options)
        return event;
        `;
  }
}
