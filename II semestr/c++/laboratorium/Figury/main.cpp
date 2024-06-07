#include <iostream>
#include <vector>
#include "figury.h"

int main()
{
    std::vector<Figura*> v(3);
    v[0] = new Kolo(5);
    v[1] = new Trojkat(2, 3, 4);
    v[2] = new Prostokat(2, 3);

    for (Figura* el : v) {
        std::cout << "Obwód: " << el->obwod() << "\nPole: " << el->pole() << "\n";
    }

    for (Figura* el : v) {
        delete el;
    }

    return 0;
}
