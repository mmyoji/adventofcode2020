package main

import (
	"fmt"

	"github.com/mmyoji/aoc/2020/utils"
)

func main() {
	lines, err := utils.GetLines("day06/inputs.txt")
	utils.Fatal(err)

	g := &groups{count: 0}
	g.setItems(lines)
	g.countTotalAnswers()

	fmt.Printf("answer: %d\n", g.count)
	// 6633
}

// groups is just a namaspace
type groups struct {
	items map[int]string
	count int
}

func (g *groups) setItems(lines []string) {
	g.items = make(map[int]string)
	groupIdx := 0
	for _, line := range lines {
		if line == "" {
			groupIdx++
			continue
		}

		_, ok := g.items[groupIdx]
		if !ok {
			g.items[groupIdx] = line
		} else {
			g.items[groupIdx] += line
		}
	}
}

func (g *groups) countTotalAnswers() {
	for _, line := range g.items {
		g.count += g.countAnswers(line)
	}
}

func (g *groups) countAnswers(line string) int {
	answers := make(map[rune]bool)

	for _, c := range line {
		answers[c] = true
	}

	return len(answers)
}
