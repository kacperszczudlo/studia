package spring.app;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import spring.service.AccountService;
import spring.model.Account;

import java.util.List;

public class App {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        AccountService accountService = context.getBean("accountService", AccountService.class);

        List<Account> nonSolidClients = accountService.getNonSolidClients();
        nonSolidClients.forEach(System.out::println);
    }
}
