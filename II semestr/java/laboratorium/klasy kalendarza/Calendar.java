package com.company;

public class Calendar {
    date date;

    static month[] months =
            {
                    new month(1, "January", 31),
                    new month(2, "February", 28),
                    new month(3, "March", 31),
                    new month(4, "April", 30),
                    new month(5, "May", 31),
                    new month(6, "June", 30),
                    new month(7, "July", 31),
                    new month(8, "August", 31),
                    new month(9, "September", 30),
                    new month(10, "October", 31),
                    new month(11, "November", 30),
                    new month(12, "December", 31)
            };

    public Calendar()
    {

    }

    public static void addDate(date date)
    {
        new Calendar();
        leapYearCheck(date);
    }

    private static void leapYearCheck(date date)
    {
        if((date.year%4 == 0 && date.year%100 != 0 || date.year%400 == 0) && date.month.number == 2)
        {
            months[1].days = 29;
        }
    }
    public void printDate(date date)
    {
        System.out.println(date.days + "." + date.month.number + "." + date.year);
    }

    int weekdays = 7;

    public void moveBack(date date)
    {
        date.days -= weekdays;
        if(date.days < 1)
        {
            if(date.month.number == 1)
            {
                if(date.year == 1)
                {
                    date.year = -1;
                }
                else
                {
                    date.year--;
                }
                date.month = months[11];
            }
            else
            {
                date.month = months[date.month.number-2];
            }
            date.days += date.month.days;
        }
    }

    public void moveForward(date date)
    {
        date.days += weekdays;
        if(date.days > date.month.days)
        {
            date.days -= date.month.days;
            if(date.month.number == 12)
            {
                if(date.year == -1)
                {
                    date.year = 1;
                }
                else
                {
                    date.year++;
                }
                date.month = months[0];;
            }
            else
            {
                date.month = months[date.month.number];
            }
        }
    }
}
