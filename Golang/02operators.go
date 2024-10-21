package main

import "fmt"

// Functions

func describePerson(name string, age int, isEmployed bool) {
	fmt.Println("Name is %v, age is %v", name, age)
}

func getIncerementedAge(age int) (incrementedAge int) {
	incrementedAge = age + 1
	return
}

// Variadic Functions
func getAnyNumbers(nums ...int) {
	fmt.Println(nums)
}

func main() {
	var number int = 32
	var bigNumber int = 64
	if bigNumber > number {
		fmt.Println("64 is bigger")
	} else if number > bigNumber {
		fmt.Println("32 is bigger")
	}

	// Loops
	for i := 0; i < 5; i++ {
		fmt.Println("Loop executing")
	}

	var fruits = [5]string{"Apple", "Banana", "Pineapple"}
	for idx, fruit := range fruits {
		fmt.Println(idx, fruit)
	}

	// Functions

	describePerson("Sriram", 24, true)
	fmt.Println(getIncerementedAge(24))

	var numbers = []int{1, 3, 5}
	getAnyNumbers(numbers...)
}
