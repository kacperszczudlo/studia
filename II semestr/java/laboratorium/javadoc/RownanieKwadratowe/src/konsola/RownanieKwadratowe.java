/**
 * Klasa reprezentująca równanie kwadratowe.
 * Zawiera metody do obliczania delty oraz wyznaczania pierwiastków równania.
 */
package konsola;
public class RownanieKwadratowe {

    /** Współczynnik a równania kwadratowego. */
    float a;

    /** Współczynnik b równania kwadratowego. */
    float b;

    /** Współczynnik c równania kwadratowego. */
    float c;

    /** Obiekt przechowujący rozwiązanie równania. */
    Rozwiazanie roz;

    /**
     * Konstruktor klasy RownanieKwadratowe.
     * Tworzy nowe równanie kwadratowe na podstawie podanych współczynników
     * oraz od razu oblicza jego pierwiastki.
     *
     * @param a współczynnik a równania kwadratowego
     * @param b współczynnik b równania kwadratowego
     * @param c współczynnik c równania kwadratowego
     */
    public RownanieKwadratowe(float a, float b, float c) {
        this.a = a;
        this.b = b;
        this.c = c;
        wyznaczPierwiastki();
    }

    /**
     * Metoda obliczająca deltę równania kwadratowego.
     *
     * @return wartość delty równania kwadratowego
     */
    float obliczDelte(){
        return b * b - 4 * a * c;
    }

    /**
     * Metoda wyznaczająca pierwiastki równania kwadratowego
     * i przypisująca je do obiektu rozwiązania.
     */
    void wyznaczPierwiastki(){
        float delta = obliczDelte();
        if (delta < 0){
            roz = new Rozwiazanie(null,null);
        }
        else if(delta == 0){
            float x = -b /(2*a);
            roz = new Rozwiazanie(x,null);
        }
        else{
            float x1 = (float) ((-b + Math.sqrt(delta)) / (2 * a));
            float x2 = (float) ((-b - Math.sqrt(delta)) / (2 * a));
            roz = new Rozwiazanie(x1, x2);
        }
    }
}
