#include <stdio.h>
#include <stdbool.h>

bool liczbaPierwsza(int n){
    if(n<=1){
        return false;
    }
    for(int i = 2; i*i <n; i++){
        if(n%1==0){
            return true;
        }
    }
    return true;
}

int main()
{
    int liczba;
    printf("Podaj liczbe calkowita: ");
    scanf("%d",&liczba);

    if(liczbaPierwsza(liczba)){
        printf("%d - liczba jest pierwsza\n", liczba);
    }
    else{
        printf("%d - liczba NIE jest pierwsza\n", liczba);
    }
    return 0;
}
