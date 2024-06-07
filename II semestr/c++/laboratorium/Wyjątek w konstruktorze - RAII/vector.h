#ifndef VECTOR_H
#define VECTOR_H

#include <iostream>
#include <sstream>
#include <limits>
#include <stdexcept>

class SecondVector {
public:
    double* wektor;
    size_t rozmiar;

    SecondVector(size_t rozmiar);
    ~SecondVector();
};

class Vector {
private:
    SecondVector second_vector;

public:
    Vector(size_t rozmiar);
    std::string to_string() const;
    void wypisz() const;
};

#endif