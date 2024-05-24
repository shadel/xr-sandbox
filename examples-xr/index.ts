import PageSandbox from "../src/PageSandbox";

const containerElement = document.getElementById("container")!;
const sandboxUrl = "./SystemAnimatorOnline/XR_Animator_improve.html";
const pogeSandbox = new PageSandbox(
  containerElement,
  sandboxUrl,
);

const drawBlueRectButton = document.getElementById("drawBlueRect")!;
drawBlueRectButton.addEventListener("click", () => {
  console.log("click")
});

if (import.meta.hot) {
  import.meta.hot.accept();
}
