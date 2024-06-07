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

        // Sprawdź, czy rok jest przestępny
        if (isLeapYear(year)) {
            tab[1].setDays(29); // Ustaw luty na 29 dni w roku przestępnym
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
        // Implementacja dodawania tygodnia
    }

    public String getDayOfWeekByZeller() {
        int q = day;
        int m = Integer.parseInt(month.getMonthNumber());
        int Y = year;

        if (m < 3) {
            m += 12;
            Y -= 1;
        }

        int K = Y % 100;
        int J = Y / 100;

        int h = (q + (13 * (m + 1)) / 5 + K + (K / 4) + (J / 4) + 5 * J) % 7;

        String[] daysOfWeek = {"Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"};

        return daysOfWeek[h];
    }
}
