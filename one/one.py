# challenge 1
def count_increases(data: list[int]) -> int:
    count = 0
    for prev, curr in zip(data, data[1:]):
        if prev < curr:
            count += 1
    return count


# challenge 2
def count_increases_sliding_window(data: list[int]) -> int:
    tuples = zip(data, data[1:], data[2:], data[3:])

    return len(list(filter(lambda win: win[0] < win[3], tuples)))


with open("input.txt") as input:
    data = [int(i) for i in input.readlines()]

    print(count_increases(data))
    print(count_increases_sliding_window(data))
