#include <iostream>
#include <vector>

using namespace std;

enum class Scale { C, F, K };
 
class Temperature {
private:
    double kelvinTemp;
    static Scale inputScale;
    static Scale displayScale;
 
public:
    Temperature(double temp) {
        if (inputScale == Scale::C) {
            kelvinTemp = temp + 273.15;
        } else if (inputScale == Scale::F) {
            kelvinTemp = (temp + 459.67) * 5 / 9;
        } else {
            kelvinTemp = temp;
        }
    }
 
    operator double() const {
        if (displayScale == Scale::C) {
            return kelvinTemp - 273.15;
        } else if (displayScale == Scale::F) {
            return kelvinTemp * 9 / 5 - 459.67;
        } else {
            return kelvinTemp;
        }
    }
 
    static void setInputScale(Scale scale) {
        inputScale = scale;
    }
 
    static void setDisplayScale(Scale scale) {
        displayScale = scale;
    }
};
 
Scale Temperature::inputScale = Scale::K;
Scale Temperature::displayScale = Scale::K;
 
int main() {
    Temperature::setInputScale(Scale::C);
 
    std::vector<Temperature> temperatures;
 
    cout << "Podaj 5 temperatur w skali Celsjusza:\n";
    for (int i = 0; i < 5; ++i) {
        double tempC;
        cin >> tempC;
        temperatures.push_back(tempC);
    }
 
    Temperature::setDisplayScale(Scale::F);
 
    cout << "\nTemperatury w skali Fahrenheita:\n";
    for (const auto& temp : temperatures) {
        cout << temp << " ";
    }
    cout << "\n";
 
    double sumF = 0.0;
    for (const auto& temp : temperatures) {
        sumF += temp;
    }
    double avgTempF = sumF / temperatures.size();
    cout << "Średnia temperatura: " << avgTempF << " °F\n";
 
    Temperature::setDisplayScale(Scale::K);
 
    double sumK = 0.0;
    for (const auto& temp : temperatures) {
        sumK += temp;
    }
    double avgTempK = sumK / temperatures.size();
    cout << "Średnia temperatura: " << avgTempK << " K\n";
 
    return 0;
}