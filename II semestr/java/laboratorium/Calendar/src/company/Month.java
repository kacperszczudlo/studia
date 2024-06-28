package company;

/**
 * Klasa reprezentująca miesiąc.
 */
public class Month {
    /** Numer miesiąca. */
    int number;
    /** Nazwa miesiąca. */
    String name;
    /** Ilość dni w miesiącu. */
    int days;

    /**
     * Konstruktor klasy Month.
     *
     * @param number numer miesiąca
     * @param name nazwa miesiąca
     * @param days ilość dni w miesiącu
     */
    public Month(int number, String name, int days) {
        this.number = number;
        this.name = name;
        this.days = days;
    }

    /**
     * Metoda zwracająca numer miesiąca.
     *
     * @return numer miesiąca
     */
    public int getMonthNumber() {
        return number;
    }

    /**
     * Metoda zwracająca ilość dni w miesiącu.
     *
     * @return ilość dni w miesiącu
     */
    public int getMonthdays() {
        return days;
    }
}
