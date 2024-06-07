package konsola;

import java.io.*;
import java.util.Scanner;
public class Main {

    public static void main(String[] args) {


        Scanner scanner = new Scanner(System.in);
        System.out.print("Podaj a: ");
        int a = scanner.nextInt();
        System.out.print("Podaj b: ");
        int b = scanner.nextInt();
        System.out.print("Podaj c: ");
        int c = scanner.nextInt();
        scanner.close();
        RownanieKwadratowe rk = new RownanieKwadratowe(a,b,c);
        rk.wyznaczPierwiastki();
        System.out.print(rk.roz.wypisz());
    }
}