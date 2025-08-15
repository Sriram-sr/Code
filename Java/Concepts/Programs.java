import java.util.Scanner;
import java.util.Arrays;

public class Programs {
    public static void main(String args[]) {
        // Odd or Even

        int number = 12;
        if (number % 2 == 0) {
            System.out.println("Number is even");
        } else {
            System.out.println("Number is odd");
        }

        // Find square of number

        System.out.println(Math.pow(number, 2));

        // Find last digit of a number

        System.out.println(number % 10);

        // Reverse a number

        int reversed = 0;
        int remainder = 0;
        while (number >= 1) {
            remainder = number % 10;
            reversed = (reversed * 10) + remainder;
            number /= 10;
        }
        System.out.println(reversed);

        // Greatest of three numbers

        Scanner scanner = new Scanner(System.in);
        int num1 = scanner.nextInt();
        int num2 = scanner.nextInt();
        int num3 = scanner.nextInt();

        if (num1 > num2 && num1 > num3) {
            System.out.println("Num 1 is the greatest");
        } else if (num2 > num1 && num2 > num3) {
            System.out.println("Num 2 is the greatest");
        } else if (num3 > num1 && num3 > num2) {
            System.out.println("Num 3 is the greatest");
        } else {
            System.out.println("No number is the greatest");
        }

        // Sum of elements

        int size = scanner.nextInt();
        int[] elements = new int[size];
        int sum = 0;

        for (int idx = 0; idx < size; idx++) {
            elements[idx] = scanner.nextInt();
            sum += elements[idx];
        }

        System.out.println(Arrays.toString(elements));
        System.out.println("Sum: " + sum);

        scanner.close();
    }
}