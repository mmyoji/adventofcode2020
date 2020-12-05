package main

import (
	"fmt"
	"log"
	"strconv"
	"strings"
)

type checker struct {
	min      int
	max      int
	keyword  string
	password string
}

func buildChecker(line string) checker {
	var min, max int
	var keyword, password string

	// e.g., 17-19 p: pwpzpfbrcpppjppbmppp
	splits := strings.Split(line, " ")
	if len(splits) != 3 {
		log.Fatalf("Invalid line: %d items", len(splits))
	}

	minMax := strings.Split(splits[0], "-")
	min, _ = strconv.Atoi(minMax[0])
	max, _ = strconv.Atoi(minMax[1])

	keyword = strings.Split(splits[1], ":")[0]
	password = splits[2]

	return checker{
		min:      min,
		max:      max,
		keyword:  keyword,
		password: password,
	}
}

func (c checker) isValid() bool {
	count := strings.Count(c.password, c.keyword)
	if count < c.min {
		return false
	}

	if count > c.max {
		return false
	}

	return true
}

// Day2 shows the answer.
func Day2() {
	fmt.Println("Day2:")

	lines, err := getLines("day2.input.txt")
	if err != nil {
		log.Fatal(err)
	}

	var numOfValid = 0

	for _, l := range lines {
		c := buildChecker(l)
		if c.isValid() {
			numOfValid++
		}
	}

	fmt.Printf("answer: %d\n", numOfValid)
}
