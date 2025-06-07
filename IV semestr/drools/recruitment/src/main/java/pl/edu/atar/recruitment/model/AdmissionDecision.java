// pl/edu/atar/recruitment/model/AdmissionDecision.java
package pl.edu.atar.recruitment.model;

public class AdmissionDecision {
    private Candidate candidate;

    public AdmissionDecision(Candidate candidate) {
        this.candidate = candidate;
    }

    public Candidate getCandidate() {
        return candidate;
    }

    public void setCandidate(Candidate candidate) {
        this.candidate = candidate;
    }
}