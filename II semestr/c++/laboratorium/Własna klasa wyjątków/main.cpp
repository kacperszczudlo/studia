#include "vector.h"

int main() {
    try {
        size_t size;
        std::cout << "Podaj rozmiar wektora: ";
        std::cin >> size;

        SimpleVector vector(size);

        std::cout << "Wprowadzony wektor: ";
        vector.print();
    } catch (const MemoryException& e) {
        std::cerr << "Blad: " << e.what() << std::endl;
        delete[] e.getMemory();
    }

    return 0;
}
