#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct Wpis {
    string imie;
    string nazwisko;
    long int telefon;
};

class Baza {
private:
    vector<Wpis> tab;
public:
    void wypisz() {
        for (size_t i = 0; i < tab.size(); ++i) {
            cout << "Imie: " << tab[i].imie << ", Nazwisko: " << tab[i].nazwisko << ", Telefon: " << tab[i].telefon << endl;
        }
    }

    void dodaj(const Wpis &wpis) {
        tab.push_back(wpis);
    }

    void usun(size_t idx) {
        if (idx >= 0 && idx < tab.size()) {
            tab.erase(tab.begin() + idx);
        }
    }
};

int main() {
    Baza b;

    Wpis abonent = {"Piotr", "Pawlik", 123456789L};
    b.dodaj(abonent);

    int operacja = 0;
    do {
        cout << "Co mam zrobic? (1 - wypisanie, 2 - dodawanie, 3 - usuwanie, 0 - koniec)\n";
                cin >> operacja;
        switch (operacja) {
        case 1:
            b.wypisz();
            break;
        case 2: {
            Wpis abonent;
            cout << "Podaj imie, nazwisko i nr telefonu:\n";
                    cin >> abonent.imie >> abonent.nazwisko >> abonent.telefon;
            b.dodaj(abonent);
            break;
        }
        case 3: {
            int idx;
            cout << "Podaj indeks abonenta do usuniecia:\n";
                    cin >> idx;
            b.usun(idx);
            break;
        }
        }
    } while (operacja != 0);

    return 0;
}
