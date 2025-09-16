class Computer {
    String processor;
    String operatingSystem;
    String memory;
    private float kernelVersion = 1.22f;
    static String variant = "Laptop";

    static {
        System.out.println("Inside static block"); // Executes while class is loaded
    }

    public Computer(String processorName) {
        // Constructor method
        processor = processorName;
    }

    // Getter
    public float getKernelVersion() {
        return kernelVersion;
    }

    // Setter
    public void setKernelVersion(float value) {
        this.kernelVersion = value;
    }

    public void getManufacturedYear() {
        System.out.println("Manufactured in 2008");
    }

    public void getArchitecture() {
        System.out.println("In parent computer!");
    }
}

class Laptop extends Computer {
    private String brand = "Lenovo";

    public Laptop() {
        super("Intel");
    }

    public String getBrand() {
        return brand;
    }

    @Override
    public void getManufacturedYear() {
        System.out.println("Manufactured in 2016");
    }

    public void getLapArchitecture() {
        System.out.println("In child Laptop!");
    }
}

class Outer {
    String onlyVar = "Only variable of this class";

    public void express() {
        System.out.println("Expressing outer class");
    }

    class Inner {
        public void expressInner() {
            System.out.println("Expressing inner class");
        }
    }

    static class StaticInner {
        public void expressStaticInner() {
            System.out.println("Expressing static inner class");
        }
    }
}

abstract class SecureFirewall {
    abstract void configDHCP();
}

public class OOP {
    public static void main(String[] args) {
        try {
            Class.forName("Computer"); // For loading class incase you are not creating objects
        } catch (ClassNotFoundException e) {
            System.out.println("Can be ignored" + e);
        }
        Computer win11 = new Computer("Intel");
        win11.memory = "16GB";
        win11.operatingSystem = "Windows";

        Computer macbook = new Computer("M4");
        macbook.memory = "32GB";
        macbook.operatingSystem = "MacOS";
        macbook.setKernelVersion(2.0f);
        System.out.println(macbook.getKernelVersion());

        Laptop laptop = new Laptop();
        System.out.println(laptop.getBrand());
        System.out.println(laptop.getKernelVersion());
        laptop.getManufacturedYear();

        Computer lapIn25 = new Laptop(); // Implicitely its upcasting
        // lapIn25.getLapArchitecture(); Will throw error since reference is Computer
        Laptop lapOwnInstance = (Laptop) lapIn25; // Downcasting
        lapOwnInstance.getLapArchitecture();
        lapOwnInstance.getArchitecture();

        Outer outer = new Outer();
        outer.express();
        Outer.Inner inner = outer.new Inner();
        inner.expressInner();
        Outer.StaticInner staticInnerInstance = new Outer.StaticInner();
        staticInnerInstance.expressStaticInner();

        // Anonymous inner class

        Outer outer2 = new Outer(){
            @Override
            public void express() {
                System.out.println("Overridden outer with anonymous inner class");
            }
        };
        outer2.express();

        SecureFirewall ciscoasa = new SecureFirewall() {
            public void configDHCP() { // Inner class allows to create instance for abstract classes
                System.out.println("Configuring DHCP");
            }
        };
        ciscoasa.configDHCP();
    }
}
