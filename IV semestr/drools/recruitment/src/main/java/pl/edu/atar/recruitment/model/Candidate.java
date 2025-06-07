// pl/edu/atar/recruitment/model/Candidate.java
package pl.edu.atar.recruitment.model;

import java.util.ArrayList;
import java.util.List;

public class Candidate implements java.io.Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private boolean olympicLaureate = false; // Czy jest laureatem olimpiady?
    private String desiredFieldOfStudy; // Kierunek, na który aplikuje

    private List<ExamSubjectResult> examResults = new ArrayList<>();

    // To pole będzie modyfikowane przez reguły
    private String status = "Pending"; // Status kandydata: Pending, Qualified, Admitted, Rejected
    private Integer recruitmentPoints = 0;

    // Konstruktory
    public Candidate(Long id, String firstName, String lastName, String desiredFieldOfStudy) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.desiredFieldOfStudy = desiredFieldOfStudy;
    }

    // Gettery i Settery dla wszystkich pól...

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    public boolean isOlympicLaureate() { return olympicLaureate; }
    public void setOlympicLaureate(boolean olympicLaureate) { this.olympicLaureate = olympicLaureate; }
    public String getDesiredFieldOfStudy() { return desiredFieldOfStudy; }
    public void setDesiredFieldOfStudy(String desiredFieldOfStudy) { this.desiredFieldOfStudy = desiredFieldOfStudy; }
    public List<ExamSubjectResult> getExamResults() { return examResults; }
    public void setExamResults(List<ExamSubjectResult> examResults) { this.examResults = examResults; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getRecruitmentPoints() { return recruitmentPoints; }
    public void setRecruitmentPoints(Integer recruitmentPoints) { this.recruitmentPoints = recruitmentPoints; }

    // Pomocnicza metoda do wyświetlania informacji
    @Override
    public String toString() {
        return "Candidate{" +
                "id=" + id +
                ", name='" + firstName + " " + lastName + '\'' +
                ", fieldOfStudy='" + desiredFieldOfStudy + '\'' +
                ", points=" + recruitmentPoints +
                ", status='" + status + '\'' +
                '}';
    }
}