#include "vector.h"

SecondVector::SecondVector(size_t rozmiar) : rozmiar(rozmiar) {
    if (rozmiar > 0) {
        wektor = new double[rozmiar];
    } else {
        wektor = nullptr;
    }
}

SecondVector::~SecondVector() {
    delete[] wektor;
    std::cout << "Zwolniono" << std::endl;
}

Vector::Vector(size_t rozmiar) : second_vector(rozmiar) {
    std::cout << "Podaj " << rozmiar << " elementow:" << std::endl;
    for (size_t i = 0; i < second_vector.rozmiar; ++i) {
        std::cin >> second_vector.wektor[i];
        if (std::cin.fail()) {
            std::cin.clear();
            std::cin.ignore(std::numeric_limits<std::streamsize>::max(), '\n');
            throw std::invalid_argument("Nalezy podac liczbe rzeczywista.");
        }
    }
}

std::string Vector::to_string() const {
    std::ostringstream oss;
    for (size_t i = 0; i < second_vector.rozmiar; ++i) {
        oss << second_vector.wektor[i] << " ";
    }
    return oss.str();
}

void Vector::wypisz() const {
    for (size_t i = 0; i < second_vector.rozmiar; ++i) {
        std::cout << second_vector.wektor[i] << " ";
    }
    std::cout << std::endl;
}