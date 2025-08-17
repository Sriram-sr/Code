package com.example;

import com.example.model.*;
import com.example.utils.*;

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee(1, "Sriram", 25);
        employee.displayInfo();
        String nameOfEmployee = employee.getName();
        System.out.println(StringUtils.reverseString(nameOfEmployee));
    }
}
