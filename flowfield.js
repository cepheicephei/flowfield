class Flowfield {
  constructor(_resolution, _noiseRes, width, height) {
    this.resolution = _resolution;
    this.noiseRes = _noiseRes;

    this.flowPoints = [];
    this.width = width;
    this.height = height;
    this.increment = 0;

    this.xvals = 0;
    this.yvals = 0;

    this.increment = Helpers.mapRange(this.noiseRes, 1, 1000, 0.00001, 0.05);

    Noise.seed(Math.random());
    
    this.yoff = 0.0;
    for (let y = 0; y < this.height; y += this.resolution) {
      this.yvals++;
      this.yoff += this.increment;
      this.xoff = 0.0;
      this.xvals = 0;
      for (let x = 0; x < this.width; x += this.resolution) {
        this.xvals++;
        this.xoff += this.increment;
        this.flowPoints.push({
          x: x,
          y: y,
          r: Helpers.mapRange(Noise.perlin2(this.xoff, this.yoff), -1, 1, 0, Math.PI * 2)
          // r: Helpers.mapRange(Noise.perlin2(this.xoff, this.yoff), -1, 1, 0, 1),
        });
        // console.log(Helpers.mapRange(Noise.perlin2(this.xoff, this.yoff), -1, 1, 0, Math.PI * 2))
      }
    }
  }

  getRotationByCanvasPosition(x, y) {
    let index =
      Math.floor(Helpers.mapRange(x, 0, this.width, 0, this.xvals)) +
      Math.floor(Helpers.mapRange(y, 0, this.height, 0, this.yvals)) * this.xvals;
    return this.flowPoints[index].r;
  }
}
