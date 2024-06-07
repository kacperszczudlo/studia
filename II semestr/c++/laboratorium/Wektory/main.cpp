#include <iostream>
#define N 5

using namespace std;

typedef struct {
    float x, y, z;
} vec;

void wypisz(float *v, int rozmiar) {
    cout << "[";
    for (int i = 0; i < rozmiar; ++i) {
        cout << v[i];
        if (i != rozmiar - 1)
            cout << ", ";
    }
    cout << "]" << endl;
}

void wypisz(vec *v) {
    cout << "[" << v->x << ", " << v->y << ", " << v->z << "]" << endl;
}

float iloczyn_skalarny(float *v1, float *v2, int rozmiar) {
    float result = 0.0;
    for(int i = 0; i < rozmiar; i++) {
        result += v1[i] * v2[i];
    }
    return result;
}

float* suma_wektorow(float *v1, float *v2, int rozmiar) {
    float* suma = new float[rozmiar];
    for(int i = 0; i < rozmiar; i++) {
        suma[i] = v1[i] + v2[i];
    }
    return suma;
}

int main() {
    float *wektor1 = new float[N] {1.0, 2.0, 3.0, 4.0, 5.0};
    float *wektor2 = new float[N] {6.0, 7.0, 8.0, 9.0, 10.0};

    float wektor3[] = {0.0, 2.0, 3.0};
    float wektor4[] = {0.0, 7.0, 0.0};

    cout << "Pierwsza para wektorow:" << endl;
    cout << "Wektor 1: "; wypisz(wektor1, N);
    cout << "Wektor 2: "; wypisz(wektor2, N);
    cout << "Iloczyn skalarny: " << iloczyn_skalarny(wektor1, wektor2, N) << endl;
    float* suma1 = suma_wektorow(wektor1, wektor2, N);
    cout << "Suma wektorow: "; wypisz(suma1, N);
    delete[] suma1;

    cout << "\nDruga para wektorow:" << endl;
    cout << "Wektor 3: "; wypisz(wektor3, 3);
    cout << "Wektor 4: "; wypisz(wektor4, 3);
    cout << "Iloczyn skalarny: " << iloczyn_skalarny(wektor3, wektor4, 3) << endl;
    float* suma2 = suma_wektorow(wektor3, wektor4, 3);
    cout << "Suma wektorow: "; wypisz(suma2, 3);
    delete[] suma2;


    delete[] wektor1;
    delete[] wektor2;

    return 0;
}
