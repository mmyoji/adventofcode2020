package main

import (
	"fmt"
	"log"
	"strconv"
)

// Day1 shows the answer
func Day1() {
	var inputs []int
	lines, err := getLines("inputs/day1.txt")
	if err != nil {
		log.Fatal(err)
	}

	for _, l := range lines {
		i, err := strconv.Atoi(l)
		if err != nil {
			log.Fatalf("Failed to parse line: %s", err)
		}
		inputs = append(inputs, i)
	}

	var n int
	var m int

	for i := 0; i < len(inputs); i++ {
		n = inputs[i]
		for j := 0; j < len(inputs); j++ {
			m = inputs[j]
			if i == j {
				continue
			}
			if (n + m) == 2020 {
				fmt.Println(fmt.Sprintf("answer: %d\n", n*m))
				// 806656
				return
			}
		}
	}
}
