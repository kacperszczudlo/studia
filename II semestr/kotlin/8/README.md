# Dokumentacja Techniczna

## Opis Klasy `Triangle`

Klasa `Triangle` reprezentuje trójkąt o bokach a, b i c. Zawiera metody do obliczania pola oraz obwodu trójkąta.

### Konstruktor
- `a`, `b`, `c`: Parametry typu `Double` reprezentujące długości boków trójkąta.

### Metoda `pole()`
```kotlin
fun pole(): Double {
    val p = (a + b + c) / 2
    return sqrt(p * (p - a) * (p - b) * (p - c))
}
```
Metoda pole() oblicza pole trójkąta za pomocą wzoru Herona, gdzie p to połowa obwodu.

### Metoda `obwod()`
```kotlin
Copy code
fun obwod(): Double {
    return a + b + c
}
```
Metoda obwod() oblicza obwód trójkąta sumując długości wszystkich jego boków.

## Opis Klasy `Circle`
Klasa Circle reprezentuje koło o zadanym promieniu. Zawiera metody do obliczania pola oraz obwodu koła.

### Konstruktor
- `radius`: Parametr typu Double reprezentujący promień koła.
- `pi`: Parametr typu Double reprezentujący wartość liczby pi.
### Metoda `pole()`
```kotlin
Copy code
fun pole(): Double {
    return pi * (radius * radius)
}
```
Metoda pole() oblicza pole koła używając wzoru π * r^2.

### Metoda `obwod()`
```kotlin
Copy code
fun obwod(): Double {
    return 2 * pi * radius
}
```
Metoda obwod() oblicza obwód koła używając wzoru 2 * π * r.
