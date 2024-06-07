#include "vector.h"
#include <iostream>

using namespace std;

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

void wypiszWektor(const Wektor& wektor) {
    for (double elem : wektor) {
        cout << elem << " ";
    }
    cout << endl;
}

int main() {
    double arr[] = { 1.0, 2.0, 3.0, 4.0, 5.0 };
    Wektor w {arr, 5};
    w.set_elem(7.5, 2);

    cout << "Zmodyfikowany wektor: ";
    cout << w.to_string() << endl;

    cout << "Rozmiar wektora: " << w.size() << endl;
    cout << "Norma wektora: " << w.norm() << endl;

    return 0;
}
