package company;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Klasa reprezentująca kalendarz, umożliwia dodawanie dat, logowanie zdarzeń i odczyt dat z pliku.
 */
public class Calendar {
    /** Tablica miesięcy w roku. */
    static Month[] months = {
            new Month(1, "January", 31),
            new Month(2, "February", 28),
            new Month(3, "March", 31),
            new Month(4, "April", 30),
            new Month(5, "May", 31),
            new Month(6, "June", 30),
            new Month(7, "July", 31),
            new Month(8, "August", 31),
            new Month(9, "September", 30),
            new Month(10, "October", 31),
            new Month(11, "November", 30),
            new Month(12, "December", 31)
    };

    /**
     * Konstruktor klasy Calendar.
     */
    public Calendar() {}

    /**
     * Metoda dodająca datę do kalendarza.
     *
     * @param date data do dodania
     */
    public static void addDate(Data date) {
        leapYearCheck(date);
    }
    /**
     * Sprawdza, czy rok jest przestępny i aktualizuje ilość dni w lutym w zależności od wyniku.
     *
     * @param date data do sprawdzenia
     */
    private static void leapYearCheck(Data date) {
        if ((date.year % 4 == 0 && date.year % 100 != 0) || date.year % 400 == 0) {
            if (date.month.number == 2) {
                months[1].days = 29;
            }
        } else {
            months[1].days = 28;
        }
    }

    public void printDate(Data date) {
        System.out.println(date.day + "." + date.month.number + "." + date.year);
    }
    /**
     * Oblicza dzień tygodnia za pomocą metody przesuwania.
     *
     * @param date data
     * @return dzień tygodnia
     */
    public String getDayOfWeekByShifting(Data date) {
        Data referenceDate;
        try {
            referenceDate = new Data(30, 11, 2020);
        } catch (DniMiesiaca e) {
            return "Błąd przy tworzeniu daty referencyjnej";
        }

        String[] daysOfWeek = {"Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"};

        int daysBetween = calculateDaysBetween(referenceDate, date);
        int dayOfWeekIndex = (daysBetween % 7 + 7) % 7;

        return daysOfWeek[dayOfWeekIndex];
    }
    /**
     * Oblicza dzień tygodnia za pomocą wzoru Zellera.
     *
     * @param date data
     * @return dzień tygodnia
     */
    public String getDayOfWeekByZeller(Data date) {
        int q = date.day;
        int m = date.month.number;
        int Y = date.year;

        if (m < 3) {
            m += 12;
            Y -= 1;
        }

        int K = Y % 100;
        int J = Y / 100;

        int h = (q + (13 * (m + 1)) / 5 + K + (K / 4) + (J / 4) + 5 * J) % 7;

        String[] daysOfWeek = {"Sobota", "Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek"};

        return daysOfWeek[h];
    }
    /**
     * Oblicza liczbę dni między dwiema datami.
     *
     * @param referenceDate data referencyjna
     * @param date          data
     * @return liczba dni między datami
     */
    private int calculateDaysBetween(Data referenceDate, Data date) {
        int daysBetween = 0;

        if (date.year >= referenceDate.year) {
            for (int year = referenceDate.year; year < date.year; year++) {
                daysBetween += isLeapYear(year) ? 366 : 365;
            }
            daysBetween += daysInYearUntilDate(date) - daysInYearUntilDate(referenceDate);
        } else {
            for (int year = date.year; year < referenceDate.year; year++) {
                daysBetween -= isLeapYear(year) ? 366 : 365;
            }
            daysBetween += daysInYearUntilDate(date) - daysInYearUntilDate(referenceDate);
        }

        return daysBetween;
    }
    /**
     * Oblicza liczbę dni w roku do danej daty.
     *
     * @param date data
     * @return liczba dni w roku do danej daty
     */
    private int daysInYearUntilDate(Data date) {
        int days = date.day;
        for (int i = 0; i < date.month.number - 1; i++) {
            days += months[i].days;
        }
        return days;
    }
    /**
     * Sprawdza, czy dany rok jest rokiem przestępnym.
     *
     * @param year rok do sprawdzenia
     * @return true, jeśli rok jest przestępny, w przeciwnym razie false
     */
    private boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
    /**
     * Loguje zdarzenie w pliku.
     *
     * @param date  data zdarzenia
     * @param event opis zdarzenia
     */
    public static void logEvent(Data date, String event) {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter("events.txt", true))) {
            writer.write(date.day + "." + date.month.number + "." + date.year + " - " + event);
            writer.newLine();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    /**
     * Odczytuje datę z pliku.
     *
     * @param filename nazwa pliku
     * @return obiekt klasy Data odczytany z pliku
     */
    public static Data readDateFromFile(String filename) {
        try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
            String line;
            List<Data> dataList = new ArrayList<>();
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(" - ");
                String[] dateParts = parts[0].split("\\.");
                int day = Integer.parseInt(dateParts[0]);
                int month = Integer.parseInt(dateParts[1]);
                int year = Integer.parseInt(dateParts[2]);
                dataList.add(new Data(day, month, year));
            }
            if (!dataList.isEmpty()) {
                return dataList.get(0);
            }
        } catch (IOException | DniMiesiaca e) {
            e.printStackTrace();
        }
        return null;
    }
}
