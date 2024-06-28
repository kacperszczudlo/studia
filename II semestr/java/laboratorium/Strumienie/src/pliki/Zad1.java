package pliki;
import java.io.*;
public class Zad1 {
    public static void main(String[] args) throws IOException {
        try (BufferedInputStream is = new BufferedInputStream(new FileInputStream(args[0]))) {
            for (int i = 1; i <= 4; i++)
                System.out.print(Integer.toHexString(is.read()));
        }
    }
}
