import java.lang.reflect.Array;
import java.util.Scanner;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;

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
        if (year % 400 == 0) return true;
        else if (year % 4 == 0) return true;
        else return false;
    }

    public void leapYearInRange(int start, int end) {
        for (int year = start; year <= end; year++) {
            if (isLeapYear(year)) System.out.println(year);
        }
    }

    // Max handshakes in a room
    public int maxHandshakes(int n) {
        return n * (n - 1) / 2;
    }

    public int[] swapAdjacents(int[] arr) {
        int temp;

        for (int idx = 0; idx < arr.length; idx++) {
            if (idx % 2 == 1) {
                temp = arr[idx];
                arr[idx] = arr[idx - 1];
                arr[idx - 1] = temp;
            }
        }

        return arr;
    }

    public int countOperations(int n) {
        int cnt = 0;

        while (n != 0) {
            if (n % 2 == 0) n /= 2;
            else n -= 1;
            cnt += 1;
        }

        return cnt;
    }

    public int findInsertPosition(int[] arr, int k) {
        // Brute O(n) time and O(1) space

        // for (int idx = 0; idx < arr.length; idx++) {
        // if (arr[idx] == k) return idx;
        // else if (arr[idx] > k) return idx;
        // }
        //
        // return arr.length;

        // Optimal

        int low = 0;
        int high = arr.length - 1;
        int mid;

        while (low <= high) {
            mid = low + (high - low) / 2;

            if (arr[mid] == k) return mid;
            else if (arr[mid] < k) low = mid + 1;
            else high = mid - 1;
        }

        return low;
    }

    public int countSubStrings(String S, String sub) {
        // Brute O(n * m)

        int count = 0;
        boolean match;

        for (int idx = 0; idx < S.length() - sub.length() + 1; idx++) {
            match = true;
            for (int subIdx = idx; subIdx < idx + sub.length(); subIdx++) {
                if (S.charAt(subIdx) != sub.charAt(subIdx - idx)) {
                    match = false;
                    break;
                }
            }
            if (match) count++;
        }

        return count;
    }

    public int[] runningSum(int[] arr) {
        int sum = 0;

        for (int idx = 0; idx < arr.length; idx++) {
            sum += arr[idx];
            arr[idx] = sum;
        }

        return arr;
    }

    public int sumOfDigits(int num) {
        int sum = 0;
        int rem;

        while (num > 0) {
            rem = num % 10;
            sum += rem;
            num /= 10;
        }

        return sum;
    }

    public int[] sumOfEachDigits(int[] arr) {
        // O (N * log M) where M is the number with max digits

        for (int idx = 0; idx < arr.length; idx++) {
            arr[idx] = sumOfDigits(arr[idx]);
        }

        return arr;
    }

    public HashMap<Integer, Integer> getFrequency(int[] arr) {
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int ele : arr) {
            map.put(ele, map.getOrDefault(ele, 0) + 1);
        }

        return map;
    }

    public List<List<Integer>> getSublists(int[] arr, int n, int k) {
        int sublistsInRange = n / k;
        int extraValues = n % k;
        int totalSubLists = extraValues > 0 ? sublistsInRange + 1 : sublistsInRange;

        List<List<Integer>> result = new ArrayList<>();
        int ptr = 0;
        List<Integer> subList;

        for (int idx = 0; idx < totalSubLists; idx++) {
            subList = new ArrayList<>();
            if (extraValues > 0 && idx == totalSubLists - 1) {
                for (int subIdx = 0; subIdx < extraValues; subIdx++) {
                    subList.add(arr[ptr]);
                    ptr++;
                }
            } else {
                for (int subIdx = 0; subIdx < k; subIdx++) {
                    subList.add(arr[ptr]);
                    ptr++;
                }
            }
            result.add(subList);
        }

        System.out.println(result);
        return result;
    }
}

public class Programs {
    public static void main(String args[]) {
        Solutions solutions = new Solutions();
        solutions.getSublists(new int[]{2, 3, 7, 4, 1, 6, 5, 8}, 8, 9);
    }
}
