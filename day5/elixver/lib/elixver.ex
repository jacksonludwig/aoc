defmodule Point do
  defstruct x: -1, y: -1

  defp str_to_point(str) do
    [x, y] = String.split(str, ",")
    %Point{x: x, y: y}
  end

  def int_pair_to_point(int_pair) do
    [x, y] = int_pair
    %Point{x: x, y: y}
  end

  def str_pair_to_point_list(str_pair) when is_list(str_pair) do
    Enum.map(str_pair, &str_to_point(&1))
  end
end

defmodule Line do
  defstruct starting: %Point{}, ending: %Point{}

  def point_list_to_line(list) do
    [starting, ending] = list

    %Line{starting: starting, ending: ending}
  end

  # defp steps(starting, ending) when is_integer(starting) and is_integer(ending) do
  #     starting..ending
  # end

  @spec between(starting :: Point, ending :: Point, allowDiagonals :: boolean) :: [Point]
  def between(starting, ending, allowDiagonals) when is_boolean(allowDiagonals) do
    if starting.x != ending.x and starting.y != ending.y do
      if !allowDiagonals do
        []
      else
        starting.x..ending.x
        |> Enum.zip(starting.y..ending.y)
        |> Enum.map(&Point.int_pair_to_point(&1))
      end
    else
      starting.x..ending.x
      |> Enum.flat_map(fn x ->
        starting.y..ending.y |> Enum.map(fn y -> Point.int_pair_to_point([x, y]) end)
      end)
    end
  end
end

defmodule Elixver do
  @spec read_input(filename :: String.t()) :: [Line]
  def read_input(filename) when is_bitstring(filename) do
    File.read!(filename)
    |> String.split("\n", trim: true)
    |> Enum.map(&String.split(&1, " -> "))
    |> Enum.map(&Point.str_pair_to_point_list(&1))
    |> Enum.map(&Line.point_list_to_line(&1))
  end

  def get_high_counts(lines) when is_list(lines) do
    counts = %{}

    lines
    |> Enum.each(fn line ->
      Line.between(line.starting, line.ending, false)
      |> Enum.each(fn pos -> ^counts = Map.put(counts, pos, (Map.get(counts, pos) || 0) + 1) end)
    end)

    Enum.reduce(counts, 0, fn {_k, count}, acc -> acc + if count > 1, do: 1, else: 0 end)
  end

  def main() do
    dangerous_count = read_input("../resources/input.txt") |> get_high_counts()
    IO.puts(dangerous_count)
  end
end
