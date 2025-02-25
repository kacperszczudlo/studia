package spring.org.example;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import spring.model.Account;
import spring.service.AccountService;

import java.util.List;

public class ConsoleApp {
    public static void main(String[] args) {
        try {
            ApplicationContext appCtx = new ClassPathXmlApplicationContext("applicationContext.xml");
            AccountService accountService = appCtx.getBean(AccountService.class);
            List<Account> delinquentAccounts = accountService.findDeliquentAccounts();

            if (delinquentAccounts.isEmpty()) {
                System.out.println("Brak zaległych kont.");
            } else {
                System.out.println("Zaległe konta:");
                for (Account account : delinquentAccounts) {
                    System.out.println("Account No: " + account.getAccountNo());
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
