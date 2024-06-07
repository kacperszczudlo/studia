package konsola;

public class RownanieKwadratowe {
    float a,b,c;
    Rozwiazanie roz;

    public RownanieKwadratowe(float a, float b, float c) {
        this.a = a;
        this.b = b;
        this.c = c;
        wyznaczPierwiastki();

    }

    float obliczDelte(){
        return b * b - 4 * a * c;
    }

    void wyznaczPierwiastki(){
        float delta = obliczDelte();
        if (obliczDelte() < 0){
            roz = new Rozwiazanie(null,null);
        }
        else if(obliczDelte() == 0){
            float x = -b /(2*a);
            roz = new Rozwiazanie(x,null);
        }
        else{
            float x1 = (float) ((-b + Math.sqrt(delta)) / (2 * a));
            float x2 = (float) ((-b - Math.sqrt(delta)) / (2 * a));
            roz = new Rozwiazanie(x1, x2);
        }
    }

}