import java.util.Scanner;
import java.util.Arrays;

class Solutions {
    private Scanner scanner;

    public Solutions() {
        this.scanner = new Scanner(System.in);
    }

    // Odd or Even

    public void findOddOrEven(int num) {
        if (num % 2 == 0) {
            System.out.println("Number is even");
        } else {
            System.out.println("Number is odd");
        }
    }

    // Reverse a number

    public int reverseNumber(int num) {
        int reversed = 0;
        int remainder = 0;
        while (num >= 1) {
            remainder = num % 10;
            reversed = (reversed * 10) + remainder;
            num /= 10;
        }

        return reversed;
    }

    // Greatest of three numbers

    public void findGreatestNumber() {
        int num1 = this.scanner.nextInt();
        int num2 = this.scanner.nextInt();
        int num3 = this.scanner.nextInt();

        if (num1 > num2 && num1 > num3) {
            System.out.println("Num 1 is the greatest");
        } else if (num2 > num1 && num2 > num3) {
            System.out.println("Num 2 is the greatest");
        } else if (num3 > num1 && num3 > num2) {
            System.out.println("Num 3 is the greatest");
        } else {
            System.out.println("No number is the greatest");
        }
        this.scanner.close();
    }

    // Sum of elements in a array

    public int findSumOfArrayElements() {
        int size = this.scanner.nextInt();
        int[] elements = new int[size];
        int sum = 0;

        for (int idx = 0; idx < size; idx++) {
            elements[idx] = this.scanner.nextInt();
            sum += elements[idx];
        }

        System.out.println(Arrays.toString(elements));
        this.scanner.close();

        return sum;
    }

    // Program to take take integers till you get 10 and print them in the end

    public void takeInputAndDisplay() {
        String allIntegers = "";

        int inputNumber = 0;
        while (inputNumber != 10) {
            inputNumber = this.scanner.nextInt();
            allIntegers += inputNumber + " ";
        }
        System.out.println(allIntegers);
        this.scanner.close();
    }

    // Program to find the sum of digits

    public int sumOfDigits(int num) {
        int rem, digitsSum = 0;

        while (num >= 1) {
            rem = num % 10;
            digitsSum += rem;
            num /= 10;
        }

        return digitsSum;
    }

    // Program to check whether a given number is Armstrong or not

    public boolean isAmstrongNumber(int num) {
        int length = String.valueOf(num).length();
        int armstrongValue = 0;
        int originalValue = num;
        int remainder;
        while (num > 0) {
            remainder = num % 10;
            armstrongValue += Math.pow(remainder, length);
            num /= 10;
        }
        if (armstrongValue == originalValue) {
            return true;
        }

        return false;
    }

    // Given a positive integer n, count the number of digits in n that divide n
    // evenly

    public int evenlyDivides(int n) {
        int originalValue = n;
        int count = 0;
        int rem;

        while (n > 0) {
            rem = n % 10;
            n /= 10;
            if (rem == 0) {
                continue;
            }
            if (originalValue % rem == 0) {
                count += 1;
            }
        }

        return count;
    }

    // Print pairs sum from Array

    public void printPairSum(int[] list) {
        for (int i = 0; i < list.length; i++) {
            for (int j = i + 1; j < list.length; j++) {
                System.out.println("(" + list[i] + "+" + list[j] + ")" + "=" + (list[i] + list[j]));
            }
        }
    }
}

public class Programs {
    public static void main(String args[]) {
        Solutions solutions = new Solutions();
        // solutions.findOddOrEven(19);
        // System.out.println(solutions.reverseNumber(271));
        // solutions.findGreatestNumber();
        // System.out.println(solutions.findSumOfArrayElements());
        // solutions.takeInputAndDisplay();
        // System.out.println(solutions.sumOfDigits(271));
        // System.out.println(solutions.isAmstrongNumber(1634));
        // System.out.println(solutions.evenlyDivides(8604020));
        solutions.printPairSum(new int[] { 2, 9, 4, -1, 8, 5 });
    }
}