#include <iostream>
#include <vector>

using namespace std;

int suma(const vector<int> &arr) {
  int sum = 0;
  for (int num : arr) {
    sum += num;
  }
  return sum;
}

int main() {
  vector<int> numbers = {1, 2, 3, 4, 5};

  int result = suma(numbers);

  cout << result << endl;

  return 0;
}