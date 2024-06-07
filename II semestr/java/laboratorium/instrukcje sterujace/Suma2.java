package pakietzad1;
import java.util.Scanner;
public class Suma2 {
    static int x, y, suma;

    public static void main(String[] args){
        Scanner sc = new Scanner(System.in);

        System.out.print("Podaj pierwszą liczbę całkowitą: ");
        x = sc.nextInt();

        System.out.print("Podaj drugą liczbę całkowitą: ");
        y = sc.nextInt();

        suma = x + y;
        System.out.println("Suma podanych liczb to: " + suma);
        sc.close();

    }
}
