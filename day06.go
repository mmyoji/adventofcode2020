package main

import "fmt"

// Day6 shows the answer.
func Day6() {
	lines, err := getLines("inputs/day06.txt")
	fatal(err)

	answers := make(map[rune]bool)
	count := 0

	for _, line := range lines {
		if line == "" {
			count += len(answers)
			answers = make(map[rune]bool)
			continue
		}

		for _, c := range line {
			answers[c] = true
		}
	}

	// Add the last group
	count += len(answers)

	fmt.Printf("answer: %d\n", count)
	// 6633
}
