#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Position {
  unsigned int x;
  unsigned int y;
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

char** read_input(char *filename, unsigned int *line_amount) {
  FILE *fp = fopen(filename, "r");
  char *line = NULL;
  size_t line_len = 0;
  ssize_t read;

  size_t row_size = 1000;
  size_t col_size = 1000;

  // Allocate space on heap for array of strings using sizes above
  char **lines = malloc(row_size * sizeof(char*));
  for (int i = 0; i < row_size; i++)
    lines[i] = malloc((col_size + 1) * sizeof(char));

  if (fp == NULL) exit(EXIT_FAILURE);

  unsigned int index = 0;
  while ((read = getline(&line, &line_len, fp)) != -1) {
    strcpy(lines[index], line);
    index++;
  }

  fclose(fp);
  if (line) free(line);

  *line_amount = index;
  return lines;
}

void process_lines(char **lines, unsigned int amount_of_lines) {
  for(int i = 0; i < amount_of_lines; i++) {
    Line line = parse_single_line(lines[i]) ;
    print_line(&line);
  }
}

int main() {
  char example_line[] = "516,589 -> 970,823";

  unsigned int amount_of_lines = 0;
  char **lines = read_input("resources/input.txt", &amount_of_lines);

  process_lines(lines, amount_of_lines);

  for(int i = 0; i < amount_of_lines; i++) {
    free(lines[i]);
  }

  free(lines);

  return 0;
}
