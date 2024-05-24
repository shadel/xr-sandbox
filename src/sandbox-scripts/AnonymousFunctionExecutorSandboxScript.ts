import { SandboxScript } from "./SandboxScript";

export class AnonymousFunctionExecutorSandboxScript extends SandboxScript {
  getName(): string {
    return "AnonymousFunctionExecutorSandboxScript";
  }
  getString(): string {
    return `
        function executeAnonymousFunction(functionBody, args) {
            ${this.getConsole()}
            const func = new Function('args', functionBody);
            func(args);
        }
        window.addEventListener('message', (event) => {
            if (event.data.type === 'executeAnonymousFunction') {
                executeAnonymousFunction(event.data.functionBody, event.data.args);
            }
          });
        `;
  }
}
