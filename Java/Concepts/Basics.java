import java.util.Arrays;
import java.util.Scanner;

class Employee {
    private String name;
    private double salary;

    public Employee(String name, double salary) {
        this.name = name;
        this.salary = salary;
    }

    public String getDetails() {
        return "Name: " + this.name + ", Salary: " + this.salary;
    }
}

class Manager extends Employee {
    private String department;

    public Manager(String name, double salary, String department) {
        super(name, salary);
        this.department = department;
    }

    public String getDetails() {
        return super.getDetails() + ", Department: " + this.department;
    }
}

enum StatusCodes {
    Failed, Passed, Skipped, Errored
};

class NegativeValueException extends Exception {
    public NegativeValueException(String message) {
        super(message);
    }
}

class LearnOS extends Thread {
    public void run() {
        for (int cnt = 0; cnt < 100; cnt++) {
            System.out.println("Learning operating system");
        }
    }
}

class LearnDSA extends Thread {
    public void run() {
        for (int cnt = 0; cnt < 100; cnt++) {
            System.out.println("Learning Data Structures and Algorithms");
        }
    }
}

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

        Employee employee = new Employee("Alice", 50000);
        Employee manager = new Manager("Bob", 80000, "IT");
        System.out.println(employee.getDetails());
        System.out.println(manager.getDetails());

        StatusCodes status = StatusCodes.Errored;
        StatusCodes[] allStatus = StatusCodes.values();
        System.out.println(status);
        System.out.println(status.ordinal());
        System.out.println(Arrays.toString(allStatus));

        int numerator = 50;
        int denominator = -5;

        try {
            if (denominator < 0) {
                throw new NegativeValueException("Denominator cannot be negative.");
            }
            int result = numerator / denominator;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Division by zero is not allowed.");
        } catch (NegativeValueException e) {
            System.out.println("Error: " + e.getMessage());
        }

        // Multithreading

        LearnOS osThread = new LearnOS();
        LearnDSA dsaThread = new LearnDSA();
        osThread.start();
        dsaThread.start();
    }
}