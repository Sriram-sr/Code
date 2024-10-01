package main

import (
	"fmt"
)

func main() {
	// Variable Declaration
	var firstName string = "Sriram"
	var age int
	var isActive bool
	isEmployed := true
	const database string = "MySql"

	age = 24
	fmt.Println(firstName)
	fmt.Println(age)
	fmt.Println(isEmployed)
	fmt.Println(isActive)
	fmt.Println(database)
	fmt.Printf("First name is %v\n", firstName)
	fmt.Printf("Type of First name is %T\n", firstName)

	// Arrays
	var numbers = [13]int{1, 5, 9}
	var digits = [...]int{1, 9, 10, 11, 15}
	fmt.Println(len(numbers))
	fmt.Println(digits)
	newSlice := numbers[1:5]
	fmt.Println(newSlice)
	newSlice = append(newSlice, 2, 9)
	fmt.Println(newSlice)
	anotherSlice := []int{100, 101}
	copy(newSlice, anotherSlice)
	fmt.Println(newSlice)
}
