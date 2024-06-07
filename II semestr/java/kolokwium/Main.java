package company;

/**
 * Klasa Main zawiera metodę main, która demonstruje działanie klas Student i Uczelnia.
 */
public class Main {
    /**
     * Metoda main, która jest punktem wejścia do programu.
     *
     * @param args Argumenty wiersza poleceń.
     */
    public static void main(String[] args) {
        try {
            Student student1 = new Student("Jan", "Kowalski", 123);
            Student student2 = new Student("Anna", "Nowak", 456);
            Student student3 = new Student("Piotr", "Zielinski", 789);

            Uczelnia uczelnia = new Uczelnia();
            uczelnia.dodajStudenta(student1);
            uczelnia.dodajStudenta(student2);
            uczelnia.dodajStudenta(student3);

            System.out.println("Studenci po dodaniu:");
            uczelnia.wypiszStudentowPosortowanychPoNumerzeAlbumu();

            uczelnia.usunStudentowWPrzedziale(200, 500);

            System.out.println("\nStudenci po usunięciu:");
            uczelnia.wypiszStudentowPosortowanychPoNumerzeAlbumu();

        } catch (BledneDane e) {
            System.out.println("Błąd: " + e.getMessage());
        }
    }
}


