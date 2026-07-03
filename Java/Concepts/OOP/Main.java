class Student {
    String name;
    int rollNumber;

    public void setDetails (String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    public void displayDetails() {
        System.out.println("Name : " + this.name);
        System.out.println("Roll Number : " + this.rollNumber);
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.setDetails("Striver", 30000);
        student.displayDetails();
    }
}