package main

import (
	"fmt"

	"github.com/mmyoji/aoc-2020/utils"
)

const treeMark = "#"

func main() {
	lines, err := utils.GetLines("day03/inputs.txt")
	utils.Fatal(err)

	treesCount := 0
	hPos := 0

	for vPos := 1; vPos < len(lines); vPos++ {
		currentLine := lines[vPos]
		if (len(currentLine)-(hPos+3))-1 < 0 {
			hPos = -1 * (len(currentLine) - (hPos + 3))
		} else {
			hPos += 3
		}

		if string(currentLine[hPos]) == treeMark {
			treesCount++
		}
	}

	fmt.Printf("answer: %d\n", treesCount)
	// 145
}
