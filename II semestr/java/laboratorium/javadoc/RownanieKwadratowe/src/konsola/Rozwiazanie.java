/**
 * Klasa reprezentująca rozwiązanie równania kwadratowego.
 * Zawiera informacje o pierwiastkach równania.
 */
package konsola;
public class Rozwiazanie {

    /** Pierwszy pierwiastek równania. */
    Float x1 = null;

    /** Drugi pierwiastek równania. */
    Float x2 = null;

    /**
     * Konstruktor klasy Rozwiazanie.
     *
     * @param x1 pierwszy pierwiastek równania
     * @param x2 drugi pierwiastek równania
     */
    public Rozwiazanie(Float x1, Float x2) {
        this.x1 = x1;
        this.x2 = x2;
    }

    /**
     * Metoda zwracająca tekstową reprezentację rozwiązania równania kwadratowego.
     * Jeśli rozwiązanie nie istnieje, zwraca informację o braku rozwiązań.
     * Jeśli istnieje tylko jedno rozwiązanie, zwraca jego wartość.
     * Jeśli istnieją dwa rozwiązania, zwraca ich wartości.
     *
     * @return tekstowa reprezentacja rozwiązania równania kwadratowego
     */
    String wypisz(){
        if(this.x1 == null)
            return "Brak rozwiązań";
        else if (this.x2 == null)
            return "Jedno rozwiązanie x1= " + this.x1.toString();
        else
            return "Dwa rozwiązania " + this.x1.toString() + " oraz " + this.x2.toString();
    }
}
