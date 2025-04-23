#include <glad/glad.h>
#include <GLFW/glfw3.h>

// W³¹czenie implementacji funkcji ³adowania obrazów z plików (dla stb_image)
#define STB_IMAGE_IMPLEMENTATION
#include <stb_image.h>

#include "shader.h"
#include <iostream>

// Prototypy funkcji pomocniczych
void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow* window);

// Rozdzielczoœæ okna
const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 600;

int main()
{
    // Inicjalizacja biblioteki GLFW i konfiguracja wersji OpenGL
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3); // OpenGL 3.x
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3); // OpenGL x.3
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE); // profil core

    // Tworzenie okna GLFW
    GLFWwindow* window = glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "LearnOpenGL", NULL, NULL);
    if (window == NULL)
    {
        std::cout << "Nie uda³o siê utworzyæ okna GLFW" << std::endl;
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

    // Inicjalizacja GLAD – ³adowanie wskaŸników funkcji OpenGL
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cout << "Nie uda³o siê zainicjalizowaæ GLAD" << std::endl;
        return -1;
    }

    // Za³adowanie i skompilowanie shaderów
    Shader ourShader("p8_1.vs", "p8_1.fs");

    // Definicja wierzcho³ków: pozycja, kolor, wspó³rzêdne tekstury (od 0.0 do 2.0)
    float vertices[] = {
        // pozycja           // kolor            // wspó³rzêdne tekstury
         0.5f,  0.5f, 0.0f,   1.0f, 0.0f, 0.0f,   0.75f, 0.75f, // prawy górny
         0.5f, -0.5f, 0.0f,   0.0f, 1.0f, 0.0f,   0.75f, 0.25f, // prawy dolny
        -0.5f, -0.5f, 0.0f,   0.0f, 0.0f, 1.0f,   0.25f, 0.25f, // lewy dolny
        -0.5f,  0.5f, 0.0f,   1.0f, 1.0f, 0.0f,   0.25f, 0.75f  // lewy górny
    };
    unsigned int indices[] = {
        0, 1, 3, // pierwszy trójk¹t
        1, 2, 3  // drugi trójk¹t
    };

    // Bufory OpenGL
    unsigned int VBO, VAO, EBO;
    glGenVertexArrays(1, &VAO);
    glGenBuffers(1, &VBO);
    glGenBuffers(1, &EBO);

    // Konfiguracja VAO/VBO/EBO
    glBindVertexArray(VAO);

    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);

    // Atrybut pozycji
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);

    // Atrybut koloru
    glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(3 * sizeof(float)));
    glEnableVertexAttribArray(1);

    // Atrybut wspó³rzêdnych tekstury
    glVertexAttribPointer(2, 2, GL_FLOAT, GL_FALSE, 8 * sizeof(float), (void*)(6 * sizeof(float)));
    glEnableVertexAttribArray(2);

    // Za³aduj tekstury
    unsigned int texture1, texture2;

    // Tekstura 1
    glGenTextures(1, &texture1);
    glBindTexture(GL_TEXTURE_2D, texture1);
    // Mapowanie tekstury
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE); // przycinanie do krawêdzi
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    // Filtrowanie tekstury
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

    int width, height, nrChannels;

    // Odwrócenie obrazu pionowo – STBI ³aduje od górnego lewego rogu
    stbi_set_flip_vertically_on_load(true);
    unsigned char* data = stbi_load("C:\\BibliotekiOpenGL\\texture\\1.jpg", &width, &height, &nrChannels, 0);
    if (data)
    {
        // Za³aduj dane obrazu do OpenGL
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGB, GL_UNSIGNED_BYTE, data);
        glGenerateMipmap(GL_TEXTURE_2D);
    }
    else
    {
        std::cout << "Nie uda³o siê za³adowaæ tekstury 1" << std::endl;
    }
    stbi_image_free(data);

    // Tekstura 2
    glGenTextures(1, &texture2);
    glBindTexture(GL_TEXTURE_2D, texture2);
    // Mapowanie: powtarzanie wzoru
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_REPEAT);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_REPEAT);
    // Filtrowanie
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);

    stbi_set_flip_vertically_on_load(true);
    data = stbi_load("C:\\BibliotekiOpenGL\\texture\\2.png", &width, &height, &nrChannels, 0);
    if (data)
    {
        // Uwaga: format GL_RGBA dla przezroczystoœci PNG
        glTexImage2D(GL_TEXTURE_2D, 0, GL_RGB, width, height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
        glGenerateMipmap(GL_TEXTURE_2D);
    }
    else
    {
        std::cout << "Nie uda³o siê za³adowaæ tekstury 2" << std::endl;
    }
    stbi_image_free(data);

    // Powi¹zanie jednostek tekstur z shaderem
    ourShader.use();
    glUniform1i(glGetUniformLocation(ourShader.ID, "texture1"), 0); // jednostka 0
    ourShader.setInt("texture2", 1);                                // jednostka 1

    // G³ówna pêtla renderuj¹ca
    while (!glfwWindowShouldClose(window))
    {
        // Obs³uga wejœcia
        processInput(window);

        // Czyszczenie bufora koloru
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // Aktywacja i przypisanie tekstur
        glActiveTexture(GL_TEXTURE0);
        glBindTexture(GL_TEXTURE_2D, texture1);
        glActiveTexture(GL_TEXTURE1);
        glBindTexture(GL_TEXTURE_2D, texture2);

        // U¿ycie shaderów i rysowanie obiektu
        ourShader.use();
        glBindVertexArray(VAO);
        glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);

        // Wymiana buforów i obs³uga zdarzeñ
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // Zwolnienie zasobów
    glDeleteVertexArrays(1, &VAO);
    glDeleteBuffers(1, &VBO);
    glDeleteBuffers(1, &EBO);

    glfwTerminate();
    return 0;
}

// Obs³uga klawiatury – ESC zamyka okno
void processInput(GLFWwindow* window)
{
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}

// Funkcja wywo³ywana przy zmianie rozmiaru okna
void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    glViewport(0, 0, width, height);
}