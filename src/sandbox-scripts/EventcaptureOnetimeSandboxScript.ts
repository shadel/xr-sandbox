import { SandboxScript } from "./SandboxScript";

export class EventcaptureOnetimeSandboxScript extends SandboxScript {
  private checker: string;
  constructor({ id, checker }: { id?: string; checker: string }) {
    super(id);
    this.checker = checker;
  }
  getName(): string {
    return "EventcaptureOnetimeSandboxScript";
  }
  getString(): string {
    return `
        function checker_${this.getId()}() {
          ${this.checker}
        }
        function sendCaptureEventToParent(data) {
            window.parent.postMessage({ type: 'capturedEvent', data: data }, '*');
        }
        function delayCheckFunc(func, checker) {
          const data = checker();
          if (data) {
            console.log("direct call", func)
            func(data)
          } else {
            const timerhandler = setInterval(() => {
              const data = checker();
              if (data) {
                try {
                  func(data)
                } catch (error) {
                  throw error;
                } finally {
                  clearInterval(timerhandler);
                }
              }
            }, 50)
          }
        }
        delayCheckFunc(sendCaptureEventToParent, checker_${this.getId()});
      `;
  }
}
