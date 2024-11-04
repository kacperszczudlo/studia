from time import perf_counter

def time_decorator(func):
    def wrapper(*args, **kwargs):
        start = perf_counter()
        result = func(*args, **kwargs)
        end = perf_counter()
        print(f"Czas wykonania {func.__name__}: {end - start:.4f} sekundy")
        return result
    return wrapper

@time_decorator
def find_primes_basic(n):
    primes = []
    for num in range(2, n + 1):
        is_prime = True
        for i in range(2, int(num**0.5) + 1):
            if num % i == 0:
                is_prime = False
                break
        if is_prime:
            primes.append(num)
    return primes

@time_decorator
def find_primes_sieve(n):
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    for i in range(2, int(n**0.5) + 1):
        if sieve[i]:
            for j in range(i * i, n + 1, i):
                sieve[j] = False
    primes = [i for i, is_prime in enumerate(sieve) if is_prime]
    return primes

def main():
    n = 100000
    print("Wynik dla algorytmu podstawowego:")
    primes_basic = find_primes_basic(n)
    print(f"Liczba liczb pierwszych znalezionych: {len(primes_basic)}")
    
    print("\nWynik dla algorytmu Sita Eratostenesa:")
    primes_sieve = find_primes_sieve(n)
    print(f"Liczba liczb pierwszych znalezionych: {len(primes_sieve)}")

main()
