public class Data {
    private int day;
    private Miesiace month;
    private int year;
    Miesiace[] tab = {
            new Miesiace("01", "Styczeń", 31),
            new Miesiace("02", "Luty", 28),
            new Miesiace("03", "Marzec", 31),
            new Miesiace("04", "Kwiecień", 30),
            new Miesiace("05", "Maj", 31),
            new Miesiace("06", "Czerwiec", 30),
            new Miesiace("07", "Lipiec", 31),
            new Miesiace("08", "Sierpień", 31),
            new Miesiace("09", "Wrzesień", 30),
            new Miesiace("10", "Październik", 31),
            new Miesiace("11", "Listopad", 30),
            new Miesiace("12", "Grudzień", 31)
    };

    public Data(int day, int month, int year) throws DniMiesiaca {
        this.year = year;

        if (isLeapYear(year)) {
            tab[1].setDays(29);
        }

        if (month < 1 || month > 12) {
            throw new DniMiesiaca("Jest 12 miesięcy");
        }
        if (day < 1 || day > tab[month - 1].getMonthdays()) {
            throw new DniMiesiaca("Nie ma " + day + " dnia w " + month + " miesiącu");
        }

        this.month = tab[month - 1];
        this.day = day;
    }

    private boolean isLeapYear(int year) {
        if (year % 4 == 0) {
            if (year % 100 == 0) {
                return year % 400 == 0;
            }
            return true;
        }
        return false;
    }

    public void Printdata() {
        System.out.println(this.day);
        System.out.println(this.month.getMonthName());
        System.out.println(this.year);
    }

    public void weekadd() {
    }

    public String getDayOfWeekByShifting() {
        Data referenceDate;
        try {
            referenceDate = new Data(30, 11, 2020);
        } catch (DniMiesiaca e) {
            return "Błąd przy tworzeniu daty referencyjnej";
        }

        String[] daysOfWeek = {"Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"};

        int daysBetween = calculateDaysBetween(referenceDate);
        int dayOfWeekIndex = (daysBetween % 7 + 7) % 7;

        return daysOfWeek[dayOfWeekIndex];
    }

    private int calculateDaysBetween(Data referenceDate) {
        int daysBetween = 0;

        if (this.year >= referenceDate.year) {
            for (int year = referenceDate.year; year < this.year; year++) {
                daysBetween += isLeapYear(year) ? 366 : 365;
            }
            daysBetween += daysInYearUntilDate(this) - daysInYearUntilDate(referenceDate);
        } else {
            for (int year = this.year; year < referenceDate.year; year++) {
                daysBetween -= isLeapYear(year) ? 366 : 365;
            }
            daysBetween += daysInYearUntilDate(this) - daysInYearUntilDate(referenceDate);
        }

        return daysBetween;
    }

    private int daysInYearUntilDate(Data date) {
        int days = date.day;
        for (int i = 0; i < Integer.parseInt(date.month.getMonthNumber()) - 1; i++) {
            days += tab[i].getMonthdays();
        }
        return days;
    }
}
