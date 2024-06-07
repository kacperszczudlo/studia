#include <iostream>
#include "vector.h"

using namespace std;

int main() {
    vector<int> wektor {1, 2, 3, 4, 5, 6};
    
    for (int x : wektor) {
        try {
            zewnętrzna(x);
        } catch(const Pochodna& e) {
            cout << "Obsługa obiektu Pochodnego: " << e.pole << endl;
        } catch(const Bazowa& e) {
            cout << "Obsługa obiektu Bazowego: " << e.pole << endl;
        } catch(const int& e) {
            cout << "Wyjątek int: " << e << endl;
        } catch(const double& e) {
            cout << "Wyjątek double: " << e << endl;
        } catch(const string& e) {
            cout << "Wyjątek string: " << e << endl;
        } catch(const exception& e) {
            cout << "Wyjątek ogólny: " << e.what() << endl;
        }
    }

    return 0;
}
