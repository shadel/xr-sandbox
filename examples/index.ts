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

const drawBlueRectButton = document.getElementById('drawBlueRect')!;
drawBlueRectButton.addEventListener('click', () => {
  canvasSandboxVirtualization.drawRectangle(50, 50, 100, 100, 'blue');
});

const drawRedRectButton = document.getElementById('drawRedRect')!;
drawRedRectButton.addEventListener('click', () => {
  canvasSandboxVirtualization.drawRectangle(150, 150, 100, 100, 'red');
});

// Add new custom logic without changing CanvasSandboxVirtualization
const customFunctionButton = document.createElement('button');
customFunctionButton.textContent = 'Custom Function';
document.body.appendChild(customFunctionButton);

customFunctionButton.addEventListener('click', () => {
  const functionBody = `
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.fill();
    streamCanvasData();
  `;
  canvasSandboxVirtualization.executeCustomFunction(functionBody);
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
