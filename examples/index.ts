import CanvasSandboxVirtualization from '../src/CanvasSandboxVirtualization';

// Initialize the virtualization with a document element and the sandbox URL
const containerElement = document.getElementById('container')!;
const sandboxUrl = 'sandbox.html';
const canvasSandboxVirtualization = new CanvasSandboxVirtualization(containerElement, sandboxUrl);

document.addEventListener('keydown', (event) => {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
    canvasSandboxVirtualization.sendVirtualKeyPress(event.key);
  }
});

const drawBlueRectButton = document.getElementById('drawBlueRect')!;
drawBlueRectButton.addEventListener('click', () => {
  canvasSandboxVirtualization.drawRectangle(50, 50, 100, 100, 'blue');
});

const drawRedRectButton = document.getElementById('drawRedRect')!;
drawRedRectButton.addEventListener('click', () => {
  canvasSandboxVirtualization.drawRectangle(150, 150, 100, 100, 'red');
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
