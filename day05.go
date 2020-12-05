package main

import (
	"fmt"
)

var rows = genNumSlice(128)
var columns = genNumSlice(8)

// Day5 shows the answer.
func Day5() {
	lines, err := getLines("inputs/day05.txt")
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

func genNumSlice(max int) []int {
	var tmp []int

	for i := 0; i < max; i++ {
		tmp = append(tmp, i)
	}

	return tmp
}

type seat struct {
	raw    string
	row    int
	column int
}

func (s seat) getID() int {
	s.row = s.binarySearch(s.raw[0:7], rows, 'F')
	s.column = s.binarySearch(s.raw[7:len(s.raw)], columns, 'L')

	return s.row*8 + s.column
}

func (s seat) binarySearch(target string, src []int, c rune) int {
	dest := make([]int, len(src))
	copy(dest, src)

	for _, p := range target {
		if p == c {
			dest = dest[0:(len(dest) / 2)]
		} else {
			dest = dest[(len(dest) / 2):len(dest)]
		}

		if len(dest) == 1 {
			break
		}
	}

	return dest[0]
}
