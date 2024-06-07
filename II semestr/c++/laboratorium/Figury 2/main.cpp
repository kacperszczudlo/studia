#include <iostream>
#include <vector>
#include <memory>
#include "figury.h"

using namespace std;

int main() {
    vector<unique_ptr<Figura>> v;
    v.push_back(make_unique<Kolo>(5));
    v.push_back(make_unique<Trojkat>(2, 3, 4));
    v.push_back(make_unique<Prostokat>(2, 3));

    for (const auto& el : v) {
        cout << "Obwód: " << el->obwod() << "\nPole: " << el->pole() << "\n";
    }

    return 0;
}
