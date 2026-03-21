import { lines } from "../utils/strings.ts";
import { advent } from "../utils/utils.ts";
import * as Vector from "../utils/vector.ts";

const GUARD = "^";
const OBSTACLE = "#";

function getInitialGuardVec(graph: string[]): Vector.Vec2 {
  const i = graph.findIndex((row) => row.includes(GUARD));
  const j = graph[i].indexOf(GUARD);

  return Vector.create(j, i);
}

function travel(graph: string[], initialGuardPos: Vector.Vec2): Vector.VectorSet {
  let vel = Vector.up();
  let pos = initialGuardPos;

  const travel = new Vector.VectorSet([pos]);

  while (true) {
    const front = Vector.sum(pos, vel);

    const frontTile = graph[front.i]?.[front.j];
    if (!frontTile) break;

    if (frontTile === OBSTACLE) {
      vel = Vector.round(Vector.rotate(vel, Math.PI / 2));
    } else {
      pos = front;
      travel.add(pos);
    }
  }

  return travel;
}

advent({
  day: 6,

  parse(raw) {
    return lines(raw);
  },

  one(graph) {
    return travel(graph, getInitialGuardVec(graph)).size;
  },

  // takes like 10s, needs improvement. ideas:
  // - start checking for loops on obstacle position, instead
  // of running the entire travel from scratch on every possible location
  //
  // - think of a fancy spatial way to recognize loops, instead of
  // travelling. some kind of box calculation?
  two(graph) {
    let count = 0;
    const initialGuardVec = getInitialGuardVec(graph);
    const originalTravel = travel(graph, initialGuardVec);

    for (const { i, j } of Vector.setToArray(originalTravel)) {
      const newObstacle = Vector.create(j, i);

      let looped = false;
      let vel = Vector.up();
      let pos = initialGuardVec;
      const travel = new Set([`${Vector.stringify(pos)}-${Vector.stringify(vel)}`]);

      while (true) {
        const front = Vector.sum(pos, vel);

        const frontTile = graph[front.i]?.[front.j];
        if (!frontTile) break;

        if (frontTile === OBSTACLE || Vector.equals(front, newObstacle)) {
          vel = Vector.round(Vector.rotate(vel, Math.PI / 2));
        } else {
          pos = front;
          const vectors = `${Vector.stringify(pos)}-${Vector.stringify(vel)}`;

          // if it goes through the same tile same direction, its in a loop
          if (travel.has(vectors)) {
            looped = true;
            break;
          }
          travel.add(vectors);
        }
      }

      if (looped) count++;
    }
    return count;
  },
});
