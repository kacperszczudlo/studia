#include <stdio.h>
#include <stdbool.h>
#define N 50

enum rok_studiow {
    PIERWSZY,
    DRUGI,
    TRZECI,
    CZWARTY,
    PIATY
};

typedef struct {
    char nazwa_kierunku[N];
    enum rok_studiow rok;
    char wydzial[N];
} kierunek_studiow;

typedef struct {
    char imie[N];
    char nazwisko[N];
    int wiek;
    kierunek_studiow kierunek;
    bool czy_studiuje;
} student;

int main() {
    student studenci[3] = {
        {"Kacper", "Szczudlo", 20, {"Informatyka", PIERWSZY, "Politechniczny"}, true},
        {"Norbert", "Armatys", 20, {"Informatyka", PIERWSZY, "Politechniczny"}, false},
        {"Mariusz", "Pudzianowski", 20, {"Informatyka", PIATY, "Politechniczny"}, false}
    };

    for (int i = 0; i < 3; i++) {
        printf("Student: %d\nImie: %s\nNazwisko: %s\nWiek: %d\nKierunek Studiow: %s\nRok Studiow: %d\nWydzial: %s\nCzy studiuje: %s\n\n",
               i + 1, studenci[i].imie, studenci[i].nazwisko, studenci[i].wiek, studenci[i].kierunek.nazwa_kierunku, studenci[i].kierunek.rok + 1,
               studenci[i].kierunek.wydzial, studenci[i].czy_studiuje ? "tak" : "nie");
    }

    return 0;
}
