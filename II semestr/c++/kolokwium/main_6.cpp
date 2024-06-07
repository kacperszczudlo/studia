#include <iostream>
using namespace std;

class Para {
private:
  int fst;
  int snd;

public:
  Para(int first, int second) : fst(first), snd(second) {}

  friend ostream &operator<<(ostream &out, const Para &para) {
    cout << para.fst << ' ' << para.snd << endl;
    return out;
  }
};

int main() {
  Para para(1, 2);
  cout << para;

  return 0;
}