package utils

import (
	"bufio"
	"fmt"
	"log"
	"os"
)

// GetLines returns an array of string from the pathname.
func GetLines(pathname string) ([]string, error) {
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

// Fatal just raises a panic.
func Fatal(err error) {
	if err != nil {
		log.Fatal(err)
	}
}
