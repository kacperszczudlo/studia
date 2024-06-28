package company;

/**
 * Klasa reprezentująca datę.
 */
public class Data {
    /** Dzień. */
    int day;
    /** Miesiąc. */
    Month month;
    /** Rok. */
    int year;

    /**
     * Konstruktor klasy Data.
     *
     * @param day           dzień
     * @param monthNumber   numer miesiąca
     * @param year          rok
     * @throws DniMiesiaca  wyjątek rzucany w przypadku nieprawidłowego dnia miesiąca
     */
    public Data(int day, int monthNumber, int year) throws DniMiesiaca {
        this.day = day;
        this.month = Calendar.months[monthNumber - 1];
        this.year = year;
        if (day < 1 || day > this.month.days) {
            throw new DniMiesiaca("Nieprawidłowy dzień miesiąca: " + day);
        }
    }
}

/**
 * Klasa wyjątku rzucanego przy nieprawidłowym dniu miesiąca.
 */
class DniMiesiaca extends Exception {
    /**
     * Konstruktor klasy DniMiesiaca.
     *
     * @param message komunikat błędu
     */
    public DniMiesiaca(String message) {
        super(message);
    }
}
