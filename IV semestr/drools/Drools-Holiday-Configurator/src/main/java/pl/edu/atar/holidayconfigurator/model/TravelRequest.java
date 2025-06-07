package pl.edu.atar.holidayconfigurator.model;

import java.util.List;
import java.util.Objects;

public class TravelRequest {
    private String customerId;
    private double maxBudget;
    private int numberOfTravelers;
    private int durationDays;
    private List<String> interests;
    private String preferredRegion;

    public TravelRequest() {
    }

    public TravelRequest(String customerId, double maxBudget, int numberOfTravelers, int durationDays, List<String> interests, String preferredRegion) {
        this.customerId = customerId;
        this.maxBudget = maxBudget;
        this.numberOfTravelers = numberOfTravelers;
        this.durationDays = durationDays;
        this.interests = interests;
        this.preferredRegion = preferredRegion;
    }


    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public double getMaxBudget() {
        return maxBudget;
    }

    public void setMaxBudget(double maxBudget) {
        this.maxBudget = maxBudget;
    }

    public int getNumberOfTravelers() {
        return numberOfTravelers;
    }

    public void setNumberOfTravelers(int numberOfTravelers) {
        this.numberOfTravelers = numberOfTravelers;
    }

    public int getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(int durationDays) {
        this.durationDays = durationDays;
    }

    public List<String> getInterests() {
        return interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }

    public String getPreferredRegion() {
        return preferredRegion;
    }

    public void setPreferredRegion(String preferredRegion) {
        this.preferredRegion = preferredRegion;
    }

    @Override
    public String toString() {
        return "TravelRequest{" +
                "customerId='" + customerId + '\'' +
                ", maxBudget=" + maxBudget +
                ", numberOfTravelers=" + numberOfTravelers +
                ", durationDays=" + durationDays +
                ", interests=" + interests +
                ", preferredRegion='" + preferredRegion + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TravelRequest that = (TravelRequest) o;
        return Objects.equals(customerId, that.customerId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerId);
    }
}