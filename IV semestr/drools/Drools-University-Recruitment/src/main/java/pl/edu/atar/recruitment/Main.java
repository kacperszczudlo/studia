// pl/edu/atar/recruitment/Main.java
package pl.edu.atar.recruitment;

import org.kie.api.KieBase;
import org.kie.api.KieServices;
import org.kie.api.logger.KieRuntimeLogger;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.StatelessKieSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pl.edu.atar.recruitment.data.Dataset;
import pl.edu.atar.recruitment.model.Candidate;

import java.util.List;

public class Main {

    private static final Logger LOGGER = LoggerFactory.getLogger(Main.class);

    public static void main(String[] args) {
        // 1. Pobieramy WSZYSTKICH kandydatów z naszej klasy z danymi
        List<Candidate> candidates = new Dataset().getCandidates();

        KieServices kService = KieServices.Factory.get();
        KieContainer kContainer = kService.getKieClasspathContainer();
        KieBase kBase = kContainer.getKieBase("triage");
        StatelessKieSession kSession = kBase.newStatelessKieSession();

        LOGGER.info("--- Starting recruitment process for {} candidates ---", candidates.size());

        System.out.println("=== CANDIDATES BEFORE REASONING ===");
        candidates.forEach(c -> System.out.println(c.toString()));
        System.out.println("=====================================");

        // ==========================================================
        // ===       NAJWAŻNIEJSZA ZMIANA - PRZETWARZANIE         ===
        // ==========================================================
        // Zamiast pętli, wstawiamy całą LISTĘ kandydatów do silnika.
        // Silnik będzie widział wszystkich kandydatów jednocześnie i będzie mógł
        // ich porównywać oraz stosować activation-group.

        // Opcjonalne logowanie do pliku
        KieRuntimeLogger fileLogger = kService.getLoggers().newFileLogger(kSession, "./logs/full_recruitment_reasoning");

        kSession.execute(candidates); // Przekazujemy całą listę!

        fileLogger.close();

        System.out.println("\n=== CANDIDATES AFTER REASONING ===");
        candidates.forEach(c -> System.out.println(c.toString()));
        System.out.println("====================================");
    }
}