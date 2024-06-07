package company;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Klasa Uczelnia zarządza listą studentów.
 */
public class Uczelnia {
    private List<Student> studenci;

    /**
     * Tworzy nowy obiekt Uczelnia.
     */
    public Uczelnia() {
        this.studenci = new ArrayList<>();
    }

    /**
     * Dodaje studenta do listy studentów.
     *
     * @param student Student do dodania.
     */
    public void dodajStudenta(Student student) {
        studenci.add(student);
    }

    /**
     * Usuwa studentów, których numer albumu mieści się w zadanym przedziale.
     *
     * @param od Dolna granica przedziału.
     * @param doNum Górna granica przedziału.
     */
    public void usunStudentowWPrzedziale(int od, int doNum) {
        studenci.removeIf(student -> student.getNumerAlbumu() >= od && student.getNumerAlbumu() <= doNum);
    }

    /**
     * Wypisuje dane studentów posortowanych po numerze albumu.
     */
    public void wypiszStudentowPosortowanychPoNumerzeAlbumu() {
        Collections.sort(studenci);
        for (Student student : studenci) {
            System.out.println(student);
        }
    }
}


