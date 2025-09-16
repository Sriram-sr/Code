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

    // Palindrome Number

    public boolean isPalindrome(int n) {
        int original = n;
        int reversed = 0;
        int remainder = 0;
        while (n >= 1) {
            remainder = n % 10;
            reversed = (reversed * 10) + remainder;
            n /= 10;
        }

        if (original == reversed) {
            return true;
        }

        return false;
    }

    // Return the Largest Digit in a Number

    public int getLargest(int n) {
        int largest = 0, rem;

        while (n > 0) {
            rem = n % 10;
            if (rem > largest) {
                largest = rem;
            }
            n /= 10;
        }

        return largest;
    }

    // Check for Perfect Number

    public boolean isPerfect(int n) {
        // Brute-force

        /*
         * int perfectNumber = 0;
         * for (int ele = 1; ele < n; ele++) {
         * if (n % ele == 0) {
         * perfectNumber += ele;
         * }
         * }
         * 
         * if (n == perfectNumber) {
         * return true;
         * }
         * 
         * return false;
         * 
         */

        // Optimised

        int perfectNum = n != 1 ? 1 : 0;

        for (int ele = 2; ele * ele <= n; ele++) {
            if (n % ele == 0 && n / ele != ele) {
                perfectNum += ele;
                perfectNum += n / ele;
            }
        }

        return perfectNum == n;
    }

    // Check for Prime Number

    public static boolean isPrime(int n) {
        // Brute-force

        // if (n == 1) {
        // return false;
        // }
        // for (int i = 2; i < n; i++) {
        // if (n % i == 0) {
        // return false;
        // }
        // }
        // return true;

        // Optimised

        if (n == 1) {
            return false;
        }

        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) {
                return false;
            }
        }
        return true;
    }

    // Count of Prime Numbers till N

    public int countPrimeNumbers(int n) {
        int count = 0;

        for (int i = 2; i <= n; i++) {
            if (Solutions.isPrime(i)) {
                count += 1;
            }
        }

        return count;
    }

    // GCD of Two Numbers

    public static int gcdOfTwoNumbers(int n1, int n2) {
        // Brute-force

        // int gcd = 1;
        // int min = n1 < n2 ? n1 : n2;

        // for (int ele = 1; ele <= min; ele++) {
        // if (n1 % ele == 0 && n2 % ele == 0) {
        // gcd = ele;
        // }
        // }

        // return gcd;

        // Optimised

        while (n1 != 0 && n2 != 0) {
            if (n1 > n2) {
                n1 = n1 % n2;
            } else {
                n2 = n2 % n1;
            }
        }

        return n1 != 0 ? n1 : n2;
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

    // LCM of two numbers

    public int lcmOfNumbers(int n1, int n2) {
        // Brute-force

        // int max = n1 > n2 ? n1 : n2;
        // int count = 1, lcm;

        // do {
        // lcm = count * max;
        // if (lcm % n1 == 0 && lcm % n2 == 0) {
        // break;
        // }
        // count++;
        // } while (count != 0);

        // return lcm;

        // Optimised

        return (n1 * n2) / Solutions.gcdOfTwoNumbers(n1, n2);
    }

    // Divisors of a Number

    public int[] getDivisors(int n) {
        int[] list = new int[n];

        int count = 0;
        for (int i = 1; i <= n; i++) {
            if (n % i == 0) {
                list[count] = i;
                count++;
            }
        }

        return Arrays.copyOf(list, count);
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
        // solutions.printPairSum(new int[] { 2, 9, 4, -1, 8, 5 });
        // System.out.println(solutions.getLargest(99));
        // System.out.println(solutions.isPerfect(1));
        // System.out.println(Solutions.isPrime(16));
        // System.out.println(solutions.countPrimeNumbers(10));
        // System.out.println(solutions.powerOfNumbers(30));
        // System.out.println(solutions.gcdOfTwoNumbers(12, 6));
        // System.out.println(solutions.lcmOfNumbers(3, 5));
        System.out.println(Arrays.toString(solutions.getDivisors(8)));
    }
}