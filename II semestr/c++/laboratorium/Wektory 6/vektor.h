#ifndef VECTOR_H
#define VECTOR_H

#include <iostream>
#include <string>
#include <cmath>
#include <sstream>
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
    Wektor(const initializer_list<double>& init_list);
    ~Wektor();

    double get_elem(size_t idx) const;
    void set_elem(double val, size_t idx);
    double& operator[](size_t idx);
    const double& operator[](size_t idx) const;
    
    Wektor operator+(const Wektor& other) const;
    double operator*(const Wektor& other) const;
    Wektor& operator=(const Wektor& other);
    
    Wektor& operator++();
    Wektor& operator--();
    
    Wektor operator++(int);
    Wektor operator--(int);
    
    size_t size() const;
    double* begin() const;
    double* end() const;

    double norm() const;
    string to_string() const;

    friend istream& operator>>(istream& is, Wektor& wektor);
    friend ostream& operator<<(ostream& os, const Wektor& wektor);
};

void wypiszWektor(const Wektor& wektor);

#endif
