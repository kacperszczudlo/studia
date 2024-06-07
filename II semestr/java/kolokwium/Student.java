package company;

/**
 * Klasa Student reprezentuje studenta z imieniem, nazwiskiem i numerem albumu.
 */
public class Student implements Comparable<Student> {
    private String imie;
    private String nazwisko;
    private int numerAlbumu;

    /**
     * Tworzy nowy obiekt Student.
     *
     * @param imie Imię studenta.
     * @param nazwisko Nazwisko studenta.
     * @param numerAlbumu Numer albumu studenta.
     * @throws BledneDane jeśli imię lub nazwisko są null lub puste, lub numer albumu jest mniejszy od 1.
     */
    public Student(String imie, String nazwisko, int numerAlbumu) throws BledneDane {
        if (imie == null || imie.trim().isEmpty()) {
            throw new BledneDane("Imię nie może być puste lub null.");
        }
        if (nazwisko == null || nazwisko.trim().isEmpty()) {
            throw new BledneDane("Nazwisko nie może być puste lub null.");
        }
        if (numerAlbumu < 1) {
            throw new BledneDane("Numer albumu musi być większy od 0.");
        }
        this.imie = imie;
        this.nazwisko = nazwisko;
        this.numerAlbumu = numerAlbumu;
    }

    /**
     * Zwraca imię studenta.
     *
     * @return Imię studenta.
     */
    public String getImie() {
        return imie;
    }

    /**
     * Zwraca nazwisko studenta.
     *
     * @return Nazwisko studenta.
     */
    public String getNazwisko() {
        return nazwisko;
    }

    /**
     * Zwraca numer albumu studenta.
     *
     * @return Numer albumu studenta.
     */
    public int getNumerAlbumu() {
        return numerAlbumu;
    }

    @Override
    public String toString() {
        return "Student{" +
                "imie='" + imie + '\'' +
                ", nazwisko='" + nazwisko + '\'' +
                ", numerAlbumu=" + numerAlbumu +
                '}';
    }

    /**
     * Porównuje tego studenta z innym na podstawie numeru albumu.
     *
     * @param other Inny obiekt Student.
     * @return Liczba ujemna, zero lub liczba dodatnia w zależności od porównania numerów albumu.
     */
    @Override
    public int compareTo(Student other) {
        return Integer.compare(this.numerAlbumu, other.numerAlbumu);
    }
}
