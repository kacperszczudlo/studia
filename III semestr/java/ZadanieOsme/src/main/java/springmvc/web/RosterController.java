package springmvc.web;

import springmvc.model.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/roster")
public class RosterController {

    private final List<Member> members = new ArrayList<>();

    public RosterController() {
        members.add(new Member("Jan", "Janowski"));
        members.add(new Member("Piotr", "Piotrowski"));
        members.add(new Member("Antoni", "Antowski"));
        members.add(new Member("Kamil", "Kamilski"));
    }

    // Mapa dla "/roster/list"
    @RequestMapping("/list")
    public String list(Model model) {
        model.addAttribute("memberList", members);
        return "roster/list";
    }

    // Mapa dla "/roster/member"
    @RequestMapping("/member")
    public String member(@RequestParam("id") Integer id, Model model) {
        model.addAttribute("member", members.get(id));
        return "roster/member";
    }
}
