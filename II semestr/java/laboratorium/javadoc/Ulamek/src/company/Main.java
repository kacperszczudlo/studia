package company;

import java.util.Scanner;

/**
 * Klasa główna programu, który wykonuje operacje na ułamkach.
 * Program pobiera od użytkownika dwie pary liczb całkowitych reprezentujących ułamki,
 * tworzy obiekty klasy Ulamek na ich podstawie, a następnie wykonuje na nich operacje
 * dodawania, odejmowania oraz wyświetla wyniki.
 */
public class Main {

    /**
     * Metoda główna programu.
     * Pobiera od użytkownika dwie pary liczb całkowitych reprezentujących ułamki,
     * tworzy obiekty klasy Ulamek na ich podstawie, a następnie wykonuje na nich
     * operacje dodawania, odejmowania oraz wyświetla wyniki.
     *
     * @param args argumenty wiersza poleceń, nie są używane w tym programie
     */
    public static void main(String[] args) {
        // Inicjalizacja obiektu Scanner do pobierania danych od użytkownika
        Scanner scanner = new Scanner(System.in);

        // Pobranie od użytkownika licznika i mianownika pierwszego ułamka
        int a = scanner.nextInt();
        int b = scanner.nextInt();

        // Utworzenie obiektu klasy Ulamek na podstawie pierwszego ułamka
        Ulamek ulamek1 = new Ulamek(a, b);

        // Pobranie od użytkownika licznika i mianownika drugiego ułamka
        a = scanner.nextInt();
        b = scanner.nextInt();

        // Utworzenie obiektu klasy Ulamek na podstawie drugiego ułamka
        Ulamek ulamek2 = new Ulamek(a, b);

        // Dodanie drugiego ułamka do pierwszego i wyświetlenie wyniku
        ulamek1.suma(ulamek2);
        System.out.println("Suma a = a + b: " + ulamek1);

        // Odejmowanie drugiego ułamka od pierwszego (dwukrotnie, aby zrównać)
        ulamek1.odejmowanie(ulamek2); //wyrownanie
        ulamek1.odejmowanie(ulamek2);
        System.out.println("Roznica a = a - b: " + ulamek1);

        // Dodanie drugiego ułamka do pierwszego (ponowne wyrownanie)
        ulamek1.suma(ulamek2); //wyrownianie

        // Obliczenie sumy dwóch ułamków i wyświetlenie wyniku
        Ulamek suma = Ulamek.suma2(ulamek1, ulamek2);
        System.out.println("Suma c = a + b: " + suma);

        // Obliczenie różnicy dwóch ułamków i wyświetlenie wyniku
        Ulamek roznica = Ulamek.odejmowanie2(ulamek1, ulamek2);
        System.out.println("Roznica c = a - b: " + roznica);
    }
}
