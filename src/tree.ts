// import { Container } from "./container.js";
// import { DebugCanvas } from "./debugCanvas.js";

// export class Tree {
//   leaf: Container;
//   lchild: Tree | undefined;
//   rchild: Tree | undefined;

//   /**
//    * instantiates a new tree
//    * @param {Tree} leaf - the leaf to be added to the tree; undefined if the tree is empty
//    */
//   constructor(leaf: Container) {
//     //  this.container = container;
//     this.leaf = leaf;
//     this.lchild = undefined;
//     this.rchild = undefined;
//   }

//   /**
//    * iterate through all the nodes on the tree finding the end leafs.
//    * @returns {Array<Container>} All the end leafs of the tree
//    */
//   getLeafs(): Array<Container> {
//     if (this.lchild === undefined && this.rchild === undefined) {
//       return [this.leaf!];
//     } else {
//       const temp = [];
//       if (this.lchild) {
//         temp.push(...this.lchild.getLeafs());
//       } else if (this.rchild) {
//         temp.push(...this.rchild.getLeafs());
//       }
//       return temp;
//     }
//   }

//   getLevel(level: number, queue: Tree[]) {
//     if (queue === undefined) queue = [];
//     if (level == 1) {
//       queue.push(this);
//     } else {
//       if (this.lchild !== undefined) this.lchild.getLevel(level - 1, queue);
//       if (this.rchild !== undefined) this.rchild.getLevel(level - 1, queue);
//     }
//     return queue;
//   }
//   /**
//    *
//    * @param {Number} x
//    * @param {Number} y
//    * @returns {Array<Container>}
//    */
//   nodesOnPosition(x: number, y: number): Array<Container> {
//     let nodes: Array<Container> = [];
//     if (this.leaf!.contains(x, y)) {
//       nodes.push(this.leaf!);
//     }
//     if (this.lchild !== undefined) {
//       nodes.push(...this.lchild.nodesOnPosition(x, y));
//     }
//     if (this.rchild !== undefined) {
//       nodes.push(...this.rchild.nodesOnPosition(x, y));
//     }
//     return nodes;
//   }

//   /**
//    * draw to canvas
//    * @param {Tree} c
//    */
//   paint(c: DebugCanvas) {
//     this.leaf!.paint(c);
//     if (this.lchild !== undefined) this.lchild.paint(c);
//     if (this.rchild !== undefined) this.rchild.paint(c);
//   }

//   /**
//    * draw to canvas
//    * @param {Tree} c
//    */
//   paintConnections(c: DebugCanvas) {
//     this.leaf!.paintConnections(c);
//     if (this.lchild !== undefined) this.lchild.paintConnections(c);
//     if (this.rchild !== undefined) this.rchild.paintConnections(c);
//   }

//   draw_paths(ctx: DebugCanvas, tree: Tree) {
//     if (!tree) {
//       tree = this;
//     }
//     if (tree?.lchild == undefined || tree?.rchild == undefined) {
//       return;
//     }
//     tree.lchild.leaf!.drawPath(ctx, tree.rchild.leaf!);

//     this.draw_paths(ctx, tree.lchild);
//     this.draw_paths(ctx, tree.rchild);
//   }

//   /**
//    *  Write info about container to console
//    */
//   console() {
//     this.leaf!.console();
//     if (this.lchild !== undefined) this.lchild.console();
//     if (this.rchild !== undefined) this.rchild.console();
//   }
// }
