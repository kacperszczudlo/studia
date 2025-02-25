package springmvc.jdbc;

import springmvc.model.Member;

import java.util.List;

public interface MemberDao {
    List<Member> findAll() throws Exception;
}
