#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> tab{1, 2, 3, 4, 5};
  for (const auto &el : tab) {
    cout << el << ' ';
  }
  return 0;
}