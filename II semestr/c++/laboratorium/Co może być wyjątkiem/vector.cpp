#include "vector.h"
#include <iostream>

DoZwolnienia::DoZwolnienia() {
    cout << "Utworzony" << endl;
}

DoZwolnienia::~DoZwolnienia() {
    cout << "Zwolniony" << endl;
}

Bazowa::Bazowa(const string& s) : pole(s) {}

Pochodna::Pochodna(const string& s) : Bazowa(s) {}

void funkcja(int x) {
    switch(x) {
        case 1:
            throw x;
        case 2:
            throw static_cast<double>(x);
        case 3:
            throw runtime_error("To jest wyjątkowy wyjątek");
        case 4:
            throw Bazowa("Obiekt bazowy");
        case 5:
            throw Pochodna("Obiekt pochodny");
        default:
            throw invalid_argument("Nieprawidłowy parametr");
    }
}

void zewnętrzna(int x) {
    DoZwolnienia obj;
    funkcja(x);
}
