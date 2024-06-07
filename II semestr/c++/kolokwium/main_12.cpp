#include <iostream>
#include <vector>

using namespace std;

int minimum(const vector<int> &x) {
  int najmniejsza = x[0];
  for (size_t i = 1; i < x.size(); i++) {
    if (x[i] < najmniejsza) {
      najmniejsza = x[i];
    }
  }
  return najmniejsza;
}

int main() {
  vector<int> numbers = {3, 7, 2, 9, 5};

  int min_value = minimum(numbers);

  cout << min_value << endl;

  return 0;
}