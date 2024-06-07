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

double& Wektor::operator[](size_t idx) {
    if (idx < rozmiar) {
        return wektor[idx];
    }
    return wektor[0];
}

const double& Wektor::operator[](size_t idx) const {
    if (idx < rozmiar) {
        return wektor[idx];
    }
    return wektor[0];
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

double iloczynSkalarny(const Wektor& wektor1, const Wektor& wektor2) {
    double produkt = 0.0;
    size_t min_size = min(wektor1.size(), wektor2.size());
    for (size_t i = 0; i < min_size; ++i) {
        produkt += wektor1[i] * wektor2[i];
    }
    return produkt;
}

Wektor sumaWektorow(const Wektor& wektor1, const Wektor& wektor2) {
    size_t min_size = min(wektor1.size(), wektor2.size());
    Wektor wynik(min_size);
    for (size_t i = 0; i < min_size; ++i) {
        wynik[i] = wektor1[i] + wektor2[i];
    }
    return wynik;
}

string Wektor::to_string() const {
    ostringstream oss;
    for (size_t i = 0; i < rozmiar; ++i) {
        oss << wektor[i] << " ";
    }
    return oss.str();
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

Wektor Wektor::operator+(const Wektor& other) const {
    size_t min_size = min(rozmiar, other.rozmiar);
    Wektor result(min_size);
    for (size_t i = 0; i < min_size; ++i) {
        result[i] = wektor[i] + other.wektor[i];
    }
    return result;
}

double Wektor::operator*(const Wektor& other) const {
    double dotProduct = 0.0;
    size_t min_size = min(rozmiar, other.rozmiar);
    for (size_t i = 0; i < min_size; ++i) {
        dotProduct += wektor[i] * other.wektor[i];
    }
    return dotProduct;
}

Wektor& Wektor::operator++() {
    for (size_t i = 0; i < rozmiar; ++i) {
        ++wektor[i];
    }
    return *this;
}

Wektor& Wektor::operator--() {
    for (size_t i = 0; i < rozmiar; ++i) {
        --wektor[i];
    }
    return *this;
}

Wektor Wektor::operator++(int) {
    Wektor temp(*this);
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]++;
    }
    return temp;
}

Wektor Wektor::operator--(int) {
    Wektor temp(*this);
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]--;
    }
    return temp;
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
