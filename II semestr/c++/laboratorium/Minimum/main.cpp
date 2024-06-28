#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

template <typename T>
T najmniejszy(T a, T b, T c) {
    return min({a, b, c});
}

int main() {
    cout << "Najmniejszy z 1, 2.5, 3 to: " << najmniejszy<double>(1.0, 2.5, 3.0) << endl;
    cout << "Najmniejszy z wyrazow ala / MA / kota to: " << najmniejszy<string>("ala", "MA", "kota") << endl;

    return 0;
}