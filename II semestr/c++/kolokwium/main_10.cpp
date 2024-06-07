#include <iostream>

using namespace std;

class Tablica {
  int *tab;
  int size;

public:
  Tablica(const initializer_list<int> &lista) {
    tab = new int[lista.size()];
    size = lista.size();
    int i = 0;
    for (auto el : lista)
      tab[i++] = el;
  }

  Tablica(const Tablica &other) {
    size = other.size;
    tab = new int[size];
    for (int i = 0; i < size; i++) {
      tab[i] = other.tab[i];
    }
  }

  void printTabElements() {
    for (int i = 0; i < size; i++) {
      cout << tab[i] << " ";
    }
    cout << endl;
  }
};

int main() {
  Tablica t = {1, 2, 3, 4, 5};

  t.printTabElements();

  return 0;
}