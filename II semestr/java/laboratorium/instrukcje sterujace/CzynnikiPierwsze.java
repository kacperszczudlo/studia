package pakietzad1a;

import java.util.Scanner;

public class CzynnikiPierwsze {
    public static void main(String[] args) {
        int liczba;
        Scanner sc = new Scanner(System.in);
        System.out.print("Podaj liczbe: ");
        liczba = sc.nextInt();
        System.out.print("Rozkład liczby " + liczba + " na czynniki pierwsze: ");
        for (int i = 2; i <= liczba; i++) {
            while (liczba % i == 0) {
                System.out.print(i + " ");
                liczba /= i;
            }
        }
        sc.close();
    }
}
