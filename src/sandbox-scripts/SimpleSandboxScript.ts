import { SandboxScript } from "./SandboxScript";

export class SimpleSandboxScript extends SandboxScript {
  constructor(private script: string, id?: string) {
    super(id);
  }
  getName(): string {
    return "SimpleSandboxScript";
  }
  getString(): string {
    return `
        ${this.script};
        `;
  }
}
