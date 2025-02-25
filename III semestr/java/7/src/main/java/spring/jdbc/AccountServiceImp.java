package spring.jdbc;

import java.util.HashMap;
import java.util.List;
import javax.inject.Inject;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Service;
import spring.dao.AccountDao;
import spring.model.Account;
import spring.service.AccountService;

@Service
public class AccountServiceImp implements AccountDao {

    private final static String FIND_ALL_SQL =
            "select account_no, balance, last_paid_on from account";

    @Inject private NamedParameterJdbcOperations jdbcTemplate;
    @Inject private AccountRowMapper accountRowMapper;

    @Override
    public List<Account> findAll()
    {
        return jdbcTemplate.query(FIND_ALL_SQL, new HashMap<String, Object>(), accountRowMapper);
    }

}
