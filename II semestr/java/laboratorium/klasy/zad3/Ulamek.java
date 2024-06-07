package company;

public class Ulamek {
    int licznik;
    int mianownik;

    public Ulamek(int licznik, int mianownik)
    {
        this.licznik = licznik;
        if(mianownik == 0)
        {
            this.mianownik = 1;
        }
        else
        {
            this.mianownik = mianownik;
        }
        shorten();
    }

    public void shorten(){
        int nwd = nwd(licznik, mianownik);
        licznik /= nwd;
        mianownik /= nwd;
    }

    @Override
    public String toString() {
        return licznik + "/" + mianownik;
    }

    public int nwd(int a, int b) {
        while (b != 0) {
            int temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    void suma(Ulamek b)
    {
        this.licznik = this.licznik * b.mianownik + b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    static Ulamek suma2(Ulamek a, Ulamek b)
    {
        int num = a.licznik * b.mianownik + b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new Ulamek(num, denom);
    }

    void odejmowanie(Ulamek b)
    {
        this.licznik = this.licznik * b.mianownik - b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    static Ulamek odejmowanie2(Ulamek a, Ulamek b)
    {
        int num = a.licznik * b.mianownik - b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new Ulamek(num, denom);
    }


}

