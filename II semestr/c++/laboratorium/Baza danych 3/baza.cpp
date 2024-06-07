#include "baza.h"
#include <iostream>

using namespace std;

void Baza::dodaj(Wpis wpis) {
    tab.push_back(wpis);
}

vector<Wpis*> Baza::znajdzOsoby(const string& wartosc, string Wpis::* pole) {
    vector<Wpis*> znalezioneOsoby;
    for (auto it = tab.begin(); it != tab.end(); ++it) {
        if ((*it).*pole == wartosc) {
            znalezioneOsoby.push_back(&(*it));
        }
    }
    return znalezioneOsoby;
}

