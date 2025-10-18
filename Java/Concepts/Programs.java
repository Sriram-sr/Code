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

    // Reverse a number

    public int reverseNumber(int num) {
        long reversed = 0;
        int remainder = 0;
        while (num != 0) {
            remainder = num % 10;
            reversed = (reversed * 10) + remainder;
            num /= 10;
        }

        if (reversed > Integer.MAX_VALUE || reversed < Integer.MIN_VALUE) {
            return 0;
        }
        if (num < 0) {
            return (int) (-1 * reversed);
        }

        return (int) reversed;
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
        // Brute

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

        // Optimal

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
        // Brute

        // if (n == 1) {
        // return false;
        // }
        // for (int i = 2; i < n; i++) {
        // if (n % i == 0) {
        // return false;
        // }
        // }
        // return true;

        // Optimal

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
        // Brute

        // int gcd = 1;
        // int min = n1 < n2 ? n1 : n2;

        // for (int ele = 1; ele <= min; ele++) {
        // if (n1 % ele == 0 && n2 % ele == 0) {
        // gcd = ele;
        // }
        // }

        // return gcd;

        // Optimal

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
        // Brute

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

        // Optimal

        return (n1 * n2) / Solutions.gcdOfTwoNumbers(n1, n2);
    }

    // Divisors of a Number

    public int[] getDivisors(int n) {
        // int[] list = new int[n];

        // int count = 0;
        // for (int i = 1; i <= n; i++) {
        // if (n % i == 0) {
        // list[count] = i;
        // count++;
        // }
        // }

        // return Arrays.copyOf(list, count);

        // Optimal

        int count = 0;
        int temp[] = new int[(int) Math.sqrt(n) * 2];

        for (int num = 1; num * num <= n; num++) {
            if (n % num == 0) {
                temp[count++] = num;
                if (num * num != n) {
                    temp[count++] = n / num;
                }
            }
        }

        Arrays.sort(temp, 0, count);

        return Arrays.copyOf(temp, count);
    }

    // Reverse an array

    public int[] reverseArray(int[] arr, int n) {
        // Brute

        // int[] tempArray = new int[n];

        // for (int idx = n - 1; idx >= 0; idx--) {
        // tempArray[n - 1 - idx] = arr[idx];
        // }

        // for (int idx = 0; idx < n; idx++) {
        // arr[idx] = tempArray[idx];
        // }

        // return arr;

        // Optimal

        int left = 0;
        int right = n - 1;
        int temp;

        while (right > left) {
            temp = arr[right];
            arr[right] = arr[left];
            arr[left] = temp;
            left++;
            right--;
        }

        return arr;
    }

    public boolean arraySortedOrNot(int[] arr, int n) {
        for (int idx = 0; idx <= n - 2; idx++) {
            if (!(arr[idx] <= arr[idx + 1])) {
                return false;
            }
        }
        return true;
    }

    // Palindrome Check string

    public boolean palindromeCheck(String s) {
        // int lastIdx = s.length() - 1;
        // StringBuilder reverse = new StringBuilder();

        // while (lastIdx >= 0) {
        // reverse.append(s.charAt(lastIdx));
        // lastIdx--;
        // }

        // return s.equals(reverse.toString());

        // Approach 2

        int left = 0;
        int right = s.length() - 1;

        while (left < right) {
            if (s.charAt(left) != s.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
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

    // Largest Odd Number in a String

    public String largestOddNumberString(String s) {
        int n = s.length();
        int endIdx = -1;
        for (int idx = n - 1; idx >= 0; idx--) {
            if ((s.charAt(idx) - '0') % 2 == 1) {
                endIdx = idx;
                break;
            }
        }
        if (endIdx == -1) {
            return "";
        }

        int startIdx = 0;
        for (startIdx = 0; startIdx < n; startIdx++) {
            if (s.charAt(startIdx) != '0') {
                break;
            }
        }

        return s.substring(startIdx, endIdx + 1);
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

    // Rotate String

    public boolean rortateString(String s, String goal) {
        // Brute

        if (s.length() != goal.length()) {
            return false;
        }

        if (s.length() == 1) {
            return s.equals(goal);
        }

        int shifts = s.length();
        while (shifts > 0) {
            s = s.substring(1) + s.charAt(0);
            if (s.equals(goal)) {
                return true;
            }
            shifts--;
        }

        return false;

        // Optimimal

        // return s.length() == goal.length() && (s + s).contains(goal);
    }

    // Valid Anagram

    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        int[] freqS = new int[26], freqT = new int[26];
        for (int idx = 0; idx < s.length(); idx++) {
            freqS[s.charAt(idx) - 'a']++;
            freqT[t.charAt(idx) - 'a']++;
        }

        for (int charIdx = 0; charIdx < freqS.length; charIdx++) {
            if (freqS[charIdx] != freqT[charIdx]) {
                return false;
            }
        }

        return true;
    }
}

public class Programs {
    public static void main(String args[]) {
        Solutions solutions = new Solutions();
        // solutions.findOddOrEven(19);
        // System.out.println(solutions.reverseNumber(-1534236469));
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
        // System.out.println(Arrays.toString(solutions.getDivisors(1000)));
        // System.out.println(Arrays.toString(solutions.reverseArray(new int[] { 8, 0 },
        // 2)));
        // System.out.println(solutions.arraySortedOrNot(new int[] { 5, 5 }, 2));
        // System.out.println(solutions.palindromeCheck("racecar"));
        // System.out.println(solutions.getMinMaxOfArray(new int[] { 1, 4, 3, -5, -4, 8,
        // 6 }));
        // System.out.println(solutions.largestOddNumberString("800"));
        // System.out.println(solutions.longestCommonPrefix(new String[] { "float",
        // "flow",
        // "flight", "flop" }));
        // System.out.println(solutions.rortateString("size", "zesi"));
        System.out.println(solutions.isAnagram("anagram", "nagaram"));
    }
}