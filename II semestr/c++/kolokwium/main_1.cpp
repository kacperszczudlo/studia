#include <iostream>

using namespace std;
class Punkt {
private:
  double x, y, z;

public:
  Punkt(double x, double y, double z) : x(x), y(y), z(z) {}
  Punkt(double x, double y) : Punkt(x, y, 0.0) {}

  void wypisz() {
    cout << "Wspolrzedne punktu: (" << x << ", " << y << ", " << z << ")"
         << endl;
  }
};

int main() {
  Punkt punkt3D(1.0, 2.0, 3.0);
  Punkt punkt2D(4.0, 5.0);

  punkt3D.wypisz();
  punkt2D.wypisz();

  return 0;
}