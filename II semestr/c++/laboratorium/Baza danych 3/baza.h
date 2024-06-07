#ifndef BAZA_H
#define BAZA_H

#include <string>
#include <vector>
#include <functional>

using namespace std;

struct Wpis {
    string imie;
    string nazwisko;
    long int telefon;
};

class Baza {
private:
    vector<Wpis> tab;
public:
    void dodaj(Wpis wpis);
    vector<Wpis*> znajdzOsoby(const string& wartosc, string Wpis::* pole); 
};

#endif /* BAZA_H */
