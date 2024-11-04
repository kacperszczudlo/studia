#ukończono

def my_range(*args):
    if len(args) == 1:
        start, end, step = 0.0, args[0], 1.0
    elif len(args) == 2:
        start, end, step = args[0], args[1], 1.0
    elif len(args) == 3:
        start, end, step = args
    else:
        return None
    
    if step == 0.0:
        return None
    
    result = []
    current = start
    while (current < end and step > 0) or (current > end and step < 0):
        result.append(round(current, 10))
        current += step
    return result

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
        result = my_range(*args)
        if result is None:
            print(f"my_range{args} zwróciło None")
        else:
            for value in result:
                print(value)

main()
