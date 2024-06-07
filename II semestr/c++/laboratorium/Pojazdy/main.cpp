#include "Car.h"
#include <iostream>

int Car::productionCount = 0;

Car::Car(std::string brand, int year) : brand(brand), year(year), VIN(++productionCount) {}

void Car::printInfo() const {
    std::cout << "Brand: " << brand << ", Year: " << year << ", VIN: " << VIN << std::endl;
}

void Car::initProductionCount(int initialValue) {
    productionCount = initialValue;
}
int main(){

    Car::initProductionCount(0);

    Car ford("Ford", 2005);
    Car peugeot("Peugeot", 2015);
    Car mazda("Mazda", 2021);

    std::cout << "Car Information:" << std::endl;
    ford.printInfo();
    peugeot.printInfo();
    mazda.printInfo();

    return 0;
}
