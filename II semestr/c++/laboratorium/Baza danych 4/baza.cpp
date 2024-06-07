#include <string>
#include <vector>
#include <iostream>
#include "baza.h"
 
Wpis::Wpis(const std::string &firstname, const std::string &surname, const int &age): imie(firstname), nazwisko(surname), wiek(age) {}

void Wpis::printout()
{
    std::cout << imie << " " << nazwisko << ", " << wiek;
}
 
WpisPrac::WpisPrac(const std::string &firstname, const std::string &surname, const int &age, const std::string position): Wpis::Wpis(firstname, surname, age), stanowisko(position) {}

void WpisPrac::printout()
{
    std::cout << imie << " " << nazwisko << ", " << wiek << ", " << stanowisko;
}
 
WpisZam::WpisZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &city): Wpis::Wpis(firstname, surname, age), miasto(city) {}

void WpisZam::printout()
{
    std::cout << imie << " " << nazwisko << ", " << wiek << ", " << miasto;
}
 
WpisPracZam::WpisPracZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &position, const std::string &city): Wpis::Wpis(firstname, surname, age), WpisPrac::WpisPrac(firstname, surname, age, position), WpisZam::WpisZam(firstname, surname, age, city) {}

void WpisPracZam::printout()
{
    WpisPrac::printout();
    std::cout << ", " << miasto;
}

/*
void Baza::add(const Wpis &abonent)
{
    tab.push_back(abonent);
}
 
void Baza::usun(int index)
{
    tab.erase(tab.begin()+index);
}
 
void Baza::printout()
{
    for(const auto &el: tab)
    {
        std::cout << "Imie i nazwisko: " << el.imie << " " << el.nazwisko << ", wiek: " << el.wiek << std::endl;
    }
}
 
std::vector<Wpis> Baza::searchBySurname(const std::string &searchedString, std::string Wpis::* searchedField)
{
    std::vector<Wpis> temp;
    for(auto &el : tab)
    {
        if(searchedString == el.*searchedField)
        {
            temp.push_back(el);
        }
    }
    return temp;
}
 
*/