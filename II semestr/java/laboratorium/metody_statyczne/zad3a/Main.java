package company;
import java.util.Scanner;

public class Main {

    public static void main(String[] args)
    {
        try {
            System.out.println("Podaj pierwszy ulamek: ");
            Scanner scanner = new Scanner(System.in);
            int a = scanner.nextInt();
            int b = scanner.nextInt();
            Ulamek ulamek1 = new Ulamek(a, b);
            System.out.println("Podaj drugi ulamek: ");
            a = scanner.nextInt();
            b = scanner.nextInt();
            Ulamek ulamek2 = new Ulamek(a, b);

            ulamek1.suma(ulamek2);
            System.out.println("Suma a = a + b: " + ulamek1);

            ulamek1.odejmowanie(ulamek2); //wyrownanie

            ulamek1.odejmowanie(ulamek2);
            System.out.println("Roznica a = a - b: " + ulamek1);

            ulamek1.suma(ulamek2); //wyrownianie

            Ulamek suma = Ulamek.suma2(ulamek1, ulamek2);
            System.out.println("Suma c = a + b: " + suma);

            Ulamek roznica = Ulamek.odejmowanie2(ulamek1, ulamek2);
            System.out.println("Roznica c = a - b: " + roznica);
        }
        catch (ZeroMianownik zm){
            System.out.println("Zlapany wyjatek: " + zm.getMessage());
            zm.printStackTrace(System.err);
        }
    }
}