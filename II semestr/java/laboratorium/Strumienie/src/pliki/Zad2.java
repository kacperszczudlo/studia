package pliki;
import java.io.*;
public class Zad2 {
    public static void main(String[] args) throws IOException {
    // dzięki podaniu drugiego parametru,
    // bufor będzie opróżniany po wypisaniu każdej linii
    try(BufferedReader br = new BufferedReader(new FileReader(args[0]))){
    // dzięki podaniu drugiego parametru,
    // bufor będzie opróżniany po wypisaniu każdej linii
        PrintWriter pw = new PrintWriter(System.out, true);
        String s;
        while ((s = br.readLine()) != null)
            pw.println(s);

        }
    }
}