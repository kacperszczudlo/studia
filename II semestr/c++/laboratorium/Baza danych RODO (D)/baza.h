#include <string>
#include <vector>
#ifndef BAZA_H
#define BAZA_H
 
class Wpis
{
    protected:
        std::string imie;
        std::string nazwisko;
        int wiek;
    public:
        Wpis(const std::string &firstname, const std::string &surname, const int &age);
        void printout();
};

class WpisRODO: private Wpis
{
    public:
        using Wpis::Wpis;
    protected:
        using Wpis::imie;
        using Wpis::wiek;
};

class WpisPrac: public WpisRODO
{
    protected:
        std::string stanowisko;
    
    public:
        WpisPrac(const std::string &firstname, const std::string &surname, const int &age, const std::string position);
        void printout();
};
#endif // BAZA_H