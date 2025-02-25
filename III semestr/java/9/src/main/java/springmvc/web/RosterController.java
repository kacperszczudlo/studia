package springmvc.web;

import org.springframework.beans.factory.annotation.Autowired;
import springmvc.jdbc.MemberDao;
import springmvc.model.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
public final class RosterController {

    private List<Member> members;

    @Autowired
    private MemberDao memberDao;

    public void setMemberDao(MemberDao memberDao)
    {
        this.memberDao = memberDao;
    }

    public RosterController() {};

    @RequestMapping("list")
    public void list(Model model) throws Exception
    {
        members = memberDao.findAll();

        model.addAttribute(members);
    }

    @RequestMapping("member.*")
    public String member(@RequestParam("id") Integer id, Model model)
    {
        model.addAttribute(members.get(id));
        return "roster/member";
    }
}
