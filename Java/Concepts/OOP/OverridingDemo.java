package OOP;

// Run time polymorphism or Dyanmic method dispatch example

class Computer {
    void sayHello() {
        System.out.println("Hello world! - From computer...");
    }
}

class Laptop extends Computer {
    void sayHello() {
        System.out.println("Hello world! - From Laptop...");
    }
}

class Smartphone extends Computer {
    void sayHello() {
        System.out.println("Hello world! - From Smartphone...");
    }
}

public class OverridingDemo {
    public static void main(String[] args) {
        Computer gadget = new Computer();
        gadget.sayHello();

        gadget = new Laptop();
        gadget.sayHello();

        Computer trueGadget = new Smartphone();
        trueGadget.sayHello();
    }
}
