package main

import (
	"fmt"
	"strconv"
	"strings"

	"github.com/mmyoji/aoc-2020/utils"
)

func main() {
	lines, err := utils.GetLines("day08/inputs.txt")
	utils.Fatal(err)

	accumulator := 0
	currentIdx := 0
	memoIdx := make(map[int]bool)

	for {
		if _, ok := memoIdx[currentIdx]; ok {
			break
		}

		memoIdx[currentIdx] = true

		o := parseOperation(lines[currentIdx])
		accumulator, currentIdx = o.run(accumulator, currentIdx)
	}

	fmt.Printf("answer: %d\n", accumulator)
	// 2025
}

type operator struct {
	op string // "nop" | "acc" | "jmp"
	n  int
}

func (o operator) run(acc int, idx int) (int, int) {
	switch o.op {
	case "nop":
		return acc, idx + 1
	case "acc":
		return acc + o.n, idx + 1
	case "jmp":
		return acc, idx + o.n
	default:
		return acc, idx
	}
}

func parseOperation(line string) operator {
	opnum := strings.Split(line, " ")
	n, _ := strconv.Atoi(opnum[1])
	return operator{op: opnum[0], n: n}
}
