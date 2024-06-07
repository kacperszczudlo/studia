#include <iostream>
using namespace std;
class Para {
private:
  int fst;
  int snd;

public:
  Para(int first, int second) : fst(first), snd(second) {}

  int &operator[](int index) {
    if (index == 0)
      return fst;
    else if (index == 1)
      return snd;
    else {
      cout << "Nieprawidlowy indeks" << endl;
      exit(1);
    }
  }
};

int main() {
  Para para(1, 2);

  cout << "Para[0] = " << para[0] << endl;
  cout << "Para[1] = " << para[1] << endl;

  return 0;
}