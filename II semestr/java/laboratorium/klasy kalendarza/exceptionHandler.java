package com.company;

public class exceptionHandler {
    public static void checkMonth(int month) throws ArrayIndexOutOfBoundsException
    {
        if(month < 0 || month > 11)
        {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    public static void checkYear(int year) throws IllegalArgumentException
    {
        if(year == 0)
        {
            throw new IllegalArgumentException();
        }
    }
}
