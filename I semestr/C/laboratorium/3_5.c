#include <stdio.h>


int main()
{
    unsigned char image[4][16] = {{21,33,22,33,55,75,24,63,75,12,54,21,64,36,123,243},
                                  {37,33,127,5,55,45,24,63,75,31,127,21,64,36,55,34},
                                  {87,237,76,5,66,155,24,33,75,31,64,121,64,136,55,134},
                                  {25,33,127,5,55,45,24,63,55,45,24,63,75,31,127,224}};
    int histogram[256] = {0};

    for(int i=0;i<4;i++){
        for(int j=0;j<16;j++){
            histogram[image[i][j]]++;
        }
    }
    printf("Histogram w formie tekstowej: ");
    for(int i=0; i<256; i++){
        printf("%d ", i);
        for(int j=0; j<histogram[i];j++){
            printf("#");
        }
        printf("\n");
    }
    return 0;
}
