#include <iostream>
#include <stdexcept>

template <typename T, int N>
class Stack {
private:
    T elements[N];
    int top;

public:
    Stack() : top(-1) {}

    void push(const T& element) {
        if (top >= N - 1) {
            throw std::domain_error("Przepelnienie stosu");
        }
        elements[++top] = element;
    }

    T pop() {
        if (top < 0) {
            throw std::domain_error("Stos jest pusty");
        }
        return elements[top--];
    }

    bool empty() const {
        return top == -1;
    }
};

int main() {
    try {
        Stack<int, 10> intStos;
        for (int i = 1; i <= 10; ++i) {
            intStos.push(i);
        }
        std::cout << "Pobrane elementy z intStos: ";
        while (!intStos.empty()) {
            std::cout << intStos.pop() << " ";
        }
        std::cout << std::endl;

        Stack<char, 5> charStos;
        std::string input = "Ala ma kota";
        for (char c : input) {
            charStos.push(c);
        }
    } catch (const std::domain_error& e) {
        std::cerr << "Wyjatek: "<< e.what() << std::endl;
    }

    try {
        Stack<char, 5> charStos;
        std::string input = "Ala ma kota";
        for (char c : input) {
            try {
                charStos.push(c);
            } catch (const std::domain_error& e) {
                std::cerr << "Wyjatek: " << e.what() << std::endl;
                break;
            }
        }

        std::cout << "Pobrane element ze stosu: ";
        while (!charStos.empty()) {
            std::cout << charStos.pop() << " ";
        }
        std::cout << std::endl;
    } catch (const std::domain_error& e) {
        std::cerr << "Wyjatek: " << e.what() << std::endl;
    }

    return 0;
}
