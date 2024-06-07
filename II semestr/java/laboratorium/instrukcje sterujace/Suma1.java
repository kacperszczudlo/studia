package pakietzad1;

import java.io.*;

public class Suma1 {
    static String s;
    static int x, y, suma;

    public static void main(String[] args) throws IOException {
        BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in), 1);
        System.out.print("Podaj pierwsza liczbe calkowita: ");
        s = stdin.readLine();
        x = Integer.parseInt(s);
        System.out.print("Podaj druga liczbe calkowita: ");
        s = stdin.readLine();
        y = Integer.parseInt(s);
        suma = x+y;
        System.out.println("Suma podanych liczb to:  "+suma);
    }

}