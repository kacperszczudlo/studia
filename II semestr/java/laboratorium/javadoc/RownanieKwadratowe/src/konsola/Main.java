/**
 * Klasa główna programu, który rozwiązuje równanie kwadratowe.
 * Program pobiera współczynniki równania kwadratowego od użytkownika
 * i wyświetla jego pierwiastki.
 */
package konsola;
import java.io.*;
import java.util.Scanner;

public class Main {

    /**
     * Metoda główna programu.
     * Pobiera współczynniki równania kwadratowego od użytkownika,
     * tworzy obiekt klasy RownanieKwadratowe, rozwiązuje równanie
     * i wyświetla wynik.
     *
     * @param args argumenty wiersza poleceń, nie są używane w tym programie
     */
    public static void main(String[] args) {
        // Inicjalizacja obiektu Scanner do pobierania danych od użytkownika
        Scanner scanner = new Scanner(System.in);

        // Pobieranie współczynników równania od użytkownika
        System.out.print("Podaj a: ");
        int a = scanner.nextInt();
        System.out.print("Podaj b: ");
        int b = scanner.nextInt();
        System.out.print("Podaj c: ");
        int c = scanner.nextInt();

        // Zamknięcie obiektu scanner, aby uniknąć wycieków pamięci
        scanner.close();

        // Tworzenie obiektu klasy RownanieKwadratowe z podanymi współczynnikami
        RownanieKwadratowe rk = new RownanieKwadratowe(a, b, c);

        // Wywołanie metody wyznaczPierwiastki do rozwiązania równania kwadratowego
        rk.wyznaczPierwiastki();

        // Wyświetlenie wyników równania kwadratowego
        System.out.print(rk.roz.wypisz());
    }
}
