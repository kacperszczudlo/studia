#include <stdio.h>
void mirror(char *p){
    char *p2=p;
    int i=0;
    for(i=0; *p!='\0';i++){
        p++;
    }
    p--;
    char tmp;
    for(int x=0; x<i/2;x++){
        tmp=*p2;
        *p2=*p;
        *p=tmp;
        *p--;
        *p2++;
    }

}
int main()
{
    char tekst[100]="Ala ma kota";
    mirror(tekst);
    puts(tekst);

    return 0;
}
