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
	}
}
