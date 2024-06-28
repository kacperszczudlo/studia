package company;

/**
 * Klasa obsługująca wyjątki.
 */
public class exceptionHandler {
    /**
     * Metoda sprawdzająca poprawność numeru miesiąca.
     *
     * @param month numer miesiąca
     * @throws ArrayIndexOutOfBoundsException wyjątek rzucany w przypadku nieprawidłowego numeru miesiąca
     */
    public static void checkMonth(int month) throws ArrayIndexOutOfBoundsException {
        if (month < 0 || month > 11) {
            throw new ArrayIndexOutOfBoundsException();
        }
    }

    /**
     * Metoda sprawdzająca poprawność roku.
     *
     * @param year rok
     * @throws IllegalArgumentException wyjątek rzucany w przypadku nieprawidłowego roku
     */
    public static void checkYear(int year) throws IllegalArgumentException {
        if (year == 0) {
            throw new IllegalArgumentException();
        }
    }
}
