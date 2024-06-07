#include "vektor.h"
#include <iostream>

using namespace std;

double iloczynSkalarny(const Wektor& wektor1, const Wektor& wektor2);
Wektor sumaWektorow(const Wektor& wektor1, const Wektor& wektor2);

int main() {
    Wektor wektor1 = {1.0, 2.0, 3.0, 4.0, 5.0};
    Wektor wektor2 = {6.0, 7.0, 8.0, 9.0, 10.0};
/*
    Wektor wektor3;
    cout << "Iloczyn skalarny wektorow 1 i 2: " << iloczynSkalarny(wektor1, wektor2) << endl;
    
    cout << "Wektor 1: " << wektor1 << endl;
    cout << "Wektor 2: " << wektor2 << endl;

    Wektor suma12 = sumaWektorow(wektor1, wektor2); 
    cout << "Suma wektorow 1 i 2: " << suma12 << endl;

    cout << "Wprowadz 5 elementow do wektora 3: ";
    for (int i = 0; i < 5; ++i) {
        cin >> wektor3;
    }
    cout << "Wektor 3: " << wektor3 << endl;


    Wektor wektor4;
    wektor4 = wektor3;
    wektor4.set_elem(99.9, 0);
    cout << "Wektor 4: " << wektor4 << endl;
    cout << "Wektor 3: " << wektor3 << endl;

    wektor3 = wektor3;
    cout << "Wektor 3: " << wektor3 << endl;
*/
    cout << "Iloczyn skalarny wektorow 1 i 2: " << (wektor1 * wektor2) << endl;

    Wektor suma12_operator = wektor1 + wektor2;
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
    
    return 0;
}
