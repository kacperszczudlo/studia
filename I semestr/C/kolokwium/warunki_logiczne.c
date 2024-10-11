#include <stdio.h>
#include <stdbool.h>

bool result(int liczba){
    if(liczba%2 == 0 && liczba%5 != 0){
        return true;
    }
    else{
        return false;
    }

}
int main()
{
    int liczba;
    printf("Podaj liczbe: ");
    scanf("%d", &liczba);
    if(result(liczba)){
        printf("True");
    }
    else{
        printf("False");
    }

    return 0;
}
