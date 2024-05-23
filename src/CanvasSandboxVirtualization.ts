import SandboxVirtualizationBase from './SandboxVirtualizationBase';

class CanvasSandboxVirtualization extends SandboxVirtualizationBase {
  private mainCanvas: HTMLCanvasElement;
  private mainCtx: CanvasRenderingContext2D;

  constructor(documentElement: HTMLElement, sandboxUrl: string) {
    super(documentElement, sandboxUrl);
    this.initializeCanvas();
  }

  private initializeCanvas() {
    this.mainCanvas = document.createElement('canvas');
    this.mainCanvas.id = 'mainCanvas';
    this.mainCanvas.width = 800;
    this.mainCanvas.height = 600;
    this.documentElement.appendChild(this.mainCanvas);
    this.mainCtx = this.mainCanvas.getContext('2d')!;
  }

  injectCommunicationScript() {
    const scriptContent = `
            (function() {
                const canvas = document.getElementById('sandboxCanvas');
                const ctx = canvas.getContext('2d');

                function streamCanvasData() {
                    const dataUrl = canvas.toDataURL();
                    window.parent.postMessage({ type: 'canvasData', data: dataUrl }, '*');
                }

                function handleKeyPress(event) {
                    if (event.key === 'F1') {
                        ctx.fillStyle = 'blue';
                        ctx.fillRect(50, 50, 100, 100);
                    } else if (event.key === 'F2') {
                        ctx.fillStyle = 'red';
                        ctx.fillRect(150, 150, 100, 100);
                    }
                    streamCanvasData();
                }

                window.addEventListener('keydown', handleKeyPress);
                window.addEventListener('message', (event) => {
                    if (event.data.type === 'virtualKeyPress') {
                        const keyEvent = new KeyboardEvent('keydown', { key: event.data.key });
                        window.dispatchEvent(keyEvent);
                    }
                });

                setInterval(streamCanvasData, 1000);
            })();
        `;
    this.injectScript(scriptContent);
  }

  handleMessage(event: MessageEvent) {
    if (event.data.type === 'canvasData') {
      const img = new Image();
      img.src = event.data.data;
      img.onload = () => {
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.drawImage(img, 0, 0);
      };
    }
  }

  sendVirtualKeyPress(key: string) {
    this.sendMessage({ type: 'virtualKeyPress', key });
  }
}

export default CanvasSandboxVirtualization;