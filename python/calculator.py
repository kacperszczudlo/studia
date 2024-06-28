def dodawanie(x, y):
    return x + y

def odejmowanie(x, y):
    return x - y

def mnozenie(x, y):
    return x * y

def dzielenie(x, y):
    return x / y

while True:
    operation = input("Podaj znak (+, -, *, /) lub wpisz 'q' aby wyjść: ")

    if operation == 'q':
        print("Kalkulator zamyka się.")
        break

    if operation not in ['+', '-', '*', '/']:
        print("Niepoprawny operator! Spróbuj ponownie.")
        continue

    try:
        num1 = float(input("Podaj pierwszą liczbę: "))
        num2 = float(input("Podaj drugą liczbę: "))
    except ValueError:
        print("Błąd! Podane wartości nie są liczbami. Spróbuj ponownie.")
        continue

    if operation == '+':
        wynik = dodawanie(num1, num2)
    elif operation == '-':
        wynik = odejmowanie(num1, num2)
    elif operation == '*':
        wynik = mnozenie(num1, num2)
    elif operation == '/':
        if num2 == 0:
            print("Błąd! Nie można dzielić przez zero.")
            continue
        wynik = dzielenie(num1, num2)

    print(f"Wynik: {wynik}")