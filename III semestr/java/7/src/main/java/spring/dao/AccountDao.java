package spring.dao;
import java.util.List;
import spring.model.Account;

public interface AccountDao {
    List<Account> findAll() throws Exception;
}