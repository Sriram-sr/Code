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
		float floatVar = 7.6f;
		boolean boolVar = false;
		char charVar = 'k';
		double doubVar = 9.766d;
		int doubToIntVar = (int) doubVar; // Type casting
		System.out.println(constant + " " + stringVar + " " + intVar + " " + floatVar + " " + boolVar + " " + charVar
				+ " " + doubToIntVar);

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
		moreNumbers[1] = 1000;
		for (int idx = 0; idx < moreNumbers.length; idx++) {
			System.out.println(moreNumbers[idx]);
		}
		System.out.println(numbers.length);
		System.out.println(numbers[2]);

		// Objects

		Calculator calc = new Calculator();
		int addOutput = calc.addition(4, 5);
		System.out.println(addOutput);
	}
}
