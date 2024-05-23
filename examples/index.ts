import CanvasSandboxVirtualization from '../src/CanvasSandboxVirtualization';

const containerElement = document.getElementById('container')!;
const sandboxUrl = 'sandbox.html';
const canvasId = 'sandboxCanvas';
const canvasSandboxVirtualization = new CanvasSandboxVirtualization(containerElement, sandboxUrl, canvasId);

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

// Example of injecting a new function into the global scope
const injectGlobalFunctionButton = document.createElement('button');
injectGlobalFunctionButton.textContent = 'Inject Global Function';
document.body.appendChild(injectGlobalFunctionButton);

injectGlobalFunctionButton.addEventListener('click', () => {
  const functionBody = `
    ctx.fillStyle = 'purple';
    ctx.fillRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.injectFunction(null, 'drawPurpleRect', functionBody);
  canvasSandboxVirtualization.executeCustomFunction('drawPurpleRect');
});

// Example of replacing an existing function in the global scope
const replaceGlobalFunctionButton = document.createElement('button');
replaceGlobalFunctionButton.textContent = 'Replace Global Function';
document.body.appendChild(replaceGlobalFunctionButton);

replaceGlobalFunctionButton.addEventListener('click', () => {
  const functionBody = `
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.replaceFunction(null, 'drawPurpleRect', functionBody);
  canvasSandboxVirtualization.executeCustomFunction('drawPurpleRect');
});

// Example of hooking into an existing function in the global scope
const hookGlobalFunctionButton = document.createElement('button');
hookGlobalFunctionButton.textContent = 'Hook Global Function';
document.body.appendChild(hookGlobalFunctionButton);

hookGlobalFunctionButton.addEventListener('click', () => {
  const hookBody = `
    originalFunction(ctx, canvas, streamCanvasData, args);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.hookFunction(null, 'drawPurpleRect', hookBody);
  canvasSandboxVirtualization.executeCustomFunction('drawPurpleRect');
});

// Example of injecting a function into an object
const injectObjectFunctionButton = document.createElement('button');
injectObjectFunctionButton.textContent = 'Inject Object Function';
document.body.appendChild(injectObjectFunctionButton);

injectObjectFunctionButton.addEventListener('click', () => {
  const functionBody = `
    ctx.fillStyle = 'orange';
    ctx.fillRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.injectFunction('window.myObject', 'drawOrangeRect', functionBody);
  canvasSandboxVirtualization.executeCustomFunction('myObject.drawOrangeRect');
});

// Example of replacing a function in an object
const replaceObjectFunctionButton = document.createElement('button');
replaceObjectFunctionButton.textContent = 'Replace Object Function';
document.body.appendChild(replaceObjectFunctionButton);

replaceObjectFunctionButton.addEventListener('click', () => {
  const functionBody = `
    ctx.fillStyle = 'pink';
    ctx.fillRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.replaceFunction('window.myObject', 'drawOrangeRect', functionBody);
  canvasSandboxVirtualization.executeCustomFunction('myObject.drawOrangeRect');
});

// Example of hooking into a function in an object
const hookObjectFunctionButton = document.createElement('button');
hookObjectFunctionButton.textContent = 'Hook Object Function';
document.body.appendChild(hookObjectFunctionButton);

hookObjectFunctionButton.addEventListener('click', () => {
  const hookBody = `
    originalFunction(ctx, canvas, streamCanvasData, args);
    ctx.strokeStyle = 'blue';
    ctx.strokeRect(10, 10, 150, 100);
    streamCanvasData();
  `;
  canvasSandboxVirtualization.hookFunction('window.myObject', 'drawOrangeRect', hookBody);
  canvasSandboxVirtualization.executeCustomFunction('myObject.drawOrangeRect');
});

// Example of capturing events from the sandbox
const captureMouseMoveButton = document.createElement('button');
captureMouseMoveButton.textContent = 'Capture Mouse Move';
document.body.appendChild(captureMouseMoveButton);

captureMouseMoveButton.addEventListener('click', () => {
  canvasSandboxVirtualization.captureEvent('mousemove');
});

window.addEventListener('mousemove', (event) => {
  console.log('Mouse move event captured from sandbox:', event.detail);
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
