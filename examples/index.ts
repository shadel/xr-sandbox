import CanvasSandboxVirtualization from '../src/CanvasSandboxVirtualization';

const containerElement = document.getElementById('container')!;
const sandboxUrl = 'sandbox.html';
const canvasSandboxVirtualization = new CanvasSandboxVirtualization(containerElement, sandboxUrl);

document.addEventListener('keydown', (event) => {
  if (event.key === 'F1' || event.key === 'F2') {
    event.preventDefault();
    canvasSandboxVirtualization.sendVirtualKeyPress(event.key);
  }
});

if (import.meta.hot) {
  import.meta.hot.accept();
}