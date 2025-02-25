import time

def fibonacci(n):

    if n <= 0:
        return None
    if n == 1 or n == 2:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

def fibonacci_tail(n, a=1, b=1):
    if n <= 0:
        return None
    if n == 1:
        return a
    if n == 2:
        return b
    return fibonacci_tail(n - 1, b, a + b)

def main():

    n = 40

    start_time = time.time()
    print(f"F({n}) = {fibonacci(n)}")
    end_time = time.time()
    print(f"Czas obliczeń (rekurencyjna): {end_time - start_time} sekund")

    start_time = time.time()
    print(f"F({n}) = {fibonacci_tail(n)}")
    end_time = time.time()
    print(f"Czas obliczeń (rekurencyjna ogonowa): {end_time - start_time} sekund")

main()
