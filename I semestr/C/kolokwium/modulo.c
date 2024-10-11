    #include <stdio.h>

    int main()
    {
        int size;
        printf("Podaj wysokosc: ");
        scanf("%d", &size);

        for(int i=1; i<=size; i++){
                if(i%2==0){
                    printf("><>");
                }else{
                    printf("<><");
            }
            printf("\n");
        }
        return 0;
    }
