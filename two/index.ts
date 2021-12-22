import { readFileSync } from "fs";

type Direction = "forward" | "up" | "down";

class Location {
  public distance: number;
  public depth: number;
  public aim: number;

  constructor(distance = 0, depth = 0, aim = 0) {
    this.distance = distance;
    this.depth = depth;
    this.aim = aim;
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
        loc.depth += loc.aim * move.distance;
        break;
      case "up":
        loc.aim -= move.distance;
        break;
      case "down":
        loc.aim += move.distance;
        break;
      default:
        throw Error("unknown direction");
    }
    return loc;
  }, new Location());

console.log(`distance: ${distance}, depth: ${depth}, answer: ${distance * depth}`);
