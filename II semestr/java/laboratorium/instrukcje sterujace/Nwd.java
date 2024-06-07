package pakietzad1a;

import java.util.Scanner;

public class Nwd {

    public static void main(String[] args){
        int x, y;
        Scanner sc = new Scanner(System.in);
        System.out.print("Podaj x: ");
        x = sc.nextInt();
        System.out.print("Podaj y: ");
        y = sc.nextInt();

        while (x != y) {
            if (x > y) {
                x = x - y;
            } else {
                y = y - x;
            }
        }
        System.out.println("Najwiekszy wspolny dzielnik: " + x);
        sc.close();
    }
    }
