#ukończono

def my_range(*args):
    if len(args) < 1 or len(args) > 3:
        return []
    
    start, end, step = 0.0, 0.0, 1.0

    if len(args) == 1:
        end = args[0]
    elif len(args) == 2:
        start, end = args
    elif len(args) == 3:
        start, end, step = args
    
    if step == 0.0:
        return []

    result = []
    current = start
    while (step > 0 and current < end) or (step < 0 and current > end):
        result.append(round(current, 10))
        current += step
    return result

def main():
    print(my_range(1.1, 2.2, 0.5))
    print(my_range(1.1, 2.1, 0.5))
    print(my_range(1.1, 2.2))
    print(my_range(2.2))
    print(my_range(2.2, 0.1, -0.5))
    print(my_range(1.1, 2.2, 0))
    print(my_range(1.1, 2.2, 0.5, 2.0))

main()
