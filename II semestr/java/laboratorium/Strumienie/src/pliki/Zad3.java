package pliki;
import java.io.*;

public class Zad3 {
    static BufferedReader sin;

    public static BufferedReader plikDoOdczytania() {
        String odp = "";
        while (true) {
            try {
                System.out.println("Podaj nazwę pliku do wypisania.");
                System.out.println("Jeżeli chcesz zakończyć wpisz \"koniec\".");
                odp = sin.readLine();
                if (odp.equals("koniec"))
                    return null;
                else
                    return new BufferedReader(new FileReader(odp));
            } catch (IOException e) {
                System.out.println("Błąd: Nie udało się otworzyć pliku: " + odp);
            }
        }
    }

    public static void main(String[] args) {
        sin = new BufferedReader(new InputStreamReader(System.in));
        BufferedReader br;
        while ((br = plikDoOdczytania()) != null) {
            try {
                PrintWriter pw = new PrintWriter(System.out, true);
                String s;
                while ((s = br.readLine()) != null)
                    pw.println(s);
                br.close();
            } catch (IOException e) {
                System.out.println("Błąd: Nie udało się odczytać pliku.");
            }
        }
        System.out.println("Do następnego razu!");
    }
}
