import { readFileSync } from "fs";

type Board = number[][];

type BingoData = {
  boards: Board[];
  drawnNumbers: number[];
};

const BOARD_SIZE = 5;

const readInput = (file: string): BingoData => {
  let data = readFileSync(file, "utf-8")
    .split("\n")
    .filter((l) => l !== "");

  const drawnNumbers = data[0].split(",").map((n) => parseInt(n));

  const boards: Board[] = [];

  data = data.slice(1);

  for (let i = 0; i < data.length; i += BOARD_SIZE) {
    const boardChunk = data.slice(i, i + BOARD_SIZE);
    const board: number[][] = [];

    boardChunk.forEach((line) =>
      board.push(
        line
          .trim()
          .split(" ")
          .filter((c) => c !== "")
          .map((n) => parseInt(n)),
      ),
    );

    boards.push(board);
  }

  return { boards: boards, drawnNumbers: drawnNumbers };
};

const { boards, drawnNumbers } = readInput("./resources/input.txt");

console.log(boards);
console.log(drawnNumbers);
