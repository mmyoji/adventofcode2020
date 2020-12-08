package main

import (
	"errors"
	"fmt"
	"strconv"

	"github.com/mmyoji/aoc-2020/utils"
)

func main() {
	lines, err := utils.GetLines("day01/inputs.txt")
	utils.Fatal(err)

	inputs, err := getInputs(lines)
	utils.Fatal(err)

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
