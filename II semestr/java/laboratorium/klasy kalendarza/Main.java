package com.company;

public class Main {

    public static void main(String[] args) {
	Calendar calendar = new Calendar();

	int month = 11;
	int year = 1;
	try
	{
		exceptionHandler.checkMonth(month);
		exceptionHandler.checkYear(year);
	}
	catch (ArrayIndexOutOfBoundsException e)
	{
        System.out.println("Podany miesiąc wychodzi poza zdefiniowany zakres");
    }
	catch (Exception e)
	{
        throw new IllegalArgumentException("Rok nie moze byc 0, powinien być conajmniej 1 lub -1");
    }

	date date = new date(2024, Calendar.months[0], 2);
	Calendar.addDate(date);
	calendar.printDate(date);

	calendar.moveForward(date);
	calendar.printDate(date);
	calendar.moveForward(date);
	calendar.printDate(date);
	calendar.moveBack(date);
	calendar.printDate(date);
	calendar.moveBack(date);
	calendar.printDate(date);
    }
}
