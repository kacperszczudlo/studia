package pl.edu.atar.holidayconfigurator.model;

import java.util.Objects;

public class Activity {
    private String name;
    private double price;
    private String type;
    private String requiredInterest;

    public Activity() {
    }

    public Activity(String name, double price, String type, String requiredInterest) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.requiredInterest = requiredInterest;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRequiredInterest() {
        return requiredInterest;
    }

    public void setRequiredInterest(String requiredInterest) {
        this.requiredInterest = requiredInterest;
    }

    @Override
    public String toString() {
        return name + " (" + type + ", Cena: " + String.format("%.2f", price) + " zł)";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Activity activity = (Activity) o;
        return Objects.equals(name, activity.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}