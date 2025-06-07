package pl.edu.atar.holidayconfigurator.model;

import java.util.Objects;

public class Flight {
    private String destination;
    private String airline;
    private double price;
    private String flightClass;

    public Flight() {
    }

    public Flight(String destination, String airline, double price, String flightClass) {
        this.destination = destination;
        this.airline = airline;
        this.price = price;
        this.flightClass = flightClass;
    }

    // --- Gettery i Settery ---

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public String getAirline() {
        return airline;
    }

    public void setAirline(String airline) {
        this.airline = airline;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getFlightClass() {
        return flightClass;
    }

    public void setFlightClass(String flightClass) {
        this.flightClass = flightClass;
    }

    @Override
    public String toString() {
        return "Lot do " + destination + " liniami " + airline +
                " (Klasa: " + flightClass + ", Cena: " + String.format("%.2f", price) + " zł)";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Flight flight = (Flight) o;
        return Double.compare(flight.price, price) == 0 && Objects.equals(destination, flight.destination) && Objects.equals(airline, flight.airline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(destination, airline, price);
    }
}