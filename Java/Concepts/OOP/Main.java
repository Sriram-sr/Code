class Student {
    String name;
    int rollNumber;

    public void setDetails(String name, int rollNumber) {
        this.name = name;
        this.rollNumber = rollNumber;
    }

    public void displayDetails() {
        System.out.println("Name : " + this.name);
        System.out.println("Roll Number : " + this.rollNumber);
    }
}

class Book {
    String[] title;
    String[] author;
    boolean[] isAvailable;
    int totalEntities;

    Book(String[] titles, String[] authors, boolean[] isAvailable) {
        this.title = titles;
        this.author = authors;
        this.isAvailable = isAvailable;
        this.totalEntities = titles.length;
    }

    public void borrowBook(String bookName) {
        for (int idx = 0; idx < this.totalEntities; idx++) {
            if (title[idx].equals(bookName)) {
                if (isAvailable[idx]) {
                    isAvailable[idx] = false;
                } else {
                    System.out.println("Book is not available.");
                }
            }
        }
    }

    public void returnBook(String bookName) {
        for (int idx = 0; idx < this.totalEntities; idx++) {
            if (title[idx].equals(bookName)) {
                isAvailable[idx] = true;
            }
        }
    }

    public void getAvailability(String bookName) {
        for (int idx = 0; idx < this.totalEntities; idx++) {
            if (title[idx].equals(bookName)) {
                if (isAvailable[idx]) {
                    System.out.println(true);
                } else {
                    System.out.println(false);
                }
            }
        }
    }
}

public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.setDetails("Striver", 30000);

        String[] titles = {"Sherlock_Holmes", "Frankenstein", "King_Arthur_and_the_Round_Table", "Treasure_Island"};
        String[] authors = {"Arthur_Conan_Doyle", "Mary_Shelley", "Roger_Lancelyn_Green", "Robert_Louis_Stevenson"};
        boolean[] isAvailable = {false, true, false, false};
        Book book = new Book(titles, authors, isAvailable);
        book.borrowBook("Frankenstein");
        book.borrowBook("Sherlock_Holmes");
        book.returnBook("King_Arthur_and_the_Round_Table");
        book.getAvailability("Sherlock_Holmes");
        book.borrowBook("Frankenstein");
    }
}