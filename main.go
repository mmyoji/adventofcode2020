package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

func main() {
	Day6()
}

func getLines(pathname string) ([]string, error) {
	var lines = []string{}

	file, err := os.Open(pathname)
	if err != nil {
		return lines, fmt.Errorf("Failed to open file: %s", err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	scanner.Split(bufio.ScanLines)

	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	return lines, nil
}

func fatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
