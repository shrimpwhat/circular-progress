import "./index.scss";

import CircularProgress from "./circularProgress";

const circularProgress = new CircularProgress("progress-container");

const valueInput = document.getElementById("value") as HTMLInputElement;
const animateCheckbox = document.getElementById("animate") as HTMLInputElement;
const hideCheckbox = document.getElementById("hide") as HTMLInputElement;

valueInput.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    const progress = target.valueAsNumber;
    circularProgress.setProgress(isNaN(progress) ? 0 : progress);
});

animateCheckbox.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
        circularProgress.startAnimation();
    } else {
        circularProgress.stopAnimation();
    }
});

hideCheckbox.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.checked) {
        circularProgress.hide();
    } else {
        circularProgress.show();
    }
});
