class MyRange:
    def __init__(self, *args):
        if len(args) == 1:
            self.start, self.end, self.step = 0.0, args[0], 1.0
        elif len(args) == 2:
            self.start, self.end, self.step = args[0], args[1], 1.0
        elif len(args) == 3:
            self.start, self.end, self.step = args
        else:
            raise ValueError("Invalid number of arguments")

        if self.step == 0.0:
            raise ValueError("Step cannot be zero")

        self.current = self.start

    def __iter__(self):
        return self

    def __next__(self):
        if (self.current < self.end and self.step > 0) or (self.current > self.end and self.step < 0):
            result = round(self.current, 10)
            self.current += self.step
            return result
        else:
            raise StopIteration


def main():
    test_cases = [
        (1.1, 2.2, 0.5),
        (1.1, 2.1, 0.5),
        (1.1, 2.2),
        (2.2,),
        (2.2, 0.1, -0.5),
        (1, 2, 3, 4),
        (1.0, 2.0, 0.0)
    ]

    for args in test_cases:
        try:
            print(f"MyRange{args}:")
            for value in MyRange(*args):
                print(value)
        except ValueError as e:
            print(e)


main()
