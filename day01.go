package main

import (
	"errors"
	"fmt"
	"strconv"
)

// Day1 shows the answer
func Day1() {
	lines, err := getLines("inputs/day01.txt")
	fatal(err)

	inputs, err := getInputs(lines)
	fatal(err)

	for i, n := range inputs {
		m, err := find(inputs[i+1:], func(j int) bool {
			return (n + j) == 2020
		})

		if err != nil {
			continue
		}

		fmt.Println(fmt.Sprintf("answer: %d\n", n*m))
		// 806656
	}
}

func getInputs(lines []string) ([]int, error) {
	var inputs []int
	for _, l := range lines {
		i, err := strconv.Atoi(l)
		if err != nil {
			return inputs, fmt.Errorf("Failed to parse line: %s", err)
		}
		inputs = append(inputs, i)
	}

	return inputs, nil
}

func find(items []int, fn func(int) bool) (int, error) {
	for _, i := range items {
		if fn(i) {
			return i, nil
		}
	}

	return 0, errors.New("Not found")
}
