public class Miesiace {
    private String monthNumber;
    private String monthName;
    private int days;

    public Miesiace(String nr, String nazwa, int iloscDni) {
        this.monthNumber = nr;
        this.monthName = nazwa;
        this.days = iloscDni;
    }

    public String getMonthName() {
        return monthName;
    }

    public int getMonthdays() {
        return days;
    }

    public String getMonthNumber() {
        return monthNumber;
    }

    public void setDays(int days) {
        this.days = days;
    }
}
