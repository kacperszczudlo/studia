package pl.edu.atar.holidayconfigurator;

import org.kie.api.KieServices;
import org.kie.api.logger.KieRuntimeLogger;
import org.kie.api.runtime.KieContainer;
import org.kie.api.runtime.KieSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import pl.edu.atar.holidayconfigurator.model.HolidayPackage;
import pl.edu.atar.holidayconfigurator.model.TravelRequest;

import java.util.Arrays;

public class HolidayConfiguratorMain {
    private static final Logger LOGGER = LoggerFactory.getLogger(HolidayConfiguratorMain.class);

    public static void main(String[] args) {
        KieServices ks = KieServices.Factory.get();
        KieContainer kContainer = ks.getKieClasspathContainer();
        KieSession kSession = kContainer.newKieSession("holidaySession");

        KieRuntimeLogger droolsLogger = ks.getLoggers().newFileLogger(kSession, "logs/reasoning_fact_1");

        TravelRequest request = new TravelRequest("CUST-001", 4000.00, 2, 7,
                Arrays.asList("plaża", "zwiedzanie"), "Europa");

        HolidayPackage holidayPackage = new HolidayPackage(request);
        holidayPackage.setStatus("NEW");

        LOGGER.info("--- ROZPOCZYNAMY KONFIGURACJĘ PAKIETU ---");
        LOGGER.info("Zapytanie: Budżet {} zł, {} osoby, {} dni, Zainteresowania: {}",
                request.getMaxBudget(), request.getNumberOfTravelers(), request.getDurationDays(), request.getInterests());

        kSession.setGlobal("LOGGER", LOGGER);

        kSession.insert(request);
        kSession.insert(holidayPackage);

        int firedRules = kSession.fireAllRules();

        LOGGER.info("--- KONFIGURACJA ZAKOŃCZONA ---");
        LOGGER.info("Uruchomiono {} reguł.", firedRules);
        LOGGER.info("Wynikowy pakiet:\n{}", holidayPackage);

        droolsLogger.close();

        kSession.dispose();
    }
}