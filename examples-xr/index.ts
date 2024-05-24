import { IdElemenetSelector } from "../src/IdElementSelector";
import { SanboxElement } from "../src/SanboxElement";
import PageSandbox from "../src/PageSandbox";
import {Flow} from "../src/Flow";
import {EventcaptureOnetimeSandboxScript} from "../src/sandbox-scripts/EventcaptureOnetimeSandboxScript";


async function runner() {

  const containerElement = document.getElementById("container")!;
  const sandboxUrl = "./SystemAnimatorOnline/XR_Animator_improve.html";
  
  const step1Checker = new EventcaptureOnetimeSandboxScript({checker: `
    const startButton = document.getElementById('LMMD_StartButton');
    if (!startButton) {
      return false;
    }
    return {eventType: 'step1-completed'}
  `})
  
  const pageSandbox = new PageSandbox({
    documentElement: containerElement,
    sandboxUrl,
  });
  
  const sandboxStartButton = new SanboxElement(pageSandbox, new IdElemenetSelector("LMMD_StartButton"));


  const flow = new Flow();

  await flow.waitElementExist(sandboxStartButton);
  
  await sandboxStartButton.click();

  console.log("show char")
  
  const drawBlueRectButton = document.getElementById("drawBlueRect")!;
  drawBlueRectButton.addEventListener("click", () => {
    console.log("click");
    sandboxStartButton.click();
  });
}
runner();

if (import.meta.hot) {
  import.meta.hot.accept();
}
