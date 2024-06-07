#include "figury.h"
#include <cmath>

double Kolo::obwod() {
    return 2 * 3.14 * this->promien_;
}

double Kolo::pole() {
    return 3.14 * this->promien_ * this->promien_;
}

double Trojkat::obwod() {
    return this->bok_a_ + this->bok_b_ + this->bok_c_;
}

double Trojkat::pole() {
    double p = (this->bok_a_ + this->bok_b_ + this->bok_c_) / 2;
    return std::sqrt(p * (p - this->bok_a_) * (p - this->bok_b_) * (p - this->bok_c_));
}

double Prostokat::obwod() {
    return 2 * (this->bok_a_ + this->bok_b_);
}

double Prostokat::pole() {
    return this->bok_a_ * this->bok_b_;
}
