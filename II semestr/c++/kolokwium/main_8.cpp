#include <iostream>
#include <vector>

using namespace std;

int maximum(const vector<int> &x) {
  int najwieksza = x[0];
  for (size_t i = 1; i < x.size(); i++) {
    if (x[i] > najwieksza) {
      najwieksza = x[i];
    }
  }
  return najwieksza;
}

int main() {
  vector<int> numbers = {3, 7, 2, 9, 5};

  int max_value = maximum(numbers);

  cout << max_value << endl;

  return 0;
}