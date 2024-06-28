package pliki;
import java.io.*;
public class Zad4 {
    public static void echo (Reader r, Writer w) throws IOException {
        int i;
        while ((i = r.read()) != -1)
            w.write((char) i);
    }
    public static void main(String[] args) throws Exception {
        Reader r = null;
        Writer w = null;
        try {
            r = new BufferedReader(new FileReader(args[0]));
            w = new PrintWriter(args[1]);
            echo(r, w);
        } finally {
            try {
                r.close();
            } catch (IOException e) {
                System.out.println("Wystąpił błąd przy zamykaniu pliku wejściowego.");
            }
            try {
                w.close();
            } catch (IOException e) {
                System.out.println("Wystąpił błąd przy zamykaniu pliku wyjściowego.");
            }
        }
    }
}