#include "vektor.h"

using namespace std;
 
Wektor::Wektor(const double arr[], size_t size) : rozmiar(size) {
    wektor = new double[rozmiar];
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
 
Wektor::Wektor(const Wektor& other) : rozmiar(other.rozmiar) {
    wektor = new double[rozmiar];
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i] = other.wektor[i];
    }
}
 
Wektor::Wektor(Wektor&& other) noexcept : wektor(other.wektor), rozmiar(other.rozmiar) {
    other.wektor = nullptr;
    other.rozmiar = 0;
}
 
Wektor::Wektor(const std::initializer_list<double>& init_list) : rozmiar(init_list.size()) {
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
 
Wektor& Wektor::operator=(const Wektor& other) {
    if (this != &other) {
        delete[] wektor;
        rozmiar = other.rozmiar;
        wektor = new double[rozmiar];
        for (size_t i = 0; i < rozmiar; ++i) {
            wektor[i] = other.wektor[i];
        }
    }
    return *this;
}
 
Wektor& Wektor::operator=(Wektor&& other) noexcept {
    if (this != &other) {
        delete[] wektor;
        wektor = other.wektor;
        rozmiar = other.rozmiar;
        other.wektor = nullptr;
        other.rozmiar = 0;
    }
    return *this;
}
 
bool Wektor::operator==(const Wektor& other) const {
    if (rozmiar != other.rozmiar) return false;
    for (size_t i = 0; i < rozmiar; ++i) {
        if (wektor[i] != other.wektor[i]) return false;
    }
    return true;
}
 
bool Wektor::operator!=(const Wektor& other) const {
    return !(*this == other);
}
 
bool Wektor::operator<(const Wektor& other) const {
    size_t min_size = min(rozmiar, other.rozmiar);
    for (size_t i = 0; i < min_size; ++i) {
        if (wektor[i] < other.wektor[i]) return true;
        if (wektor[i] > other.wektor[i]) return false;
    }
    return rozmiar < other.rozmiar;
}
 
bool Wektor::operator>(const Wektor& other) const {
    return other < *this;
}
 
bool Wektor::operator<=(const Wektor& other) const {
    return !(other < *this);
}
 
bool Wektor::operator>=(const Wektor& other) const {
    return !(*this < other);
}
 
ostream& operator<<(std::ostream& os, const Wektor& wektor) {
    for (size_t i = 0; i < wektor.rozmiar; ++i) {
        os << wektor.wektor[i] << " ";
    }
    return os;
}
 
istream& operator>>(std::istream& is, Wektor& wektor) {
    double nowa_wartosc;
    is >> nowa_wartosc;
 
    double* nowy_wektor = new double[wektor.rozmiar + 1];
    for (size_t i = 0; i < wektor.rozmiar; ++i) {
        nowy_wektor[i] = wektor.wektor[i];
    }
    nowy_wektor[wektor.rozmiar] = nowa_wartosc;
    delete[] wektor.wektor;
    wektor.wektor = nowy_wektor;
    wektor.rozmiar++;
 
    return is;
}