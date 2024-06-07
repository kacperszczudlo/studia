#ifndef VECTOR_H
#define VECTOR_H

#include <iostream>
#include <initializer_list>
 
using namespace std;
 
class Wektor {
private:
    double* wektor;
    size_t rozmiar;
 
public:
    Wektor(const double arr[], size_t size);
    Wektor(size_t size = 0, double default_value = 0.0);
    Wektor(const Wektor& other);
    Wektor(Wektor&& other) noexcept;
    Wektor(const initializer_list<double>& init_list);
    ~Wektor();
 
    Wektor& operator=(const Wektor& other);
    Wektor& operator=(Wektor&& other) noexcept;
 
    double get_elem(size_t idx) const;
    void set_elem(double val, size_t idx);
    size_t size() const;
 
    bool operator==(const Wektor& other) const;
    bool operator!=(const Wektor& other) const;
    bool operator<(const Wektor& other) const;
    bool operator>(const Wektor& other) const;
    bool operator<=(const Wektor& other) const;
    bool operator>=(const Wektor& other) const;
 
    friend istream& operator>>(std::istream& is, Wektor& wektor);
    friend ostream& operator<<(std::ostream& os, const Wektor& wektor);
};
 
#endif