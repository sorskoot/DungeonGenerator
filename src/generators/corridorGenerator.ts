import { rng } from "../utils/rng.js";
import { Container, W_RATIO, MAXTRIES, H_RATIO } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
import { roundToClosest } from "../utils/utils.js";

export class CorridorGenerator extends GeneratorBase {
  width: number;

  constructor(width: number) {
    super();
    this.width = width || 9;
  }
  execute(container: Container, tried = 0): Array<Container | undefined> {
    let r1, r2, r3, r4;
    const isVertical = rng.getUniform() < 0.5;
    if (isVertical) {
      // Vertical
      r1 = new Container(
        container.x,
        container.y,
        roundToClosest(rng.getUniformInt(1, container.w), 3),
        container.h // r1.w, r1.h
      );
      r2 = new Container(
        container.x + r1.w,
        container.y,
        container.w - r1.w,
        container.h // r2.w, r2.h
      );

      var r1_w_ratio = r1.w / r1.h;
      var r2_w_ratio = r2.w / r2.h;
      if (r1_w_ratio < W_RATIO || r2_w_ratio < W_RATIO) {
        if (tried > MAXTRIES) return [undefined, undefined]; // Too many tries
        return this.execute(container, tried + 1);
      }
    } else {
      // Horizontal
      r1 = new Container(
        container.x,
        container.y,
        container.w,
        roundToClosest(rng.getUniformInt(1, container.h), 3) // r1.w, r1.h
      );
      r2 = new Container(
        container.x,
        container.y + r1.h,
        container.w,
        container.h - r1.h // r2.w, r2.h
      );
      var r1_h_ratio = r1.h / r1.w;
      var r2_h_ratio = r2.h / r2.w;
      if (r1_h_ratio < H_RATIO || r2_h_ratio < H_RATIO) {
        if (tried > MAXTRIES) return [undefined, undefined]; // Too many tries
        return this.execute(container, tried + 1);
      }
    }

    var t2 = new Container(r2.x, r2.y, r2.w, r2.h);
    container.lchild = r1;
    container.rchild = t2;

    let container2 = t2;
    if (isVertical) {
      r3 = new Container(
        container2.x + this.width,
        container2.y,
        container2.w - this.width,
        container2.h // r1.w, r1.h
      );
      r4 = new Container(
        container2.x,
        container2.y,
        this.width,
        container2.h,
        true // r2.w, r2.h
      );
      r4.features.push("corridor");
    } else {
      r3 = new Container(
        container2.x,
        container2.y + this.width,
        container2.w,
        container2.h - this.width // r1.w, r1.h
      );
      r4 = new Container(
        container2.x,
        container2.y,
        container2.w,
        this.width,
        true // r2.w, r2.h
      );
      r4.features.push("corridor");
    }

    t2.lchild = r3;
    t2.rchild = r4;

    return [r1, r3, r4];
  }
}
