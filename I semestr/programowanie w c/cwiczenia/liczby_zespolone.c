#include <stdio.h>
#include <math.h>
#define N 5
typedef struct{
    float Re;
    float Im;
}zespolona;
float modul(zespolona x){
    return sqrt(x.Re * x.Re + x.Im * x.Im);
}
float re(zespolona x){
    return x.Re;
}
float im(zespolona x){
    return x.Im;
}
zespolona dodaj(zespolona x, zespolona y){
    zespolona dodawanie;
    dodawanie.Re = x.Re + y.Re;
    dodawanie.Im = x.Im+y.Im;
    return dodawanie;
}
zespolona odejmij(zespolona x, zespolona y){
    zespolona odejmowanie;
    odejmowanie.Re = x.Re - y.Re;
    odejmowanie.Im = x.Im- y.Im;
    return odejmowanie;
}
zespolona pomnoz(zespolona x, zespolona y){
    zespolona mnozenie;
    float rz,urojona,kwadrat;
    rz = x.Re * y.Re;
    urojona = x.Re * y.Im + x.Im * y.Re;
    kwadrat = (x.Im * y.Im)*(-1);
    mnozenie.Re = rz + kwadrat;
    mnozenie.Im = urojona;
    return mnozenie;

}
float minmodul(zespolona x[]){
    float najmniejsza = modul(x[0]);
    float zmienna;
    for(int i = 1;i<N;i++){
        zmienna = modul(x[i]);
        if(zmienna < najmniejsza){
            najmniejsza = zmienna;
        }
    }
    return najmniejsza;
}
void tablicamodulow(zespolona x[],float *y){
    for(int i=0;i<N;i++){
        float liczba = modul(x[i]);
        y[i] = liczba;
    }
}
void kopiowanie(zespolona *x,zespolona *y){
    for(int i = 0;i<N;i++){
        y[i].Re = x[i].Re;
        y[i].Im = x[i].Im;
    }
}
int main()
{
    zespolona a;
    zespolona b;
    a.Re = 3;
    a.Im = 4;
    b.Re = 5;
    b.Im = 6;
    float modula = modul(a);
    printf("%f\n",modula);
    printf("czesc rzeczywista: %f \n",re(a));
    printf("czesc urojona: %f \n",im(a));
    zespolona dodana = dodaj(a,b);
    zespolona odjeta = odejmij(a,b);
    printf("DODAWANIE - czesc rzeczywista: %f czesc urojona %f\n",dodana.Re,dodana.Im);
    printf("ODEJMOWANIE - czesc rzeczywista: %f czesc urojona %f\n",odjeta.Re,odjeta.Im);
    zespolona pomnozona = pomnoz(a,b);
    printf("MNOZENIE - czesc rzeczywista: %f czesc urojona %f\n",pomnozona.Re,pomnozona.Im);
    zespolona tab[N] = {{1,2},{3,4},{5,6},{7,8},{1,1}};
    float tab2[N] = {};
    zespolona tab3[N] = {};
    float najmniejsza = minmodul(tab);
    printf("Najmniejszy modul z tablicy: %f \n",najmniejsza);
    tablicamodulow(tab,tab2);
    printf("Moduły liczb w tabeli: ");
    for(int i=0;i<N;i++){
        printf("%f ",tab2[i]);
    }
    printf("\n");
    kopiowanie(tab,tab3);
    printf("Skopiowana tablica: ");
    for(int i = 0;i<N;i++){
        printf("liczba pod indeksem %d - czesc rzeczywista: %f czesc urojona %f\n",i,tab3[i].Re,tab3[i].Im);
    }
    return 0;
}
