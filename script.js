let path, svg, w, h, ns, programLoop;
document.addEventListener("DOMContentLoaded", (event) => {
  async function setup() {
    ns = "http://www.w3.org/2000/svg";
    path = document.createElementNS(ns, "path");
    svg = document.getElementById("svg-canvas");
    w = svg.viewBox.animVal.width;
    h = svg.viewBox.animVal.height;
  }
  function loop() {
    clearPath(svg);
    let d,
      len = Math.random() * 5000 + 5;
    startX = Math.random() * w;
    startY = Math.random() * h;

    for (let i = 0; i < len; i++) {
      d = "M " + startX + " " + startY + " ";
      startX += (Math.random() - 0.5) * 20;
      startY += (Math.random() - 0.5) * 20;
      d += " L " + startX + " " + startY;
      path = document.createElementNS(ns, "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "1");
      path.setAttribute("d", d);
      svg.appendChild(path);
    }
  }
  setup();
  // setup().then(() => {
  //   loop();
  // });

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
    programLoop = setInterval(function () {
      loop();
    }, 1000);
  });
  document.getElementById("stop").addEventListener("click", () => {
    console.log("STOP");
    clearInterval(programLoop);
  });
  document.getElementById("save").addEventListener("click", () => {
    console.log("STOP");
    clearInterval(programLoop);
    
  });
});
