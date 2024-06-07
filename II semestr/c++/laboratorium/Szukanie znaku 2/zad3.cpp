#include <iostream>

using namespace std;

#define MAX_SIZE 100

char& znajdz_znak(string& napis, char szuk_znak) {
    for (char& znak : napis) {
        if (znak == szuk_znak) {
            return znak;
        }
    }
    static char placeholder = 0;
    return placeholder;
}


int main()
{
    string napis;
    char szukany_znak;

    cout << "Podaj napis: " << endl;
    cin >> napis;
    cout << "Podaj znak: " << endl;
    cin >> szukany_znak;

    char& znaleziony = znajdz_znak(napis, szukany_znak);

    if(znaleziony !=0){
        cout << "Znaleziony znak " << znaleziony << endl;
    }
    else{
        cout << "Nie znaleziono podanego znaku" << endl;
    }

    return 0;
}
