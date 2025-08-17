package com.example.model;

public class Employee {
    private int id;
    private String name;
    private int age;

    public Employee(int id, String name, int age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public int getId() {
        return this.id;
    }

    public String getName() {
        return name;
    }

    public void displayInfo() {
        System.out.println("Employee name: " + this.name + " Employee Id: " +
                this.id + " Employee age: " + this.age);
    }
}
