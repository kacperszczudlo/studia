#include <iostream>
using namespace std;

class MojaKlasa {
private:
  static int licznik_obiektów;

public:
  MojaKlasa() { licznik_obiektów++; }

  static int ile_obiektów() { return licznik_obiektów; }
};

int MojaKlasa::licznik_obiektów = 0;

int main() {
  MojaKlasa obj1;
  MojaKlasa obj2;
  MojaKlasa obj3;

  cout << "Liczba obiektów: " << MojaKlasa::ile_obiektów() << endl;

  return 0;
}