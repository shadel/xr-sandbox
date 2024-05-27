import { SandboxScript } from "./SandboxScript";

export class AnonymousFunctionExecutorSandboxScript extends SandboxScript {
  getName(): string {
    return "AnonymousFunctionExecutorSandboxScript";
  }
  getString(): string {
    return `
        function executeAnonymousFunction(functionBody, args) {
            ${this.getConsole()}
            const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
            const func = new AsyncFunction('args', functionBody);
            return func(args);
        }
        window.addEventListener('message', (event) => {
            if (event.data.type === 'executeAnonymousFunction') {
                executeAnonymousFunction(event.data.functionBody, event.data.args);
            }
          });
        `;
  }
}
