let path, svg, w, h, ns, programLoop, ff, border, resolution;
let sFramerate, sNoiseRes, sMaxParticles, sParticleSpeed;
let particles = [];
document.addEventListener("DOMContentLoaded", (event) => {
  async function setup() {
    ns = "http://www.w3.org/2000/svg";
    path = document.createElementNS(ns, "path");
    svg = document.getElementById("svg-canvas");
    w = svg.viewBox.animVal.width;
    h = svg.viewBox.animVal.height;

    border = 8;
    resolution = 4;
    
    sFramerate = document.getElementById("framerate-slider");
    sFramerate.addEventListener("input", () => {
      noLoop();
      document.getElementById("framerate").innerHTML =
      "Refresh rate: " + sFramerate.value + "ms";
      document.getElementById("loop-toggle").innerHTML = "STOP";
      loop();
    });
    sNoiseRes = document.getElementById("noise-resolution-slider");
    sNoiseRes.addEventListener("input", () => {
      document.getElementById("noise-resolution").innerHTML =
      "Noise resolution: " + sNoiseRes.value;
      generateFlowfield()
    });
    sMaxParticles = document.getElementById("max-particles-slider");
    sMaxParticles.addEventListener("input", () => {
      document.getElementById("max-lines").innerHTML =
      "Max lines: " + sMaxParticles.value;
    });
    sParticleSpeed = document.getElementById("particle-speed-slider");
    sParticleSpeed.addEventListener("input", () => {
      document.getElementById("draw-speed").innerHTML =
      "Draw speed: " + sParticleSpeed.value;
    });

    generateFlowfield();
  }

  function generateFlowfield() {
    ff = new Flowfield(resolution, sNoiseRes.value, w, h);
    particles = [];
  }

  function draw() {
    for (let speedUp = 0; speedUp < sParticleSpeed.value; ++speedUp) {
      clearPath(svg);
      if (particles.length >= sMaxParticles.value) {
        particles.splice(0, particles.length - sMaxParticles.value);
      }
      particles.push(
        new Particle(
          mapRange(Math.random(), 0, 1, border, w - border),
          mapRange(Math.random(), 0, 1, border, h - border),
          w,
          h,
          border,
          ff,
          resolution
        )
      );

      for (let i = 0; i < particles.length; ++i) {
        let p = particles[i];
        p.physics();
        p.removeLoose();
        if (p.removeFlag) particles.splice(i, 1);
      }
    }

    for (let i = 0; i < particles.length; ++i) {
      path = document.createElementNS(ns, "path");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke", "black");
      path.setAttribute("stroke-width", "0.5");
      d = "M ";
      particles[i].vertices.forEach((v, idx, array) => {
        if (idx !== array.length - 1) d += v.x + " " + v.y + " L ";
        else d += v.x + " " + v.y;
      });
      path.setAttribute("d", d);
      svg.appendChild(path);
    }
    // clearPath(svg);
    // let d,
    //   len = 1000;
    // startX = w / 2;
    // startY = h / 2;

    // path = document.createElementNS(ns, "path");
    // path.setAttribute("fill", "none");
    // path.setAttribute("stroke", "black");
    // path.setAttribute("stroke-width", "0.25mm");

    // d = "M " + startX + " " + startY + " ";
    // for (let i = 0; i < len; i++) {
    //   d += " L " + startX + " " + startY;
    //   startX += (Math.random() - 0.5) * 12;
    //   startY += (Math.random() - 0.5) * 12;
    // }
    // path.setAttribute("d", d);
    // svg.appendChild(path);

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

  function mapRange(value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
  }

  document
    .getElementById("generate-flowfield")
    .addEventListener("click", () => {
      noLoop();
      generateFlowfield();
      loop();
      document.getElementById("loop-toggle").innerHTML = "STOP";
    });
  document.getElementById("loop-toggle").addEventListener("click", () => {
    if (document.getElementById("loop-toggle").innerHTML === "START") {
      loop();
      document.getElementById("loop-toggle").innerHTML = "STOP";
    } else if (document.getElementById("loop-toggle").innerHTML === "STOP") {
      noLoop();
      document.getElementById("loop-toggle").innerHTML = "START";
    }
  });
  document.getElementById("save").addEventListener("click", () => {
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
