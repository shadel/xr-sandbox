import { SandboxScript } from "./SandboxScript";

export class SelectorWindowSandboxScript extends SandboxScript {
  constructor(id?: string) {
    super(id);
  }
  getName(): string {
    return "SelectorWindowSandboxScript";
  }
  getString(): string {
    return `
        return window;
        `;
  }
}
