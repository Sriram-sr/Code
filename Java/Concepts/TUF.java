class Solution {
    // Print last character of string

    public char lastChar(String s) {
        return s.charAt(s.length() - 1);
    }

    // Print X N numbers of times

    public void printX(int X, int N) {
        if (N == 0) {
            System.out.println("");
            return;
        }
        for (int count = 0; count < N; count++) {
            if (count == N - 1) {
                System.out.println(X);
            } else {
                System.out.print(X + " ");
            }
        }
    }

    // Sum of first last element in array

    public int sumOfFirstAndLast(int[] nums) {
        return nums[0] + nums[nums.length - 1];
    }

    // Switch case - Days of week

    public void whichWeekDay(int day) {
        switch (day) {
            case 1:
                System.out.print("Monday");
                break;
            case 2:
                System.out.print("Tuesday");
                break;
            case 3:
                System.out.print("Wednesday");
                break;
            case 4:
                System.out.print("Thursday");
                break;
            case 5:
                System.out.print("Friday");
                break;
            case 6:
                System.out.print("Saturday");
                break;
            case 7:
                System.out.print("Sunday");
                break;
            default:
                System.out.print("Invalid");
        }
    }

    // If else marks

    public void studentGrade(int marks) {
        if (marks >= 90) {
            System.out.print("Grade A");
        } else if (marks >= 70) {
            System.out.print("Grade B");
        } else if (marks >= 50) {
            System.out.print("Grade C");
        } else if (marks >= 35) {
            System.out.print("Grade D");
        } else {
            System.out.print("Fail");
        }
    }
}

class BankAccount {
    private String name;
    private double balance;

    BankAccount(String name, double balance) {
        this.name = name;
        this.balance = balance;
    }

    BankAccount() {
        this.name = "";
        this.balance = 0;
    }

    // Chaining constructor
    BankAccount(String name) {
        this(name, 0);
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public String getName() {
        return this.name;
    }

    public double getBalance() {
        return this.balance;
    }
}

public class TUF {
    public static void main(String[] args) {
        Solution solution = new Solution();
//        System.out.println(solution.lastChar("takeuforward"));

        BankAccount account = new BankAccount("Sriram", 100);
        double availableBalance = account.getBalance();
        account.setName("Raina");
        System.out.println(account.getName());
        System.out.println(availableBalance);
        BankAccount newAccount = new BankAccount("Sriram SR");
        System.out.println(newAccount.getBalance());
    }
}
