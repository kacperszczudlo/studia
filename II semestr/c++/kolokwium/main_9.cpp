#include <iostream>

using namespace std;

class Para {
private:
  int fst;
  int snd;

public:
  Para(int first, int second) : fst(first), snd(second) {}

  Para operator+(Para &other) {
    Para result(0, 0);
    result.fst = this->fst + other.fst;
    result.snd = this->snd + other.snd;
    return result;
  }

  void wypisz() { cout << "Para(" << fst << ", " << snd << ")" << endl; }
};

int main() {
  Para para1(1, 2);
  Para para2(3, 4);

  Para suma = para1 + para2;
  suma.wypisz();

  return 0;
}