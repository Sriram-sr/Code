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
    }
}