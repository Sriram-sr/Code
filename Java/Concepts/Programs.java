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
    }
}