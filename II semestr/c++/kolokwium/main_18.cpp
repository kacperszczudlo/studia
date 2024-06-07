#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> tab{1, 2, 3, 4, 5};
  for (size_t i = 0; i < tab.size(); i++) {
    cout << tab[i] << ' ';
  }

  return 0;
}