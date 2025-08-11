import java.util.Scanner;

public class Basics {
    public static void main(String[] args) {
        int number = -9;
        int positiveNumber = -number; // Unary operator
        System.out.println("After unary " + positiveNumber);

        Scanner scanner = new Scanner(System.in);
        String firstValue = scanner.next();
        String secondValue = scanner.next();
        scanner.close();

        System.out.println(firstValue + " " + secondValue);
    }
}