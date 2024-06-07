#ifndef CAR_H
#define CAR_H

#include <string>

class Car {
private:
    std::string brand;
    int year;
    const int VIN;
    static int productionCount;

public:
    Car(std::string brand, int year);
    void printInfo() const;
    static void initProductionCount(int initialValue);
};

#endif // CAR_H
