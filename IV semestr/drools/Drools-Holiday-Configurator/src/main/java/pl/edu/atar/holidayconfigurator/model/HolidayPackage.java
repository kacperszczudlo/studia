package pl.edu.atar.holidayconfigurator.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class HolidayPackage {
    private TravelRequest request;
    private Flight flight;
    private Hotel hotel;
    private List<Activity> activities = new ArrayList<>();
    private double totalPrice = 0.0;
    private double discount = 0.0; // NOWE POLE
    private String status = "IN_PROGRESS";
    private List<String> notes = new ArrayList<>();

    public HolidayPackage() {
    }

    public HolidayPackage(TravelRequest request) {
        this.request = request;
    }

     public void recalculateTotalPrice() {
        double total = 0.0;
        if (flight != null) {
            total += flight.getPrice();
        }
        if (hotel != null && request != null) {
            total += hotel.getTotalPrice(request.getDurationDays());
        }
        if (activities != null) {
            total += activities.stream().mapToDouble(Activity::getPrice).sum();
        }

        total -= this.discount;
        this.totalPrice = total;
    }

    public void addNote(String note) {
        this.notes.add(note);
    }


    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public TravelRequest getRequest() {
        return request;
    }

    public void setRequest(TravelRequest request) {
        this.request = request;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public List<Activity> getActivities() {
        return activities;
    }

    public void setActivities(List<Activity> activities) {
        this.activities = activities;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getNotes() {
        return notes;
    }

    public void setNotes(List<String> notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        String flightInfo = flight != null ? flight.toString() : "Brak";
        String hotelInfo = hotel != null ? hotel.toString() : "Brak";
        String activitiesInfo = !activities.isEmpty() ? activities.stream().map(Activity::getName).collect(Collectors.joining(", ")) : "Brak";
        String discountInfo = discount > 0 ? "\n  - Zniżka: -" + String.format("%.2f", discount) + " zł" : "";

        return "HolidayPackage (" + status + "):\n" +
                discountInfo +
                "\n  - Cena Całkowita: " + String.format("%.2f", totalPrice) + " zł\n" +
                "  - Lot: " + flightInfo + "\n" +
                "  - Hotel: " + hotelInfo + "\n" +
                "  - Atrakcje: " + activitiesInfo + "\n" +
                "  - Notatki: " + notes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        HolidayPackage that = (HolidayPackage) o;
        return Objects.equals(request, that.request);
    }

    @Override
    public int hashCode() {
        return Objects.hash(request);
    }
}