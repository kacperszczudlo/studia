#include <iostream>
#include <string>
#include <vector>
#include "baza.h"

int main()
{

    WpisPrac pracownik("Marek", "Sojka", 32, "wykladowca");
    //pracownik.Wpis::printout();
    std::cout << std::endl;
    pracownik.WpisPrac::printout();
    std::cout << std::endl;

    return 0;
}