import { readFileSync } from "fs";

const partOne = () => {
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
  const epsilon = gamma ^ (Math.pow(2, digits) - 1); // XOR with 111111... (len of digits)

  console.log(`Gamma: ${gamma}`);
  console.log(`Epsilon: ${epsilon}`);
  console.log(`Answer: ${gamma * epsilon}`);
};

// partOne();

const partTwo = (readingType: "oxy" | "co2") => {
  let binaryNumsMatrix = readFileSync("./resources/input.txt", "utf-8")
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split("").map((n) => parseInt(n, 2)));

  const digits = binaryNumsMatrix[0].length;

  for (let i = 0; i < digits; i++) {
    const colOfDigits = binaryNumsMatrix.map((nums) => nums[i]);
    const halfOfColLen = Math.floor((colOfDigits.length + 1) / 2);
    const colSum = colOfDigits.reduce((prev, curr) => prev + curr, 0);

    const highestFrequency = colSum < halfOfColLen ? 0 : 1;

    binaryNumsMatrix = binaryNumsMatrix.filter((num) =>
      readingType === "oxy" ? num[i] === highestFrequency : num[i] !== highestFrequency,
    );

    if (binaryNumsMatrix.length === 1) break;
  }

  return parseInt(binaryNumsMatrix[0].join(""), 2);
};

const oxyReading = partTwo("oxy");
const co2Reading = partTwo("co2");

console.log(oxyReading * co2Reading);
