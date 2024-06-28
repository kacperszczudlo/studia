#ifndef VECTOR_H
#define VECTOR_H

#include <iostream>
#include <string>
#include <cmath>
#include <sstream>
#include <initializer_list>

using namespace std;

template<typename T>
class Wektor {
private:
    T* wektor;
    size_t rozmiar;

public:
    Wektor(const T arr[], size_t size);
    Wektor(size_t size = 0, T default_value = T());
    Wektor(const Wektor& other);
    Wektor(const initializer_list<T>& init_list);
    ~Wektor();

    T get_elem(size_t idx) const;
    void set_elem(T val, size_t idx);
    T& operator[](size_t idx);
    const T& operator[](size_t idx) const;

    Wektor operator+(const Wektor& other) const;
    T operator*(const Wektor& other) const;
    Wektor& operator=(const Wektor& other);

    Wektor& operator++();
    Wektor& operator--();

    Wektor operator++(int);
    Wektor operator--(int);

    size_t size() const;
    T* begin() const;
    T* end() const;

    double norm() const;
    string to_string() const;

    template<typename U>
    friend istream& operator>>(istream& is, Wektor<U>& wektor);
    template<typename U>
    friend ostream& operator<<(ostream& os, const Wektor<U>& wektor);
};

template<typename T>
Wektor<T>::Wektor(const T arr[], size_t size) : rozmiar(size) {
    wektor = new T[rozmiar];
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i] = arr[i];
    }
}

template<typename T>
Wektor<T>::Wektor(size_t size, T default_value) : rozmiar(size) {
    wektor = new T[rozmiar];
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i] = default_value;
    }
}

template<typename T>
Wektor<T>::Wektor(const Wektor& other) : rozmiar(other.rozmiar) {
    wektor = new T[rozmiar];
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i] = other.wektor[i];
    }
}

template<typename T>
Wektor<T>::Wektor(const initializer_list<T>& init_list) : Wektor(init_list.size()) {
    copy(init_list.begin(), init_list.end(), wektor);
}

template<typename T>
Wektor<T>::~Wektor() {
    delete[] wektor;
}

template<typename T>
T Wektor<T>::get_elem(size_t idx) const {
    return wektor[idx];
}

template<typename T>
void Wektor<T>::set_elem(T val, size_t idx) {
    wektor[idx] = val;
}

template<typename T>
T& Wektor<T>::operator[](size_t idx) {
    return wektor[idx];
}

template<typename T>
const T& Wektor<T>::operator[](size_t idx) const {
    return wektor[idx];
}

template<typename T>
Wektor<T> Wektor<T>::operator+(const Wektor& other) const {
    size_t maxSize = max(rozmiar, other.rozmiar);
    Wektor result(maxSize);

    for (size_t i = 0; i < maxSize; ++i) {
        T val1 = (i < rozmiar) ? wektor[i] : T();
        T val2 = (i < other.rozmiar) ? other.wektor[i] : T();
        result.wektor[i] = val1 + val2;
    }
    return result;
}

template<typename T>
T Wektor<T>::operator*(const Wektor& other) const {
    T result = T();
    for (size_t i = 0; i < min(rozmiar, other.rozmiar); ++i) {
        result += wektor[i] * other.wektor[i];
    }
    return result;
}

template<typename T>
Wektor<T>& Wektor<T>::operator=(const Wektor& other) {
    if (this != &other) {
        delete[] wektor;

        rozmiar = other.rozmiar;
        wektor = new T[rozmiar];
        for (size_t i = 0; i < rozmiar; ++i) {
            wektor[i] = other.wektor[i];
        }
    }
    return *this;
}

template<typename T>
Wektor<T>& Wektor<T>::operator++() {
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]++;
    }
    return *this;
}

template<typename T>
Wektor<T>& Wektor<T>::operator--() {
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]--;
    }
    return *this;
}

template<typename T>
Wektor<T> Wektor<T>::operator++(int) {
    Wektor temp(*this);
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]++;
    }
    return temp;
}

template<typename T>
Wektor<T> Wektor<T>::operator--(int) {
    Wektor temp(*this);
    for (size_t i = 0; i < rozmiar; ++i) {
        wektor[i]--;
    }
    return temp;
}

template<typename T>
size_t Wektor<T>::size() const {
    return rozmiar;
}

template<typename T>
T* Wektor<T>::begin() const {
    return wektor;
}

template<typename T>
T* Wektor<T>::end() const {
    return wektor + rozmiar;
}

template<typename T>
double Wektor<T>::norm() const {
    double sum = 0.0;
    for (size_t i = 0; i < rozmiar; ++i) {
        sum += wektor[i] * wektor[i];
    }
    return std::sqrt(sum);
}

template<typename T>
string Wektor<T>::to_string() const {
    ostringstream oss;
    for (size_t i = 0; i < rozmiar; ++i) {
        oss << wektor[i] << " ";
    }
    return oss.str();
}

template<typename T>
istream& operator>>(istream& is, Wektor<T>& wektor) {
    T nowa_wartosc;
    is >> nowa_wartosc;

    T* nowy_wektor = new T[wektor.rozmiar + 1];
    for (size_t i = 0; i < wektor.rozmiar; ++i) {
        nowy_wektor[i] = wektor.wektor[i];
    }
    nowy_wektor[wektor.rozmiar] = nowa_wartosc;
    delete[] wektor.wektor;
    wektor.wektor = nowy_wektor;
    wektor.rozmiar++;

    return is;
}

template<typename T>
ostream& operator<<(ostream& os, const Wektor<T>& wektor) {
    for (size_t i = 0; i < wektor.rozmiar; ++i) {
        os << wektor.wektor[i] << " ";
    }
    return os;
}

#endif
