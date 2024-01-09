import {
  CorridorConnectionIterator,
  DungeonGenerator,
} from "dungeon-generator";

import {
  ContainerSplitGenerator,
  CorridorGenerator,
} from "dungeon-generator/generators";

import { rng, roundToClosest } from "dungeon-generator/utils";
import { DebugCanvas } from "../../dist/debugCanvas";

let generator = new DungeonGenerator(96, 96, true);

generator
  .addGenerator(new CorridorGenerator(9))
  //.addGenerator(new ContainerSplitGenerator())
  .addGenerator(new CorridorGenerator(6))
  .addGenerator(new CorridorGenerator(6))
  .addGenerator(new CorridorGenerator(3))
  .addGenerator(new CorridorGenerator(3))
  .addGenerator(new ContainerSplitGenerator())
  //.addGenerator(new CorridorGenerator(3))

  .addGenerator(new ContainerSplitGenerator())
  .addGenerator(new ContainerSplitGenerator())
  .addGenerator(new ContainerSplitGenerator())
  //.removeRooms()
  //.addNode(new CorridorConnectionIterator())
  //.addConnections(new roomsWithMissingConnectionsIterator())
  .generate();

const canvas = generator.debugVisual();
//console.log(generator.nodesOnPosition(30,53));
console.log(`Seed:${rng.getSeed()}`);

// let mapCanvas = document.createElement('canvas');
// mapCanvas.style.position = 'absolute';
// mapCanvas.style.top = '400px';
// mapCanvas.style.left = '0px';
// mapCanvas.style.zIndex = '100';
// mapCanvas.width = 90;
// mapCanvas.height = 90;

// // Temp during development
// mapCanvas.style.width = `${90 * 4}px`;
// mapCanvas.style.height = `${90 * 4}px`;
// mapCanvas.style.imageRendering = 'pixelated';

// document.body.appendChild(mapCanvas);
// // END

// let mapContext = mapCanvas.getContext('2d');
// mapContext.fillStyle = "rgba(0, 0, 0, 1)";
// mapContext.fillRect(0, 0, 90, 90);

//generator.debugConsole();

/** @type {Array<Container>} */
// let leafs = generator.mainContainer.getLeafs();

// for (let leaf of leafs) {
//   if (leaf.connections.length > 0) {
//     canvas.mapContext.fillStyle = `rgba(255, 0, 0, 1)`;
//     for (let connection of leaf.connections) {
//       switch (connection.orientation) {
//         case "N":
//         case "S":
//           canvas.mapContext.fillRect(
//             roundToClosest(Math.floor(connection.x), 3) + 1,
//             Math.floor(connection.y),
//             1,
//             1
//           );
//           break;
//         case "E":
//         case "W":
//           canvas.mapContext.fillRect(
//             Math.floor(connection.x),
//             roundToClosest(Math.floor(connection.y), 3) + 1,
//             1,
//             1
//           );
//           break;
//       }
//     }
//   }
// }
