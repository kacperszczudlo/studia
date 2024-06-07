#include <iostream>

#define NAME_SIZE 20
#define SIZE 10

using namespace std;

struct Wpis {
    char imie[NAME_SIZE];
    char nazwisko[NAME_SIZE];
    long int telefon;
};

struct Baza {
    int act_size;
    int max_size;
    Wpis *tab;
};

void wypisz(Baza b) {
    for (int i = 0; i < b.act_size; ++i) {
        cout << "Imię: " << b.tab[i].imie << ", Nazwisko: " << b.tab[i].nazwisko << ", Telefon: " << b.tab[i].telefon << endl;
    }
}

int dodaj(Baza *baza, Wpis *w) {
    if (baza->act_size < baza->max_size) {
        baza->tab[baza->act_size++] = *w;
        return 0;
    } else {
        int new_max_size = baza->max_size + 10;
        Wpis *new_tab = new Wpis[new_max_size];

        if (new_tab == nullptr) {
            return -1;
        } else {
            for (int i = 0; i < baza->act_size; ++i) {
                new_tab[i] = baza->tab[i];
            }

            delete[] baza->tab;
            baza->tab = new_tab;
            baza->max_size = new_max_size;
            baza->tab[baza->act_size++] = *w;
            return 0;
        }
    }
}

void usun(Baza *adr_bazy, int idx) {
    if (idx >= 0 && idx < adr_bazy->act_size) {
        for (int i = idx; i < adr_bazy->act_size - 1; ++i) {
            adr_bazy->tab[i] = adr_bazy->tab[i + 1];
        }
        adr_bazy->act_size--;
    }
}

int main() {
    Baza b;
    b.max_size = SIZE;
    b.act_size = 0;
    b.tab = new Wpis[b.max_size];

    Wpis abonent={"Piotr", "Pawlik", 123456789L};
    b.tab[0]=abonent;
    b.act_size++;

    int operacja = 0;
    do {
        cout << "Co mam zrobić? (1 - wypisanie, 2 - dodawanie, 3 - usuwanie, 0 - koniec)\n";
                cin >> operacja;
        switch (operacja) {
        case 1:
            wypisz(b);
            break;
        case 2: {
            Wpis abonent;
            cout << "Podaj imię, nazwisko i nr telefonu:\n";
                    cin >> abonent.imie >> abonent.nazwisko >> abonent.telefon;
            if (dodaj(&b, &abonent) == -1)
                cout << "Abonent nie został dodany\n";
                    break;
        }
        case 3: {
            int idx;
            cout << "Podaj indeks abonenta do usunięcia:\n";
                    cin >> idx;
            usun(&b, idx);
            break;
        }
        }
    } while (operacja != 0);

    delete[] b.tab;

    return 0;
}
