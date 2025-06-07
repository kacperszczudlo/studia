// pl/edu/atar/recruitment/data/Dataset.java
package pl.edu.atar.recruitment.data;

import pl.edu.atar.recruitment.model.Candidate;
import pl.edu.atar.recruitment.model.ExamSubjectResult;

import java.util.ArrayList;
import java.util.List;

public class Dataset {

    public List<Candidate> getCandidates() {
        List<Candidate> candidates = new ArrayList<>();

        // Kandydat 1: Idealny na informatykę
        Candidate c1 = new Candidate(1L, "Jan", "Kowalski", "Informatyka");
        c1.getExamResults().add(new ExamSubjectResult("Matematyka", "Rozszerzony", 85.0));
        c1.getExamResults().add(new ExamSubjectResult("Angielski", "Rozszerzony", 90.0));
        candidates.add(c1);

        // Kandydat 2: Za słaby na informatykę
        Candidate c2 = new Candidate(2L, "Anna", "Nowak", "Informatyka");
        c2.getExamResults().add(new ExamSubjectResult("Matematyka", "Rozszerzony", 55.0));
        candidates.add(c2);

        // Kandydat 3: Laureat olimpiady
        Candidate c3 = new Candidate(3L, "Piotr", "Zieliński", "Prawo");
        c3.setOlympicLaureate(true);
        candidates.add(c3);

        // Kandydat 4: Dobry na prawo, ale bez dalszej rywalizacji
        Candidate c4 = new Candidate(4L, "Ewa", "Wiśniewska", "Prawo");
        c4.getExamResults().add(new ExamSubjectResult("Historia", "Rozszerzony", 75.0));
        c4.getExamResults().add(new ExamSubjectResult("Polski", "Rozszerzony", 80.0));
        candidates.add(c4);

        // ==========================================================
        // ===            DODANY KANDYDAT DO RYWALIZACJI          ===
        // ==========================================================
        // Kandydat 5: Konkurent na informatykę. Ma minimalnie gorszą matematykę,
        // ale lepszy angielski. Zobaczmy, kto wygra!
        Candidate c5 = new Candidate(5L, "Adam", "Mickiewicz", "Informatyka");
        c5.getExamResults().add(new ExamSubjectResult("Matematyka", "Rozszerzony", 84.0));
        c5.getExamResults().add(new ExamSubjectResult("Angielski", "Rozszerzony", 95.0));
        candidates.add(c5);

        return candidates;
    }
}