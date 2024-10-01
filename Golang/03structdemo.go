package main

import "fmt"

func main() {
	type Profile struct {
		userName string
		age      int
		isActive bool
	}

	var user Profile
	user.age = 24
	user.isActive = false
	user.userName = "Sriram"

	fmt.Printf("User name is %v\n", user.userName)

	// Maps
	var ipMask = map[string]int{"110.24.12.10": 1, "255.67.12.9": 4}
	ip, isPresent := ipMask["255.67.12.9"]
	fmt.Println(ip, isPresent)
	fmt.Println(ipMask)

	// Make Map

	var emptyMap = make(map[string]int)
	emptyMap["A"] = 5
	emptyMap["C"] = 10
	fmt.Println(emptyMap)
}
