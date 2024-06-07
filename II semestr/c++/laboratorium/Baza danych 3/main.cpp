#include "baza.h"
#include <iostream>

using namespace std;

int main() {
    Baza b;

    b.dodaj(Wpis {"Piotr", "Pawlik", 123456789L});
    b.dodaj(Wpis {"Anna", "Kowalska", 987654321L});
    b.dodaj(Wpis {"Piotr", "Nowak", 111222333L});
    b.dodaj(Wpis {"Jan", "Nowak", 555666777L});

    string nazwisko = "Nowak";
    cout << "PO NAZWISKU \"" << nazwisko << "\":" << endl;

    string Wpis::* wsk_nazwisko = &Wpis::nazwisko;  // wskaźnik na pole nazwisko
    vector<Wpis*> znalezioneOsobyPoNazwisku = b.znajdzOsoby(nazwisko, wsk_nazwisko);

    if (!znalezioneOsobyPoNazwisku.empty()) {
        cout << "Znaleziono osoby o podanym nazwisku: " << endl;
        for (const auto& osoba : znalezioneOsobyPoNazwisku) {
            cout << "Imie: " << osoba->imie << ", Nazwisko: " << osoba->nazwisko << ", Telefon: " << osoba->telefon << endl;
        }
    } else {
        cout << "Nie znaleziono osób o podanym nazwisku." << endl;
    }

    string imie = "Piotr";
    cout << "\nPO IMIENIU \"" << imie << "\":" << endl;

    string Wpis::* wsk_imie = &Wpis::imie;
    vector<Wpis*> znalezioneOsobyPoImieniu = b.znajdzOsoby(imie, wsk_imie);

    if (!znalezioneOsobyPoImieniu.empty()) {
        cout << "Znaleziono osoby o podanym imieniu: " << endl;
        for (const auto& osoba : znalezioneOsobyPoImieniu) {
            cout << "Imie: " << osoba->imie << ", Nazwisko: " << osoba->nazwisko << ", Telefon: " << osoba->telefon << endl;
        }
    } else {
        cout << "Nie znaleziono osób o podanym imieniu." << endl;
    }

    return 0;
}
