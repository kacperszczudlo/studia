#ifndef BAZA_H
#define BAZA_H

#include <vector>
#include <iostream>

class Wpis {
protected:
    std::string imie;
    std::string nazwisko;
    int wiek;

public:
    Wpis(const std::string &firstname, const std::string &surname, const int &age);
    virtual void printout() const;
};

class WpisPrac : virtual public Wpis {
protected:
    std::string stanowisko;

public:
    WpisPrac(const std::string &firstname, const std::string &surname, const int &age, const std::string position);
    void printout() const override;
};

class WpisZam : virtual public Wpis {
protected:
    std::string miasto;

public:
    WpisZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &city);
    void printout() const override;
};

class WpisPracZam : public WpisPrac, public WpisZam {
public:
    WpisPracZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &position, const std::string &city);
    void printout() const override;
};

class Baza {
private:
    std::vector<Wpis*> tab;

public:
    void printout() const;
    void add(Wpis* abonent);
};

#endif