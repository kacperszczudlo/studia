#include "vector.h"
#include <iostream>

using namespace std;

int main() {
    double arr[] = { 1.0, 2.0, 3.0, 4.0, 5.0 };
    Wektor w1(arr, 5);
    w1.set_elem(7.5, 2);

    cout << "Zmodyfikowany wektor: ";
    cout << w1.to_string() << endl;

    cout << "Rozmiar wektora: " << w1.size() << endl;
    cout << "Norma wektora: " << w1.norm() << endl;

    Wektor w2 {1.5, 2.5, 3.5, 4.5, 5.5};
    cout << "Nowy wektor: ";
    wypiszWektor(w2);

    Wektor w3(w1);
    cout << "Wektor w3: " << w3.to_string() << endl;

    Wektor w4;
    cout << "Pusty wektor w4: " << w4.to_string() << endl;

    return 0;
}
