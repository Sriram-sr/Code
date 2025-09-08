import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;

public class CollectionsDemo {
    public static void main(String[] args) {
        ArrayList<String> cars = new ArrayList<>();
        cars.add("BMW");
        cars.add("Benz");
        System.out.println(cars);
        System.out.println(cars.size());
        // cars.remove(1);
        System.out.println(cars);
        for (String car : cars) {
            System.out.println(car);
        }

        // Custom sort function

        ArrayList<Integer> numbers = new ArrayList<>();
        numbers.add(7);
        numbers.add(4);
        numbers.add(-2);
        numbers.add(8);
        numbers.add(3);

        // Collections.sort(numbers, (num1, num2) -> num2 - num1);

        Collections.sort(numbers, new Comparator<Integer>() {
            @Override
            public int compare(Integer num1, Integer num2) {
                if (num1 < num2) {
                    return 1;
                } else if (num1 > num2) {
                    return -1;
                }
                return 0;
            }
        });

        System.out.println(numbers);
    }
}
