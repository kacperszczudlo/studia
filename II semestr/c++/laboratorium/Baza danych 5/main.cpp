#include <iostream>
#include <memory>
#include "baza.h"

using namespace std;

int main() {

    WpisPrac pracownik("Marek", "Sojka", 32, "wykladowca");
    WpisZam mieszkaniec("Marek", "Sojka", 32, "Tarnow");
    WpisPracZam pracownik_mieszkaniec("Marek", "Sojka", 32, "wykladowca", "Tarnow");

    Baza baza;

    baza.add(&pracownik);
    baza.add(&mieszkaniec);
    baza.add(&pracownik_mieszkaniec);

    baza.printout();

    return 0;
}
