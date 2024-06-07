package com.company;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Scanner;
import java.util.*;

public class Main {

    public static void main(String[] args) throws Exception {
        /*
        Scanner scanner = new Scanner(System.in);
        int a = scanner.nextInt();
        int b = scanner.nextInt();
        ulamek ulamek1 = new ulamek(a,b);
        a = scanner.nextInt();
        b = scanner.nextInt();
        ulamek ulamek2 = new ulamek(a,b);

        ulamek1.suma(ulamek2);
        System.out.println("Suma a = a + b: " + ulamek1);

        ulamek1.odejmowanie(ulamek2); //wyrownanie
        ulamek1.odejmowanie(ulamek2);
        System.out.println("Roznica a = a - b: " + ulamek1);

        ulamek1.suma(ulamek2); //wyrownianie

        ulamek suma = ulamek.suma2(ulamek1, ulamek2);
        System.out.println("Suma c = a + b: " + suma);

        ulamek roznica = ulamek.odejmowanie2(ulamek1, ulamek2);
        System.out.println("Roznica c = a - b: " + roznica);
        */

        Collection<ulamek> kol1 = new ArrayList<ulamek>();
        ulamek ulamek1 = new ulamek(1, 2);
        ulamek ulamek2 = new ulamek(1,3);
        ulamek ulamek3 = new ulamek(1,4);

        Collection<ulamek> kol2 = new ArrayList<ulamek>();

        kol1.add(ulamek2);
        kol1.add(ulamek1);
        kol1.add(ulamek3);

        kol2.add(ulamek3);
        kol2.add(ulamek2);
        kol2.add(ulamek1);

        System.out.println("Lista 1:");
        for (ulamek u: kol1)
        {
            System.out.println(u);
        }
        System.out.println("Lista 2:");
        for (ulamek u: kol2)
        {
            System.out.println(u);
        }

        //Collections.sort(kol1);
        //Collections.sort(kol2);

        System.out.println("Lista 1 po sortowaniu:");
        for (ulamek u: kol1)
        {
            System.out.println(u);
        }
        System.out.println("Lista 2 po sortowaniu:");
        for (ulamek u: kol2)
        {
            System.out.println(u);
        }
    }
}
