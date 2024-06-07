#include "vektor.h"
#include <iostream>
#include <vector>
#include <chrono>
 
using namespace std;
 
void bubbleSort(Wektor& wektor) {
    size_t n = wektor.size();
    for (size_t i = 0; i < n - 1; ++i) {
        for (size_t j = 0; j < n - i - 1; ++j) {
            if (wektor.get_elem(j) > wektor.get_elem(j + 1)) {
                double temp = wektor.get_elem(j);
                wektor.set_elem(wektor.get_elem(j + 1), j);
                wektor.set_elem(temp, j + 1);
            }
        }
    }
}
 
void bubbleSort(vector<Wektor>& wektory) {
    size_t n = wektory.size();
    for (size_t i = 0; i < n - 1; ++i) {
        for (size_t j = 0; j < n - i - 1; ++j) {
            if (wektory[j] > wektory[j + 1]) {
                swap(wektory[j], wektory[j + 1]);
            }
        }
    }
}
 
int main() {
    Wektor wektor1 = {5.0, 3.0, 2.0, 4.0, 1.0};
    cout << "Wektor przed sortowaniem: " << wektor1 << endl;
    bubbleSort(wektor1);
    cout << "Wektor po sortowaniu: " << wektor1 << endl;
 
    vector<Wektor> wektory = {
        {5.0, 3.0, 2.0, 4.0, 1.0},
        {3.0, 2.0, 4.0, 1.0, 5.0},
        {1.0, 5.0, 3.0, 2.0, 4.0}
    };
 
    cout << "Wektory przed sortowaniem: " << endl;
    for (const auto& wektor : wektory) {
        cout << wektor << endl;
    }
 
    bubbleSort(wektory);
 
    cout << "Wektory po sortowaniu: " << endl;
    for (const auto& wektor : wektory) {
        cout << wektor << endl;
    }
 
    vector<Wektor> duze_wektory;
    for (int i = 10000; i > 0; --i) {
        Wektor w = {static_cast<double>(i)};
        duze_wektory.push_back(w);
    }
 
    auto start = chrono::high_resolution_clock::now();
    bubbleSort(duze_wektory);
    auto stop = chrono::high_resolution_clock::now();
    auto duration = chrono::duration_cast<chrono::milliseconds>(stop - start);
    cout << "Czas sortowania duzych wektorow: " << duration.count() << " ms" << endl;
 
    return 0;
}