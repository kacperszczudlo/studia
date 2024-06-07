package com.company;

public class ulamek implements Comparable<ulamek>{
    int licznik;
    int mianownik;

    public ulamek(int licznik, int mianownik) throws Exception {
        this.licznik = licznik;
        if(mianownik == 0)
        {
            zeroDenominator ue = new zeroDenominator();
            ue.zero();
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

    void suma(ulamek b)
    {
        this.licznik = this.licznik * b.mianownik + b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    static ulamek suma2(ulamek a, ulamek b) throws Exception {
        int num = a.licznik * b.mianownik + b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new ulamek(num, denom);
    }

    void odejmowanie(ulamek b)
    {
        this.licznik = this.licznik * b.mianownik - b.licznik * this.mianownik;
        this.mianownik *= b.mianownik;
        shorten();
    }

    static ulamek odejmowanie2(ulamek a, ulamek b) throws Exception {
        int num = a.licznik * b.mianownik - b.licznik * a.mianownik;
        int denom = a.mianownik * b.mianownik;
        return new  ulamek(num, denom);
    }


    @Override
    public int compareTo(ulamek u) {
        float thisValue = this.licznik / this.mianownik;
        float uValue = u.licznik / u.mianownik;
        if(thisValue > uValue)
        {
            return 1;
        }
        else if (thisValue < uValue)
        {
            return -1;
        }
        else
        {
            return 0;
        }
    }
}
