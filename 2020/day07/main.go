package main

import (
	"fmt"
	"strings"

	"github.com/mmyoji/aoc/2020/utils"
)

const colorShinyGold = "shiny gold"

func main() {
	lines, err := utils.GetLines("day07/inputs.txt")
	utils.Fatal(err)

	colorMappings := make(map[string][]string)

	for _, line := range lines {
		tmp := strings.Split(line, " bags contain ")
		outerColor := tmp[0]
		innerColors := parseInnerColors(tmp[1])
		if outerColor != colorShinyGold {
			colorMappings[outerColor] = innerColors
		}
	}

	nextColors := []string{colorShinyGold}
	var tmpColors []string
	usedColors := make(map[string]int)

	for len(nextColors) > 0 {
		for oc, ics := range colorMappings {
			icsLine := strings.Join(ics, "/")
			for _, color := range nextColors {
				if strings.Contains(icsLine, color) {
					_, ok := usedColors[oc]
					if ok {
						continue
					}

					usedColors[oc] = 0
					delete(colorMappings, oc)
					tmpColors = append(tmpColors, oc)
				}
			}
		}

		nextColors = make([]string, len(tmpColors))
		copy(nextColors, tmpColors)
		tmpColors = []string{}
	}

	fmt.Printf("answer: %d\n", len(usedColors))
	// 192
}

func parseInnerColors(str string) []string {
	var colors []string

	if str == "no other bags." {
		return colors
	}

	tmpColors := strings.Split(str, ", ")
	for _, tmpColor := range tmpColors {
		tmp := strings.Split(tmpColor, " ")
		colors = append(colors, tmp[1]+" "+tmp[2])
	}

	return colors
}
