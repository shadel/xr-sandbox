import CanvasSandboxVirtualization from '../src/CanvasSandboxVirtualization';

describe('CanvasSandboxVirtualization', () => {
  let container: HTMLElement;
  let sandboxUrl: string;
  let canvasSandbox: CanvasSandboxVirtualization;

  beforeEach(() => {
    document.body.innerHTML = '<div id="container"></div>';
    container = document.getElementById('container')!;
    sandboxUrl = 'http://localhost/sandbox.html';
    canvasSandbox = new CanvasSandboxVirtualization(container, sandboxUrl);
  });

  test('should initialize with a canvas and iframe', () => {
    const iframe = container.querySelector('iframe');
    const canvas = container.querySelector('#mainCanvas');
    expect(iframe).toBeTruthy();
    expect(canvas).toBeTruthy();
  });

  test('should send virtual key press to iframe', () => {
    const postMessageSpy = jest.spyOn(canvasSandbox['sandboxIframe'].contentWindow!, 'postMessage');
    canvasSandbox.sendVirtualKeyPress('F1');
    expect(postMessageSpy).toHaveBeenCalledWith({ type: 'virtualKeyPress', key: 'F1' }, '*');
  });

  test('should handle canvas data messages', () => {
    const event = new MessageEvent('message', {
      data: { type: 'canvasData', data: 'data:image/png;base64,somebase64data' },
    });
    const drawImageSpy = jest.spyOn(canvasSandbox['mainCtx'], 'drawImage');
    canvasSandbox.handleMessage(event);
    expect(drawImageSpy).toHaveBeenCalled();
  });
});