package konsola;

import java.io.*;

public class Main1 {
    static String s;
    static int x;

    public static void main(String[] args) throws IOException {

        System.out.print("Podaj x = ");
        BufferedReader stdin = new BufferedReader(new InputStreamReader(System.in), 1);
        s = stdin.readLine(); // odczyt danych ze strumienia wej.
        x = Integer.parseInt(s);
        System.out.println("x = "+x);
    }

}
