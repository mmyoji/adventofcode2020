package main

import (
	"fmt"
)

var rows = genRows()
var columns = genColumns()

// Day5 shows the answer.
func Day5() {
	lines, err := getLines("inputs/day5.txt")
	fatal(err)

	maxID := 0

	for _, l := range lines {
		id := getID(l)
		if maxID < id {
			maxID = id
		}
	}

	fmt.Printf("answer: %d\n", maxID)
	// 850
}

func genRows() []int {
	var tmpRows []int

	for i := 0; i < 128; i++ {
		tmpRows = append(tmpRows, i)
	}

	return tmpRows
}

func genColumns() []int {
	var tmpColumns []int

	for i := 0; i < 8; i++ {
		tmpColumns = append(tmpColumns, i)
	}

	return tmpColumns
}

func getID(line string) int {
	tmpRows := make([]int, len(rows))
	tmpColumns := make([]int, len(columns))
	var row int
	var column int

	copy(tmpRows, rows)
	copy(tmpColumns, columns)

	for i := 0; i < len(line); i++ {
		p := string(line[i])

		// F or B
		if i < 7 {
			if p == "F" {
				tmpRows = tmpRows[0:(len(tmpRows) / 2)]
			} else {
				tmpRows = tmpRows[(len(tmpRows) / 2):len(tmpRows)]
			}

			if len(tmpRows) == 1 {
				row = tmpRows[0]
			}
			continue
		}

		// L or R
		if p == "L" {
			tmpColumns = tmpColumns[0:(len(tmpColumns) / 2)]
		} else {
			tmpColumns = tmpColumns[(len(tmpColumns) / 2):len(tmpColumns)]
		}
		if len(tmpColumns) == 1 {
			column = tmpColumns[0]
			break
		}
	}

	return row*8 + column
}
