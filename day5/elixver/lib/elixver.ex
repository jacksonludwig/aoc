defmodule Point do
  defstruct x: -1, y: -1

  defp str_to_point(str) do
    [x, y] = String.split(str, ",")
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
end

defmodule Elixver do
  @spec read_input(filename :: String.t) :: [Line]
  def read_input(filename) when is_bitstring(filename) do
    File.read!(filename)
    |> String.split("\n", trim: true)
    |> Enum.map(&String.split(&1, " -> "))
    |> Enum.map(&Point.str_pair_to_point_list(&1))
    |> Enum.map(&Line.point_list_to_line(&1))
  end

  def get_high_counts(lines) when is_list(lines) do
    counts = %{}
  end

  def main() do
    lines = read_input("../resources/input.txt")
    dangerous_count = get_high_counts(lines)
  end
end
