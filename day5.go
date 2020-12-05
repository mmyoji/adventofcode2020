package main

import (
	"fmt"
	"strings"
)

var rows = genRows()
var columns = genColumns()

// Day5 shows the answer.
func Day5() {
	lines, err := getLines("inputs/day5.txt")
	fatal(err)

	maxID := 0

	for _, l := range lines {
		s := seat{raw: l}
		id := s.getID()
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

type seat struct {
	_rows    []int
	_columns []int
	raw      string
	row      int
	column   int
}

func (s seat) getID() int {
	ss := strings.Split(s.raw, "")

	s.row = s.getRow(ss[0:7])
	s.column = s.getColumn(ss[7:len(ss)])

	return s.row*8 + s.column
}

func (s seat) getRow(ps []string) int {
	s._rows = make([]int, len(rows))
	copy(s._rows, rows)

	for _, p := range ps {
		if p == "F" {
			s._rows = s._rows[0:(len(s._rows) / 2)]
		} else {
			s._rows = s._rows[(len(s._rows) / 2):len(s._rows)]
		}

		if len(s._rows) == 1 {
			break
		}
	}

	return s._rows[0]
}

func (s seat) getColumn(ps []string) int {
	s._columns = make([]int, len(columns))
	copy(s._columns, columns)

	for _, p := range ps {
		if p == "L" {
			s._columns = s._columns[0:(len(s._columns) / 2)]
		} else {
			s._columns = s._columns[(len(s._columns) / 2):len(s._columns)]
		}

		if len(s._columns) == 1 {
			break
		}
	}

	return s._columns[0]
}
