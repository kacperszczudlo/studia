#ifndef FIGURY_H_DEFINED
#define FIGURY_H_DEFINED

class Figura {
public:
    virtual double obwod() = 0;
    virtual double pole() = 0;
    virtual ~Figura() {}
};

class Kolo : public Figura {
public:
    Kolo(double promien) : promien_(promien) {}
    double obwod();
    double pole();
private:
    double promien_;
};

class Trojkat : public Figura {
public:
    Trojkat(double bok_a, double bok_b, double bok_c) : bok_a_(bok_a), bok_b_(bok_b), bok_c_(bok_c) {}
    double obwod();
    double pole();
private:
    double bok_a_, bok_b_, bok_c_;
};

class Prostokat : public Figura {
public:
    Prostokat(double bok_a, double bok_b) : bok_a_(bok_a), bok_b_(bok_b) {}
    double obwod();
    double pole();
private:
    double bok_a_, bok_b_;
};

#endif // FIGURY_H_DEFINED
