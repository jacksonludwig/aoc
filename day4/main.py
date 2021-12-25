from functools import reduce

BoardType = list[list[int]]


class Board:
    def __init__(self, board: BoardType):
        self.sets = get_winning_nums(board, 5)

    def do_move(self, move: int):
        """Take move and return true if bingo is achieved"""
        for i in range(0, len(self.sets)):
            try:
                self.sets[i].remove(move)
            except:
                pass
            if len(self.sets[i]) == 0:
                return True
        return False

    def sum_remaining(self) -> int:
        flat_list = [num for row in self.sets for num in row]
        return reduce(lambda acc, cur: acc + cur, set(flat_list), 0)

    def __str__(self):
        res = ""
        for s in self.sets:
            for num in s:
                res += " " + str(num)
            res += "\n"
        return res


def chunk(lines: list[str], chunk_size: int):
    for i in range(0, len(lines), chunk_size + 1):
        yield [
            " ".join(line.strip().split())
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


def find_final_number_and_board(winning_nums: list[int], boards: list[Board]):
    for num in winning_nums:
        for board in boards:
            if board.do_move(num):
                return num, board
    raise Exception("no winner")


drawn_nums, boards = read_input("resources/input.txt", 5)

final_num, board = find_final_number_and_board(drawn_nums, boards)

print(final_num)
print(board)
print(board.sum_remaining() * final_num)
