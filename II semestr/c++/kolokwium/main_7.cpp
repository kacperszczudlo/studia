#include <iostream>
using namespace std;

#include <vector>

int main() {
  vector<int> tab(5);

  for (auto &el : tab) {
    el = 1;
  }

  for (const auto &el : tab) {
    cout << el << " ";
  }

  cout << endl;

  return 0;
}