#include <iostream>

using namespace std;

void inc(int &a, int b) { 
  a += b; 
}

int main() {
  int x = 5;
  inc(x, 3);
  cout << x;

  return 0;
}