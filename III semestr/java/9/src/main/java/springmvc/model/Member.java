package springmvc.model;

public class Member {

    private String firstName;
    private String lastName;
    public Member() {}
    public Member(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    public String getFirstName() {
        return firstName;
    }

    public String toString() {
        return firstName + " " + lastName;
    }

    public void setFirstName(String string) {
        this.firstName = string;
    }

    public void setLastName(String string) {
        this.lastName = string;
    }
}
