#include <iostream>
#include <string>
#include <vector>
#include "baza.h"
 
int main()
{
    /*
    WpisPrac pracownik("Marek", "Sojka", 32, "wykladowca");
    pracownik.Wpis::printout();
    std::cout << std::endl;
    pracownik.WpisPrac::printout();
    std::cout << std::endl;
    */
 
    /*
    WpisZam pracownik("Marek", "Sojka", 32, "Tarnow");
    pracownik.Wpis::printout();
    std::cout << std::endl;
    pracownik.WpisZam::printout();
    std::cout << std::endl;
    */
 
    WpisPracZam pracownik("Marek", "Sojka", 32, "wykladowca", "Tarnow");
    pracownik.WpisPracZam::printout();
    std::cout << std::endl;
    pracownik.WpisPrac::printout();
    std::cout << std::endl;
    pracownik.WpisZam::printout();
    std::cout << std::endl;
    pracownik.Wpis::printout();
    return 0;
}