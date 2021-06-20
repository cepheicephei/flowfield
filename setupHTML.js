/*
CREATE WRAPPERS
*/
let svgCanvasWrapper = document.createElement("div");
svgCanvasWrapper.setAttribute("id", "svg-canvas-wrapper");

let settingsWrapper = document.createElement("div");
settingsWrapper.setAttribute("class", "settings-wrapper");

let buttonWrapper = document.createElement("div");
buttonWrapper.setAttribute("class", "btn-wrapper");

let sliderWrapper = document.createElement("div");
sliderWrapper.setAttribute("class", "slider-wrapper");

/*
CREATE CANVASES
*/
let svgCanvas = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgCanvas.setAttribute("version", "1.1");
svgCanvas.setAttribute("id", "svg-canvas");
svgCanvas.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svgCanvas.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
svgCanvas.setAttribute("x", "0");
svgCanvas.setAttribute("y", "0");
svgCanvas.setAttribute("viewBox", "0 0 840 594");
svgCanvas.setAttribute("width", "42cm");
svgCanvas.setAttribute("height", "29.7cm");
svgCanvas.setAttribute("xml:space", "preserve");

svgCanvasWrapper.appendChild(svgCanvas);
document.body.appendChild(svgCanvasWrapper);

/*
CREATE BUTTONS
*/
let regenerateFlowfieldButton = document.createElement("button");
regenerateFlowfieldButton.setAttribute("id", "generate-flowfield");
regenerateFlowfieldButton.innerHTML = "REGENERATE FLOWFIELD";

let startStopButton = document.createElement("button");
startStopButton.setAttribute("id", "loop-toggle");
startStopButton.innerHTML = "START";

let saveButton = document.createElement("button");
saveButton.setAttribute("id", "save");
saveButton.innerHTML = "SAVE SVG";

buttonWrapper.appendChild(regenerateFlowfieldButton);
buttonWrapper.appendChild(startStopButton);
buttonWrapper.appendChild(saveButton);
settingsWrapper.appendChild(buttonWrapper);

/*
CREATE SLIDERS
*/
let noiseResolutionSliderWrapper = document.createElement("div");
noiseResolutionSliderWrapper.setAttribute("class", "slider-with-caption");

let noiseResolutionSliderCaption = document.createElement("p");
noiseResolutionSliderCaption.setAttribute("id", "noise-resolution");
noiseResolutionSliderCaption.setAttribute("class", "info-label");
noiseResolutionSliderCaption.innerHTML = "Noise resolution: 500";

let noiseResolutionSlider = document.createElement("input");
noiseResolutionSlider.setAttribute("type", "range");
noiseResolutionSlider.setAttribute("min", "1");
noiseResolutionSlider.setAttribute("max", "1000");
noiseResolutionSlider.setAttribute("value", "500");
noiseResolutionSlider.setAttribute("class", "slider");
noiseResolutionSlider.setAttribute("id", "noise-resolution-slider");

noiseResolutionSliderWrapper.appendChild(noiseResolutionSliderCaption);
noiseResolutionSliderWrapper.appendChild(noiseResolutionSlider);
sliderWrapper.appendChild(noiseResolutionSliderWrapper);


let maxParticlesSliderWrapper = document.createElement("div");
maxParticlesSliderWrapper.setAttribute("class", "slider-with-caption");

let maxParticlesSliderCaption = document.createElement("p");
maxParticlesSliderCaption.setAttribute("id", "max-lines");
maxParticlesSliderCaption.setAttribute("class", "info-label");
maxParticlesSliderCaption.innerHTML = "Max Lines: 200";

let maxParticlesSlider = document.createElement("input");
maxParticlesSlider.setAttribute("type", "range");
maxParticlesSlider.setAttribute("min", "20");
maxParticlesSlider.setAttribute("max", "1000");
maxParticlesSlider.setAttribute("value", "200");
maxParticlesSlider.setAttribute("class", "slider");
maxParticlesSlider.setAttribute("id", "max-particles-slider");

maxParticlesSliderWrapper.appendChild(maxParticlesSliderCaption);
maxParticlesSliderWrapper.appendChild(maxParticlesSlider);
sliderWrapper.appendChild(maxParticlesSliderWrapper);


let particleSpeedSliderWrapper = document.createElement("div");
particleSpeedSliderWrapper.setAttribute("class", "slider-with-caption");

let particleSpeedSliderCaption = document.createElement("p");
particleSpeedSliderCaption.setAttribute("id", "draw-speed");
particleSpeedSliderCaption.setAttribute("class", "info-label");
particleSpeedSliderCaption.innerHTML = "Draw Speed: 100";

let particleSpeedSlider = document.createElement("input");
particleSpeedSlider.setAttribute("type", "range");
particleSpeedSlider.setAttribute("min", "1");
particleSpeedSlider.setAttribute("max", "100");
particleSpeedSlider.setAttribute("value", "5");
particleSpeedSlider.setAttribute("class", "slider");
particleSpeedSlider.setAttribute("id", "particle-speed-slider");

particleSpeedSliderWrapper.appendChild(particleSpeedSliderCaption);
particleSpeedSliderWrapper.appendChild(particleSpeedSlider);
sliderWrapper.appendChild(particleSpeedSliderWrapper);


settingsWrapper.appendChild(sliderWrapper);
document.body.appendChild(settingsWrapper);
