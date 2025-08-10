import java.util.Arrays;
import java.util.Scanner;

class Calculator {
	public int addition(int num1, int num2) {
		return num1 + num2;
	}
}

public class Hello {
	public static void main(String[] args) {
		System.out.println("Hello World");

		// Variables

		final String constant = "Constant variable";
		String stringVar = "String data type";
		int intVar = 8;
		byte byteVar = 125;
		short shortVar = 998;
		long longVar = 8428259394L;
		float floatVar = 7.6f;
		boolean boolVar = false;
		char charVar = 'k';
		double doubVar = 9.766d;
		int doubToIntVar = (int) doubVar; // Type casting
		System.out.println(constant + " " + stringVar + " " + intVar + " " + floatVar + " " + boolVar + " " + charVar
				+ " " + doubToIntVar + " " + byteVar + " " + shortVar + " " + longVar);
		StringBuffer newStr = new StringBuffer("Progress");
		newStr.append(" is the key!");
		System.out.println(newStr);
		System.out.println(stringVar.charAt(2));

		// Ternary operator
		int marks = 75;
		char grade = (marks >= 90) ? 'O' : (marks >= 80) ? 'A' : (marks >= 70) ? 'B' : (marks >= 60) ? 'C' : 'D';
		System.out.println("Grade: " + grade);

		// While... Do while loop
		int count = 2;
		while (count <= 1) {
			System.out.println("While loop is running");
			count += 1;
		}

		do {
			System.out.println("Do while loop is running");
			count += 1;
		} while (count <= 1);

		// Switch statement

		int weekDay = 1;
		switch (weekDay) {
			case 1:
				System.out.println("Monday");
				break;
			case 2:
				System.out.println("Tuesday");
				break;
			case 3:
				System.out.println("Wednesday");
				break;
			default:
				System.out.println("Enter a valid day!");
				break;
		}

		// Arrays

		int[] numbers = { 1, 2, 3, 4, 5 };
		int[] moreNumbers = new int[3];
		boolean[] userChoices = new boolean[4];
		System.out.println("Boolean Array!");
		System.out.println(Arrays.toString(userChoices));
		moreNumbers[1] = 1000;
		for (int idx = 0; idx < moreNumbers.length; idx++) {
			System.out.println(moreNumbers[idx]);
		}
		System.out.println(numbers.length);
		for (int num : numbers) {
			System.out.println(num);
		}

		// Objects

		Calculator calc = new Calculator();
		int addOutput = calc.addition(4, 5);
		System.out.println(addOutput);

		// User Input
		Scanner scanner = new Scanner(System.in);
		System.out.println("Enter your name: ");
		String username = scanner.nextLine();
		System.out.println(username);
		scanner.close();
	}
}
