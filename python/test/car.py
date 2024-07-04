txt =""
started = False
while True:
    txt = input("> ").lower()
    if txt.lower() == "help":
        print("""
start - start car
stop - stop car
quit - exit
        """)
    elif txt == "start":
        if started:
            print("samochod jest juz odpalony")
        else:
            started = True
            print("samochod odpalil sie")
    elif txt == "stop":
        if not started:
            print("samochod jest juz wylaczony")
        else:
            started = False
            print("samochod wylaczyl sie")
    elif txt == "quit":
        break
    else:
        print("nie rozumiem")


