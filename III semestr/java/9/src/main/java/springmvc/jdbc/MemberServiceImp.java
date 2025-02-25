package springmvc.jdbc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcOperations;
import org.springframework.stereotype.Service;
import springmvc.model.Member;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

@Service("memberDao")
public class MemberServiceImp implements MemberDao {

    @Autowired
    @Qualifier("jdbcTemplate")
    private NamedParameterJdbcOperations jdbcTemplate;

    @Autowired
    @Qualifier("memberRowMapper")
    private MemberRowMapper memberRowMapper;

    @Override
    public List<Member> findAll() throws Exception {
        return jdbcTemplate.query("select first_name, last_name from members", new HashMap<String, Object>(), memberRowMapper);
    }
}

