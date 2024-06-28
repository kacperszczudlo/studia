#include "vektor.h"
#include <iostream>

using namespace std;

template<typename T>
T iloczynSkalarny(const Wektor<T>& wektor1, const Wektor<T>& wektor2) {
    T produkt = 0;
    for (size_t i = 0; i < wektor1.size(); ++i) {
        produkt += wektor1.get_elem(i) * wektor2.get_elem(i);
    }
    return produkt;
}

template<typename T>
Wektor<T> sumaWektorow(const Wektor<T>& wektor1, const Wektor<T>& wektor2) {
    size_t maxSize = max(wektor1.size(), wektor2.size());
    Wektor<T> wynik(maxSize);
    for (size_t i = 0; i < maxSize; ++i) {
        T val1 = (i < wektor1.size()) ? wektor1.get_elem(i) : T();
        T val2 = (i < wektor2.size()) ? wektor2.get_elem(i) : T();
        wynik.set_elem(val1 + val2, i);
    }
    return wynik;
}

int main() {
   // wektory double
    Wektor<double> wektor1 = {1.0, 2.0, 3.0, 4.0, 5.0};
    Wektor<double> wektor2 = {6.0, 7.0, 8.0, 9.0, 10.0};
    Wektor<double> wektor3;

    cout << "Double vectory:" << endl;

    cout << "Iloczyn skalarny wektorow 1 i 2: " << iloczynSkalarny(wektor1, wektor2) << endl;

    Wektor<double> suma12 = sumaWektorow(wektor1, wektor2);
    cout << "Suma wektorow 1 i 2: " << suma12 << endl;

    cout << "Wprowadz 5 elementow do wektora 3: ";
    for (int i = 0; i < 5; ++i) {
        cin >> wektor3;
    }
    cout << "Wektor 3: " << wektor3 << endl;

    Wektor<double> wektor4;
    wektor4 = wektor3;
    wektor4.set_elem(99.9, 0);
    cout << "Wektor 4: " << wektor4 << endl;
    cout << "Wektor 3: " << wektor3 << endl;

    wektor3 = wektor3;
    cout << "Wektor 3: " << wektor3 << endl;

    cout << "Iloczyn skalarny wektorow 1 i 2: " << (wektor1 * wektor2) << endl;

    Wektor<double> suma12_operator = wektor1 + wektor2;
    cout << "Suma wektorow 1 i 2: " << suma12_operator << endl << endl;

    cout << "Prefix" << endl;

    cout << "Wektor 1 przed zwiększeniem: " << ++wektor1 << endl;
    cout << "Wektor 1 po zwiększeniu: " << wektor1 << endl;

    cout << "Wektor 2 przed zmniejszeniem: " << --wektor2 << endl;
    cout << "Wektor 2 po zmniejszeniu: " << wektor2 << endl << endl;

    cout << "Postfix" << endl;

    cout << "Wektor 1 przed zwiększeniem: " << wektor1++ << endl;
    cout << "Wektor 1 po zwiększeniu: " << wektor1 << endl;

    cout << "Wektor 2 przed zmniejszeniem: " << wektor2-- << endl;
    cout << "Wektor 2 po zmniejszeniu: " << wektor2 << endl;

    //Wektory int
    Wektor<int> int_wektor1 = {1, 2, 3, 4, 5};
    Wektor<int> int_wektor2 = {6, 7, 8, 9, 10};
    Wektor<int> int_wektor3;

    cout << "\nInteger vectors:" << endl;

    cout << "Iloczyn skalarny wektorow 1 i 2: " << iloczynSkalarny(int_wektor1, int_wektor2) << endl;

    Wektor<int> int_suma12 = sumaWektorow(int_wektor1, int_wektor2);
    cout << "Suma wektorow 1 i 2: " << int_suma12 << endl;

    cout << "Wprowadz 5 elementow do wektora 3: ";
    for (int i = 0; i < 5; ++i) {
        cin >> int_wektor3;
    }
    cout << "Wektor 3: " << int_wektor3 << endl;

    Wektor<int> int_wektor4;
    int_wektor4 = int_wektor3;
    int_wektor4.set_elem(99, 0);
    cout << "Wektor 4: " << int_wektor4 << endl;
    cout << "Wektor 3: " << int_wektor3 << endl;

    int_wektor3 = int_wektor3;
    cout << "Wektor 3: " << int_wektor3 << endl;

    cout << "Iloczyn skalarny wektorow 1 i 2: " << (int_wektor1 * int_wektor2) << endl;

    Wektor<int> int_suma12_operator = int_wektor1 + int_wektor2;
    cout << "Suma wektorow 1 i 2: " << int_suma12_operator << endl << endl;

    cout << "Prefix" << endl;

    cout << "Wektor 1 przed zwiększeniem: " << ++int_wektor1 << endl;
    cout << "Wektor 1 po zwiększeniu: " << int_wektor1 << endl;

    cout << "Wektor 2 przed zmniejszeniem: " << --int_wektor2 << endl;
    cout << "Wektor 2 po zmniejszeniu: " << int_wektor2 << endl << endl;

    cout << "Postfix" << endl;

    cout << "Wektor 1 przed zwiększeniem: " << int_wektor1++ << endl;
    cout << "Wektor 1 po zwiększeniu: " << int_wektor1 << endl;

    cout << "Wektor 2 przed zmniejszeniem: " << int_wektor2-- << endl;
    cout << "Wektor 2 po zmniejszeniu: " << int_wektor2 << endl;

    return 0;
}
