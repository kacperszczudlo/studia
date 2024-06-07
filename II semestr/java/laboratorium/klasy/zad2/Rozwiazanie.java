package konsola;
import java.io.*;
public class Rozwiazanie {
    Float x1 = null;
    Float x2 = null;

    public Rozwiazanie(Float x1, Float x2) {
        this.x1 = x1;
        this.x2 = x2;
    }
    String wypisz(){
        if(this.x1 == null) return "Brak rozwiazan";
        else if (this.x2 == null) return "Jedno rozwiązanie x1= " +this.x1.toString();
        else return "Dwa rozwiązania " +this.x1.toString() +" oraz " +this.x2.toString();
    }
}