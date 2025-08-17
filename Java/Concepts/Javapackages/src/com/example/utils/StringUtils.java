package com.example.utils;

public class StringUtils {
    public static String reverseString(String str) {
        StringBuilder stringBuilder = new StringBuilder(str);
        stringBuilder.reverse();

        return stringBuilder.toString();
    }
}
