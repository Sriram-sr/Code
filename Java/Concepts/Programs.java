import java.util.Scanner;
import java.util.Arrays;
import java.util.ArrayList;

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

    // Power Of Numbers

    public int powerOfNumbers(int n) {
        int originalNum = n;
        int rem, power = 0;

        while (n > 0) {
            rem = n % 10;
            power = power * 10 + rem;
            n /= 10;
        }

        return (int) Math.pow(originalNum, power);
    }

    // Min and Max in Array

    public ArrayList<Integer> getMinMaxOfArray(int[] arr) {
        ArrayList<Integer> finalList = new ArrayList<>();
        finalList.add(arr[0]);
        finalList.add(arr[0]);

        for (int ele : arr) {
            if (ele < finalList.get(0)) {
                finalList.set(0, ele);
            } else if (ele > finalList.get(1)) {
                finalList.set(1, ele);
            }
        }

        return finalList;
    }

    // Longest Common Prefix

    public String longestCommonPrefix(String[] str) {
        /**
         * String sample = str[0], temp;
         * String prefix = "";
         * for (int wordIdx = 1; wordIdx < str.length; wordIdx++) {
         * temp = "";
         * for (int charIdx = 0; charIdx < Math.min(sample.length(),
         * str[wordIdx].length()); charIdx++) {
         * if (str[wordIdx].charAt(charIdx) == sample.charAt(charIdx)) {
         * temp += sample.charAt(charIdx);
         * } else {
         * break;
         * }
         * }
         * if (temp == "") {
         * prefix = "";
         * break;
         * }
         * if (prefix.length() == 0 || temp.length() < prefix.length()) {
         * prefix = temp;
         * }
         * }
         * 
         * return prefix;
         */

        // Optimal

        Arrays.sort(str);
        String first = str[0];
        String last = str[str.length - 1];

        String prefix = "";
        for (int idx = 0; idx < Math.min(first.length(), last.length()); idx++) {
            if (first.charAt(idx) != last.charAt(idx)) {
                break;
            } else {
                prefix += first.charAt(idx);
            }
        }

        return prefix;
    }

    public boolean isLeapYear(int year) {
        if (year % 400 == 0)
            return true;
        else if (year % 4 == 0 && year % 100 != 100)
            return true;
        else
            return false;
    }

    public void leapYearInRange(int start, int end) {
        for (int year = start; year <= end; year++) {
            if (isLeapYear(year))
                System.out.println(year);
        }
    }

    // Max handshakes in a room
    public int maxHandshakes(int n) {
        return n * (n - 1) / 2;
    }
}

public class Programs {
    public static void main(String args[]) {
        Solutions solutions = new Solutions();
        System.out.println(solutions.maxHandshakes(5);
    }
}