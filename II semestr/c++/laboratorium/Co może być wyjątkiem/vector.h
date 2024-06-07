#ifndef VECTOR_H
#define VECTOR_H

#include <stdexcept>
#include <string>
#include <vector>

using namespace std;

class DoZwolnienia {
public:
    DoZwolnienia();
    ~DoZwolnienia();
};

struct Bazowa {
    string pole;
    Bazowa(const string& s);
};

struct Pochodna : public Bazowa {
    Pochodna(const string& s);
};

void funkcja(int x);
void zewnętrzna(int x);

#endif // VECTOR_H
