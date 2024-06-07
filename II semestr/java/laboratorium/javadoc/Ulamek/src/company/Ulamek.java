package company;

/**
 * Klasa reprezentująca ułamek.
 * Ułamek jest reprezentowany przez licznik i mianownik oraz zawiera metody
 * do skracania ułamka, dodawania, odejmowania oraz statyczne metody do
 * obliczania sumy i różnicy dwóch ułamków.
 */
public class Ulamek {

    /** Licznik ułamka. */
    int licznik;

    /** Mianownik ułamka. */
    int mianownik;

    /**
     * Konstruktor klasy Ulamek.
     * Tworzy nowy ułamek na podstawie podanego licznika i mianownika.
     * Automatycznie skraca ułamek i ustawia mianownik na 1, jeśli jest równy 0.
     *
     * @param licznik licznik ułamka
     * @param mianownik mianownik ułamka
     */
    public Ulamek(int licznik, int mianownik)
    {
        this.licznik = licznik;
        if(mianownik == 0)
        {
            this.mianownik = 1;
        }
        else
        {
            this.mianownik = mianownik;
        }
        shorten();
    }

    /**
     * Metoda do skracania ułamka.
     * Wykorzystuje algorytm Euklidesa do znalezienia największego wspólnego dzielnika
     * licznika i mianownika, a następnie dzieli licznik i mianownik przez ten dzielnik.
     */
    public void shorten(){
        int nwd = nwd(licznik, mianownik);
        licznik /= nwd;
        mianownik /= nwd;
    }

    /**
     * Metoda zwracająca tekstową reprezentację ułamka.
     *
     * @return tekstowa reprezentacja ułamka w postaci "licznik/mianownik"
     */
    @Override
    public String toString() {
        return licznik + "/" + mianownik;
    }

    /**
     * Metoda obliczająca największy wspólny dzielnik dwóch liczb.
     *
     * @param a pierwsza liczba
     * @param b druga liczba
     * @return największy wspólny dzielnik liczb a i b
     */
    public int nwd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    /**
     * Metoda dodająca inny ułamek do tego ułamka.
     *
     * @param b ułamek, który ma być dodany
     */
    void suma(Ulamek b)
    {
        this.licznik = this.licznik * b.mianownik + b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    /**
     * Statyczna metoda obliczająca sumę dwóch ułamków.
     *
     * @param a pierwszy ułamek
     * @param b drugi ułamek
     * @return suma ułamków a i b
     */
    static Ulamek suma2(Ulamek a, Ulamek b)
    {
        int num = a.licznik * b.mianownik + b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new Ulamek(num, denom);
    }

    /**
     * Metoda odejmująca inny ułamek od tego ułamka.
     *
     * @param b ułamek, który ma być odjęty
     */
    void odejmowanie(Ulamek b)
    {
        this.licznik = this.licznik * b.mianownik - b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    /**
     * Statyczna metoda obliczająca różnicę dwóch ułamków.
     *
     * @param a pierwszy ułamek
     * @param b drugi ułamek
     * @return różnica ułamków a i b
     */
    static Ulamek odejmowanie2(Ulamek a, Ulamek b)
    {
        int num = a.licznik * b.mianownik - b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new Ulamek(num, denom);
    }
}
