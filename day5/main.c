#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Position {
  int x;
  int y;
} Position;

typedef struct Line {
  Position start;
  Position end;
} Line;

Line parse_single_line(char *line) {
  // Form of int,int -> int,int
  const char half_split[] = " -> ";
  const char *xy_split = ",";

  // Parse left side
  char *left = strtok(line, half_split);

  // Parse right side
  char *right = strtok(NULL, half_split);

  Position start_pos = { atoi(strtok(left, xy_split)),  atoi(strtok(NULL, xy_split)) };
  Position end_pos = { atoi(strtok(right, xy_split)),  atoi(strtok(NULL, xy_split)) };

  Line parsed_line = { start_pos, end_pos };

  return parsed_line;
}

void print_line(Line *line) {
  printf("Start: %d, %d\n", line->start.x, line->start.y);
  printf("End: %d, %d\n", line->end.x, line->end.y);
}

int main() {
  char example_line[] = "516,589 -> 970,823";

  Line line = parse_single_line(example_line);
  print_line(&line);

  return 0;
}
