package spring.dao.csv;

import spring.dao.AccountDao;
import spring.model.Account;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class CsvAccountDao implements AccountDao {
    private String csvResource;

    public CsvAccountDao() {
    }

    public CsvAccountDao(String csvResource) {
        this.csvResource = csvResource;
    }

    @Override
    public List<Account> getAllAccounts() {
        List<Account> accounts = new ArrayList<>();
        try (BufferedReader br = new BufferedReader(new InputStreamReader(getClass().getClassLoader().getResourceAsStream(csvResource)))) {
            String line;
            while ((line = br.readLine()) != null) {
                String[] values = line.split(",");
                Account account = new Account(Integer.parseInt(values[0]), Double.parseDouble(values[1]), values[2]);
                accounts.add(account);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return accounts;
    }

    public void setCsvResource(String csvResource) {
        this.csvResource = csvResource;
    }
}
