import java.util.Arrays;

class Computer {
    String processor;
    String operatingSystem;
    String memory;
    private float kernelVersion = 1.22f;

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

    static String variant = "Laptop";
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
    }
}
