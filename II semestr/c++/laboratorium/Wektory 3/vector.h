#ifndef WEKTOR_H
#define WEKTOR_H

#include <string>
#include <cmath>
#include <sstream>

using namespace std;

class Wektor {
public:
    double* wektor;
    size_t rozmiar;

    double get_elem(size_t idx) const;
    void set_elem(double val, size_t idx);
    size_t size() const;

    double* begin() const { return wektor; }
    double* end() const { return wektor + rozmiar; }

    double norm() const;
    string to_string() const;

};

#endif
