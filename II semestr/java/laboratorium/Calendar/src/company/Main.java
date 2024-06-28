package company;

/**
 * Główna klasa programu, zawiera metodę main.
 */
public class Main {
    /**
     * Metoda główna programu. Tworzy kalendarz, dodaje datę, wyświetla dzień tygodnia oraz loguje zdarzenie.
     *
     * @param args argumenty wiersza poleceń (nie używane)
     */
    public static void main(String[] args) {
        Calendar calendar = new Calendar();

        int year = 2024;
        int month = 6;
        int day = 8;

        Data date;
        try {
            date = new Data(day, month, year);
        } catch (DniMiesiaca e) {
            System.out.println(e.getMessage());
            return;
        }

        System.out.println("Dla daty: " + day + "." + month + "." + year);
        System.out.println("Day of the week (Zeller's Congruence): " + calendar.getDayOfWeekByZeller(date));
        System.out.println("Day of the week (Shifting method): " + calendar.getDayOfWeekByShifting(date));

        Calendar.logEvent(date, "Wyświetlono dzień tygodnia");

        Data dateFromFile = Calendar.readDateFromFile("events.txt");
        if (dateFromFile != null) {
            System.out.println("Odczytana data z pliku: " + dateFromFile.day + "." + dateFromFile.month.number + "." + dateFromFile.year);
        }
    }
}
