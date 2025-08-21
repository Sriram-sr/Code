package com.example;

import com.example.model.*;
import com.example.utils.*;

class Database extends Employee {
    public Database() {
        super(3, "Manual", 34);
    }

    public void getEmployeeData() {
        String empPrivData = this.publicVar;
        String empProtData = this.protectedVar;
        System.out.println(empPrivData + empProtData);
    }
}

public class Main {
    public static void main(String[] args) {
        Employee employee = new Employee(1, "Sriram", 25);
        employee.displayInfo();
        String nameOfEmployee = employee.getName();
        System.out.println(StringUtils.reverseString(nameOfEmployee));

        Database data = new Database();
        data.getEmployeeData();
    }
}
