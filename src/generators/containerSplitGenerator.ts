import { rng } from "../utils/rng.js";
import { Container, W_RATIO, MAXTRIES, H_RATIO } from "../container.js";
import { GeneratorBase } from "./generatorBase.js";
import { roundToClosest } from "../utils/utils.js";

export class ContainerSplitGenerator extends GeneratorBase {
  execute(
    container: Container,
    tried: number = 0
  ): Array<Container | undefined> {
    var r1, r2;
    if (rng.getUniform() < 0.5) {
      // Vertical
      r1 = new Container(
        container.x,
        container.y,
        // Round to closed multiple of 3 to make sure the rooms are a certain size. This
        // adds a consistancy to the rooms in the mansion.
        roundToClosest(rng.getUniformInt(1, container.w), 3),
        container.h // r1.w, r1.h
      );
      r2 = new Container(
        container.x + r1.w,
        container.y,
        container.w - r1.w,
        container.h // r2.w, r2.h
      );

      // Check if the rooms are too narrow to prevent odd looking rooms.
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
    container.lchild = r1;
    container.rchild = r2;

    return [r1, r2];
  }
}
