Board = list[list[int]]


def chunk(lines: list[str], chunk_size: int):
    for i in range(0, len(lines), chunk_size):
        yield [
            line.strip().replace("  ", " ")
            for line in lines[i : i + chunk_size]
            if line != "\n"
        ]


def read_input(file: str, board_size: int) -> tuple[list[int], list[Board]]:
    with open(file) as input:
        lines = iter(input.readlines())

        winning_nums = [int(n) for n in next(lines).split(",")]

        boards: list[Board] = []

        for rows in chunk(list(lines), board_size):
            board = [[int(n) for n in row.split(" ")] for row in rows]
            boards.append(board)

        return winning_nums, boards


winning_nums, boards = read_input("resources/input.txt", 5)
