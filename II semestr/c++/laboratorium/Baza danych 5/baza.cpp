#include "baza.h"

using namespace std;

Wpis::Wpis(const string &firstname, const string &surname, const int &age) : imie(firstname), nazwisko(surname), wiek(age) {}

void Wpis::printout() const {
    cout << imie << " " << nazwisko << ", " << wiek;
}

WpisPrac::WpisPrac(const string &firstname, const string &surname, const int &age, const string position) : Wpis(firstname, surname, age), stanowisko(position) {}

void WpisPrac::printout() const {
    Wpis::printout();
    cout << ", " << stanowisko;
}

WpisZam::WpisZam(const string &firstname, const string &surname, const int &age, const string &city) : Wpis(firstname, surname, age), miasto(city) {}

void WpisZam::printout() const {
    Wpis::printout();
    cout << ", " << miasto;
}

WpisPracZam::WpisPracZam(const string &firstname, const string &surname, const int &age, const string &position, const string &city) : Wpis(firstname, surname, age), WpisPrac(firstname, surname, age, position), WpisZam(firstname, surname, age, city) {}

void WpisPracZam::printout() const {
    WpisPrac::printout();
    cout << ", " << miasto;
}

void Baza::add(Wpis* abonent) {
    tab.push_back(abonent);
}

void Baza::printout() const {
    for (const auto &el : tab) {
        el->printout();
        cout << endl;
}
}
