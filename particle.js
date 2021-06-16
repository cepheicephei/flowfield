class Particle {
  constructor(x, y, w, h, border, flowfield, resolution) {
    this.positionx = x;
    this.positiony = y;

    this.width = w;
    this.height = h;

    this.previousPositionx;
    this.previousPositiony;

    this.vertices = [];
    this.moveSpeed = resolution;

    this.isMoving = true;
    this.removeFlag = false;

    this.border = border;
    this.flowfield = flowfield;
  }

  render() {
    noFill();
    stroke(0);
    beginShape();
    for (let i = 0; i < this.vertices.length; ++i) {
      let v = this.vertices[i];
      vertex(v.x, v.y);
    }
    endShape();
  }

  move() {
    if (!this.removeFlag) {
      let rot = this.flowfield.flowPoints[this.flowfield.getFlowPointByCanvasPosition(this.positionx, this.positiony)].r;
      let xMove = Math.sin(rot * Math.PI * 2) * this.moveSpeed + this.positionx;
      let yMove = Math.cos(rot * Math.PI * 2) * this.moveSpeed + this.positiony;
      if (xMove >= 0 + this.border && xMove <= this.width - this.border && yMove >= 0 + this.border && yMove <= this.height - this.border) {
        this.previousPositionx = this.positionx;
        this.previouspositiony = this.positiony;
        this.positionx = xMove;
        this.positiony = yMove;
      } else {
        // this.removeFlag = true;
      }
    }
  }

  addVertex() {
    this.vertices.push({
      x: this.positionx,
      y: this.positiony,
    });
  }

  removeLoose() {
    if (this.isMoving === false) {
      if (this.vertices.length < 4) {
        this.removeFlag = true;
      }
    }
  }

  physics() {
    if (this.isMoving) {
      this.move();
      if (this.isMoving) this.addVertex();
    }
  }
}
