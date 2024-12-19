package spring.service;

import spring.dao.AccountDao;
import spring.model.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AccountService {
    private final AccountDao accountDao;

    @Autowired
    public AccountService(AccountDao accountDao) {
        this.accountDao = accountDao;
    }

    public List<Account> getNonSolidClients() {
        return accountDao.getAllAccounts().stream()
                .filter(account -> account.getBalance() < 0)
                .collect(Collectors.toList());
    }
}
