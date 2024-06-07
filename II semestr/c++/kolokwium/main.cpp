#include <iostream>
#include <vector>

using namespace std;
int main() {
  vector<int> tab{1, 2, 3, 4, 5};
  for (auto it = tab.begin(); it != tab.end(); ++it) {
    std::cout << *it << ' ';
  }
  return 0;
}