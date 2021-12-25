BoardType = list[list[int]]


class Board:
    def __init__(self, board: BoardType):
        self.sets = get_winning_nums(board, 5)

    def __str__(self):
        res = ""
        for s in self.sets:
            res += str(s)
            res += "\n"
        return res


def chunk(lines: list[str], chunk_size: int):
    for i in range(0, len(lines), chunk_size + 1):
        yield [
            line.strip().replace("  ", " ")
            for line in lines[i : i + chunk_size + 1]
            if line != "\n"
        ]


def read_input(file: str, board_size: int) -> tuple[list[int], list[Board]]:
    with open(file) as input:
        lines = iter(input.readlines())

        drawn_nums = [int(n) for n in next(lines).split(",")]

        boards: list[Board] = []

        for rows in chunk(list(lines), board_size):
            board = [[int(n) for n in row.split(" ")] for row in rows]
            boards.append(Board(board))

        return drawn_nums, boards


def get_winning_nums(board: BoardType, chunk_size: int) -> list[set[int]]:
    """Get a list of the sets of the winning nums of the given board"""
    winning_nums: list[set[int]] = []

    for col in range(0, chunk_size):
        winning_set: set[int] = set()
        for row in range(0, chunk_size):
            winning_set.add(board[row][col])
        winning_nums.append(winning_set)

    for row in board:
        winning_nums.append(set(row))

    return winning_nums


drawn_nums, boards = read_input("resources/input.txt", 5)

print(boards[0])
