import { SandboxScript } from "./SandboxScript";

export class SelectorDocumentSandboxScript extends SandboxScript {
  constructor(id?: string) {
    super(id);
  }
  getName(): string {
    return "SelectorDocumentSandboxScript";
  }
  getString(): string {
    return `
        return document;
        `;
  }
}
