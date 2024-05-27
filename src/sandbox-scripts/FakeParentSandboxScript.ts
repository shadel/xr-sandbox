import { SandboxScript } from "./SandboxScript";

export class FakeParentExecutorSandboxScript extends SandboxScript {
  getName(): string {
    return "FakeParentExecutorSandboxScript";
  }
  getString(): string {
    return `
        const _fakeparent = window.parent;
        window.parent = window;
        window._fakeparent = _fakeparent;
        `;
  }
}
