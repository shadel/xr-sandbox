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
      async function checkerEventcaptureOnetime() {
          ${this.checker}
        }
        function sendCaptureEventToParent(data) {
            window._fakeparent.postMessage({ type: 'capturedEvent', data: data }, '*');
        }
        async function delayCheckFunc(func, checker) {
          const data = await checker();
          if (data) {
            console.log("direct call", func)
            func(data)
          } else {
            const timerhandler = setInterval(async () => {
              const data = await checker();
              if (data) {
                console.log("delayCheckFunc call", data)
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
        delayCheckFunc(sendCaptureEventToParent, checkerEventcaptureOnetime);
      `;
  }
}
