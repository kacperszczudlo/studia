#include "vector.h"

SimpleVector::SimpleVector(size_t elementsCount) : size(elementsCount) {
    elements = new double[size];
    std::cout << "Podaj " << size << " elementow:" << std::endl;
    for (size_t i = 0; i < size; ++i) {
        std::cin >> elements[i];
        if (std::cin.fail()) {
            delete[] elements;
            throw MemoryException("Nalezy podac liczbe rzeczywista.", elements);
        }
    }
}

SimpleVector::~SimpleVector() {
    delete[] elements;
    std::cout << "Zwolniono" << std::endl;
}

void SimpleVector::print() const {
    for (size_t i = 0; i < size; ++i) {
        std::cout << elements[i] << " ";
    }
    std::cout << std::endl;
}
