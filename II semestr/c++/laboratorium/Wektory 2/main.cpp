#include <iostream>
#include <vector>
#include <cmath>

using namespace std;

void wypiszWektor(const vector<double>& wektor) {
    cout << "{";
    for (const auto& elem : wektor) {
        cout << elem;
        if (&elem != &wektor.back()) cout << ", ";
    }
    cout << "}" << endl;
}

double iloczynSkalarny(const vector<double>& wektor1, const vector<double>& wektor2) {
    double produkt = 0.0;
    auto it1 = wektor1.begin();
    auto it2 = wektor2.begin();
    for (; it1 != wektor1.end(); ++it1, ++it2) {
        produkt += (*it1) * (*it2);
    }
    return produkt;
}

vector<double> sumaWektorow(const vector<double>& wektor1, const vector<double>& wektor2) {
    vector<double> wynik;
    for (size_t i = 0; i < wektor1.size(); ++i) {
        wynik.push_back(wektor1[i] + wektor2[i]);
    }
    return wynik;
}

void normalizujWektor(vector<double>& wektor) {
    double sumaKwadratow = 0.0;
    for (const auto& elem : wektor) {
        sumaKwadratow += elem * elem;
    }
    double dlugosc = sqrt(sumaKwadratow);
    for (auto& elem : wektor) {
        elem /= dlugosc;
    }
}

int main() {
    vector<double> wektor1 = {1.0, 2.0, 3.0, 4.0, 5.0};
    cout << "Wektor 1 przed normalizacja: ";
    wypiszWektor(wektor1);
    normalizujWektor(wektor1);
    cout << "Wektor 1 po normalizacji: ";
    wypiszWektor(wektor1);

    vector<double> wektor2 = {6.0, 7.0, 8.0, 9.0, 10.0};
    cout << "Iloczyn skalarny wektorow 1 i 2: " << iloczynSkalarny(wektor1, wektor2) << endl;
    auto suma12 = sumaWektorow(wektor1, wektor2);
    cout << "Suma wektorow 1 i 2: ";
    wypiszWektor(suma12);

    return 0;
}
