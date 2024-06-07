import java.util.Scanner;
public class Main {
    public static void main(String[] args) throws DniMiesiaca {
        Scanner scanner = new Scanner(System.in);

        try {
            System.out.println("Podaj dzień: ");
            int day = scanner.nextInt();
            System.out.println("Podaj miesiąc: ");
            int month = scanner.nextInt();
            System.out.println("Podaj rok: ");
            int year = scanner.nextInt();

            Data data = new Data(day, month, year);
            data.Printdata();

            String dayOfWeek = data.getDayOfWeekByZeller();
            System.out.println("Dzień tygodnia : " + dayOfWeek);
        } catch (DniMiesiaca dm) {
            System.out.println("Złapany wyjątek: " + dm.getMessage());
            dm.printStackTrace(System.err);
        }

        scanner.close();
    }
}
