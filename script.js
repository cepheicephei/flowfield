let path, svg, w, h, ns, programLoop;
let sFramerate;
document.addEventListener("DOMContentLoaded", (event) => {
  async function setup() {
    ns = "http://www.w3.org/2000/svg";
    path = document.createElementNS(ns, "path");
    svg = document.getElementById("svg-canvas");
    w = svg.viewBox.animVal.width;
    h = svg.viewBox.animVal.height;

    sFramerate = document.getElementById("framerate-slider");
    sFramerate.addEventListener("change", () => {
      console.log(sFramerate.value);
      loop();
    });
  }

  function draw() {
    clearPath(svg);
    let d,
      len = 1000;
    startX = w / 2;
    startY = h / 2;

    path = document.createElementNS(ns, "path");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "black");
    path.setAttribute("stroke-width", "0.25mm");

    d = "M " + startX + " " + startY + " ";
    for (let i = 0; i < len; i++) {
      d += " L " + startX + " " + startY;
      startX += (Math.random() - 0.5) * 12;
      startY += (Math.random() - 0.5) * 12;
    }
    path.setAttribute("d", d);
    svg.appendChild(path);

  //   for (let i = 0; i < len; i++) {
  //     path = document.createElementNS(ns, "circle");
  //     path.setAttribute("fill", "white");
  //     path.setAttribute("stroke", "black");
  //     path.setAttribute("stroke-width", "0.35mm");
  //     path.setAttribute("cx", startX);
  //     path.setAttribute("cy", startY);
  //     path.setAttribute("r", 40 * i / 1000 + 10);
  //     startX += (Math.random() - 0.5) * 12;
  //     startY += (Math.random() - 0.5) * 12;
  //     svg.appendChild(path);
  //   }
  }
  setup();

  function loop() {
    noLoop();
    programLoop = setInterval(function () {
      draw();
    }, sFramerate.value);
  }

  function noLoop() {
    clearInterval(programLoop);
  }

  function clearPath(_svg) {
    let children = _svg.children;
    for (let i = 0; i < children.length; ) {
      let el = children[i];
      if (el.tagName !== "defs") {
        el.remove();
      } else i++;
    }
  }

  document.getElementById("start").addEventListener("click", () => {
    console.log("START");
    loop();
  });
  document.getElementById("stop").addEventListener("click", () => {
    console.log("STOP");
    noLoop();
  });
  document.getElementById("save").addEventListener("click", () => {
    console.log("STOP");
    noLoop();
    // let content = document.getElementById('svg-canvas');
    // let filename = 'file.svg';
    // let blob = new Blob([content], {type: "text/plain;charset=utf-8"});
    // save(blob, filename);
    let data = document.getElementById("canvas-wrapper").innerHTML;
    let bl = new Blob([data], { type: "image/svg+xml" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(bl);
    a.download = "data.svg";
    a.hidden = true;
    document.body.appendChild(a);
    a.innerHTML = "someinnerhtml";
    a.click();
  });
});
