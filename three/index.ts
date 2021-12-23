import { readFileSync } from "fs";

const binaryNumsMatrix = readFileSync("./resources/input.txt", "utf-8")
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => l.split("").map((n) => parseInt(n, 2)));

const digits = binaryNumsMatrix[0].length;

const gammaRate: number[] = [];

for (let i = 0; i < digits; i++) {
  let ones = 0;
  let zeros = 0;

  for (const binaryNum of binaryNumsMatrix) {
    binaryNum[i] === 0 ? zeros++ : ones++;
  }

  gammaRate.push(ones > zeros ? 1 : 0);
}

const gamma = parseInt(gammaRate.join(""), 2);
const epsilon = gamma ^ (Math.pow(2, digits) - 1);

console.log(`Gamma: ${gamma}`);
console.log(`Epsilon: ${epsilon}`); // invert bits to get epsilon
console.log(`Answer: ${gamma * epsilon}`);
