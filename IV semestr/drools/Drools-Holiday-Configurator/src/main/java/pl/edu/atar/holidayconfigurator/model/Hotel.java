package pl.edu.atar.holidayconfigurator.model;

import java.util.List;
import java.util.Objects;

public class Hotel {
    private String name;
    private int stars;
    private double pricePerNight;
    private String region;
    private List<String> features; // np. ["basen", "spa", "blisko plaży"]

    public Hotel() {
    }

    public Hotel(String name, int stars, double pricePerNight, String region, List<String> features) {
        this.name = name;
        this.stars = stars;
        this.pricePerNight = pricePerNight;
        this.region = region;
        this.features = features;
    }

    public double getTotalPrice(int numberOfNights) {
        return this.pricePerNight * numberOfNights;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStars() {
        return stars;
    }

    public void setStars(int stars) {
        this.stars = stars;
    }

    public double getPricePerNight() {
        return pricePerNight;
    }

    public void setPricePerNight(double pricePerNight) {
        this.pricePerNight = pricePerNight;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    @Override
    public String toString() {
        return name + " (" + stars + " gwiazdek, " +
                String.format("%.2f", pricePerNight) + " zł/noc)";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hotel hotel = (Hotel) o;
        return Objects.equals(name, hotel.name) && Objects.equals(region, hotel.region);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, region);
    }
}