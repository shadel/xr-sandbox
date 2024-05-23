import { ICommunicationScriptInjector } from "./interfaces/ICommunicationScriptInjector";
import { IFunctionExecutor } from "./interfaces/IFunctionExecutor";

export class CommunicationScriptInjector
  implements ICommunicationScriptInjector
{
  private canvasId: string;
  private functionExecutor: IFunctionExecutor;

  constructor(canvasId: string, functionExecutor: IFunctionExecutor) {
    this.canvasId = canvasId;
    this.functionExecutor = functionExecutor;
  }

  injectCommunicationScript() {
    const commonScriptContent = `
      (function() {
        const canvas = document.getElementById('${this.canvasId}');
        const ctx = canvas.getContext('2d');
        const sandboxFunctions = {};

        function streamCanvasData() {
          const dataUrl = canvas.toDataURL();
          window.parent.postMessage({ type: 'canvasData', data: dataUrl }, '*');
        }

        function handleMouseEvent(data) {
          const mouseEvent = new MouseEvent(data.eventType, {
            clientX: data.clientX,
            clientY: data.clientY,
            offsetX: data.offsetX,
            offsetY: data.offsetY,
            button: data.button,
            bubbles: true,
            cancelable: true,
            view: window
          });
          canvas.dispatchEvent(mouseEvent);
          streamCanvasData();
        }

        function executeFunction(functionName, args) {
          if (sandboxFunctions[functionName]) {
            sandboxFunctions[functionName](ctx, canvas, streamCanvasData, args);
          } else if (window[functionName]) {
            window[functionName](ctx, canvas, streamCanvasData, args);
          } else {
            console.error(\`Function \${functionName} not found in sandbox.\`);
          }
        }

        window.addEventListener('message', (event) => {
          if (event.data.type === 'mouseEvent') {
            handleMouseEvent(event.data);
          } else if (event.data.type === 'executeFunction') {
            executeFunction(event.data.functionName, event.data.args);
          }
        });

        setInterval(streamCanvasData, 200);
      })();
    `;
    this.functionExecutor.injectScript(commonScriptContent);
  }
}
