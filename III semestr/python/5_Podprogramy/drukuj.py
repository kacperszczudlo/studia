#ukończono

import sys

def drukuj(*args, sep=" ", end="\n"):
    result = ""
    for arg in args:
        result += str(arg) + sep
    result = result[:-len(sep)]
    sys.stdout.write(result + end)

def main():
    drukuj(192, 168, 0, 1, sep=":")

    temperatura = 36.6
    drukuj("Temperatura wynosi", temperatura, "stopni")

    for _ in range(10):
        drukuj("*", end="")

main()
