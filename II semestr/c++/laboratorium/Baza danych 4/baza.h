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
 
class WpisPrac: virtual public Wpis
{
    protected:
        std::string stanowisko;
 
    public:
        WpisPrac(const std::string &firstname, const std::string &surname, const int &age, const std::string position);
        void printout();
};
 
class WpisZam: virtual public Wpis
{
    protected:
        std::string miasto;
    public:
        WpisZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &city);
        void printout();
};
 
class WpisPracZam: public WpisPrac, public WpisZam
{
    public:
        WpisPracZam(const std::string &firstname, const std::string &surname, const int &age, const std::string &position, const std::string &city);
        void printout();
};
 
/*
class Baza
{
    private:
        std::vector <Wpis> tab;
 
    public:
        void printout();
        void add(const Wpis &abonent);
        void usun(int index);
        std::vector<Wpis> searchBySurname(const std::string &searchedString, std::string Wpis::* searchedField);
};
*/
#endif