#include "vector.h"
#include <iostream>

using namespace std;

int main() {
    try {
        size_t rozmiar;
        cout << "Podaj rozmiar wektora: ";
        cin >> rozmiar;

        Vector v(rozmiar);

        cout << "Wprowadzony wektor: " << v.to_string() << endl;
        v.wypisz();
    } catch (const invalid_argument& e) {
        cerr << "Blad: " << e.what() << endl;
    }
    return 0;
}
