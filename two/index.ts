import { readFileSync } from "fs";

type Direction = "forward" | "up" | "down";

class Location {
  public distance: number;
  public depth: number;

  constructor(distance: number, depth: number) {
    this.distance = distance;
    this.depth = depth;
  }
}

class Move {
  public direction: Direction;
  public distance: number;

  constructor(direction: Direction, distance: number) {
    this.direction = direction;
    this.distance = distance;
  }
}

const { distance, depth } = readFileSync("./resources/input.txt", "utf-8")
  .split("\n")
  .filter((l) => l !== "")
  .map((m) => {
    const [dir, dist] = m.split(" ", 2);
    return new Move(dir as Direction, Number(dist));
  })
  .reduce((loc, move) => {
    switch (move.direction) {
      case "forward":
        loc.distance += move.distance;
        break;
      case "up":
        loc.depth -= move.distance;
        break;
      case "down":
        loc.depth += move.distance;
        break;
      default:
        throw Error("unknown direction");
    }
    return loc;
  }, new Location(0, 0));

console.log(`distance: ${distance}, depth: ${depth}, answer: ${distance * depth}`);
