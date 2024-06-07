#ifndef WEKTOR_H
#define WEKTOR_H

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
    size_t size() const;
    double* begin() const;
    double* end() const;

    double norm() const;
    string to_string() const;
};

void wypiszWektor(const Wektor& wektor) {
    for (double elem : wektor) {
        cout << elem << " ";
    }
    cout << std::endl;
}

Wektor::Wektor(const double arr[], size_t size) : rozmiar(size) {
    wektor = new double[size];
    for (size_t i = 0; i < size; ++i) {
        wektor[i] = arr[i];
    }
}

Wektor::Wektor(size_t size, double default_value) : rozmiar(size) {
    if (size > 0) {
        wektor = new double[size];
        for (size_t i = 0; i < size; ++i) {
            wektor[i] = default_value;
        }
    } else {
        wektor = nullptr;
    }
}

Wektor::Wektor(const Wektor& other) : Wektor(other.wektor, other.rozmiar) {}

Wektor::Wektor(const initializer_list<double>& init_list) : rozmiar(init_list.size()) {
    wektor = new double[rozmiar];
    size_t i = 0;
    for (double elem : init_list) {
        wektor[i++] = elem;
    }
}

Wektor::~Wektor() {
    delete[] wektor;
}

double Wektor::get_elem(size_t idx) const {
    if (idx < rozmiar) {
        return wektor[idx];
    }
    return 0.0;
}

void Wektor::set_elem(double val, size_t idx) {
    if (idx < rozmiar) {
        wektor[idx] = val;
    }
}

size_t Wektor::size() const {
    return rozmiar;
}

double* Wektor::begin() const {
    return wektor;
}

double* Wektor::end() const {
    return wektor + rozmiar;
}

double Wektor::norm() const {
    double sum = 0.0;
    for (size_t i = 0; i < rozmiar; ++i) {
        sum += wektor[i] * wektor[i];
    }
    return sqrt(sum);
}

string Wektor::to_string() const {
    ostringstream oss;
    for (size_t i = 0; i < rozmiar; ++i) {
        oss << wektor[i] << " ";
    }
    return oss.str();
}

#endif
