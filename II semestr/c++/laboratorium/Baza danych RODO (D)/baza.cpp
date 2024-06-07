#include <string>
#include <vector>
#include <iostream>
#include "baza.h"

Wpis::Wpis(const std::string &firstname, const std::string &surname, const int &age): imie(firstname), nazwisko(surname), wiek(age) {} // Remove the semicolon at the end
void Wpis::printout()
{
    std::cout << imie << " " << "nazwisko" << ", " << wiek;
}

WpisPrac::WpisPrac(const std::string &firstname, const std::string &surname, const int &age, const std::string position): WpisRODO::WpisRODO(firstname, surname, age), stanowisko(position) {} // Remove the semicolon at the end
void WpisPrac::printout()
{
    std::cout << imie << " " << "**********" << ", " << wiek << ", " << stanowisko;
}
