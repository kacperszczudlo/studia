#include <cmath>
#include <iostream>
#include <stdexcept>

using namespace std;

int licz_miejsca(float a, float b, float c, float &miejsce1, float &miejsce2) {
    if (a == 0) {
        if (b != 0) {
            throw domain_error("Podano równanie liniowe.");
        } else {
            throw domain_error("Podano funkcję stałą.");
        }
    }

    float delta = b * b - 4 * a * c;
    if (delta > 0) {
        miejsce1 = (-b + sqrt(delta)) / (2 * a);
        miejsce2 = (-b - sqrt(delta)) / (2 * a);
        return 2;
    } else if (delta == 0) {
        miejsce1 = -b / (2 * a);
        return 1;
    } else {
        return 0;
    }
}

int main() {
    float a, b, c, miejsce1, miejsce2;
    cout << "Podaj a, b, c: " << endl;
    cin >> a >> b >> c;

    try {
        int znalezione_miejsca = licz_miejsca(a, b, c, miejsce1, miejsce2);

        switch (znalezione_miejsca) {
        case 2:
            cout << "Znaleziono 2 miejsca zerowe: " << miejsce1 << ", " << miejsce2 << endl;
            break;
        case 1:
            cout << "Znaleziono 1 miejsce zerowe: " << miejsce1 << endl;
            break;
        case 0:
            cout << "Nie znaleziono miejsc zerowych" << endl;
            break;
        }
    } catch (const domain_error &e) {
        cout << e.what() << endl;
    }

    return 0;
}