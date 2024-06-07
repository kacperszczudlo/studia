#include <iostream>

using namespace std;

class Punkt {
public:
  double x_, y_, z_;
  Punkt() : x_(0), y_(0), z_(0) {}
  Punkt(double x, double y, double z) : x_(x), y_(y), z_(z) {}
};

int main() {
  Punkt punkt;
  cout << punkt.x_ << " " << punkt.y_ << " " << punkt.z_ << " " << endl;
  Punkt punkt1(1, 2, 3);
  cout << punkt1.x_ << " " << punkt1.y_ << " " << punkt1.z_ << " " << endl;

  return 0;
}