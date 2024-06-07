#include <iostream>
#include <vector>

using namespace std;

void rec(double &x) { 
  x = 1 / x; 
}
int main() {
  double x = 2;
  rec(x);
  cout << x;
}