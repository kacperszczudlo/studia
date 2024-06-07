#ifndef VECTOR_H
#define VECTOR_H

#include <iostream>
#include <stdexcept>

class MemoryException : public std::exception {
private:
    const char* message;
    double* memory;

public:
    MemoryException(const char* msg, double* mem) : message(msg), memory(mem) {}

    const char* what() const noexcept override {
        return message;
    }

    double* getMemory() const noexcept {
        return memory;
    }
};

class SimpleVector {
private:
    double* elements;
    size_t size;

public:
    SimpleVector(size_t elementsCount);
    ~SimpleVector();
    void print() const;
};

#endif
