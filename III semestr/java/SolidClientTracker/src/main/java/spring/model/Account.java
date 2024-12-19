package spring.model;

public class Account {
    private int id;
    private double balance;
    private String date;

    public Account(int id, double balance, String date) {
        this.id = id;
        this.balance = balance;
        this.date = date;
    }

    public int getId() {
        return id;
    }

    public double getBalance() {
        return balance;
    }

    public String getDate() {
        return date;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", balance=" + balance +
                ", date='" + date + '\'' +
                '}';
    }
}
