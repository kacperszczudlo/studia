#include <glad/glad.h>
#include <GLFW/glfw3.h>

#include <iostream>

void framebuffer_size_callback(GLFWwindow* window, int width, int height);
void processInput(GLFWwindow* window);

// glfw: inicjalizacja i konfiguracja
// ------------------------------
const unsigned int SCR_WIDTH = 800;
const unsigned int SCR_HEIGHT = 600;

const char* vertexShaderSource = "#version 330 core\n"
"layout (location = 0) in vec3 aPos;\n"
"void main()\n"
"{\n"
"   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n"
"}\0";

const char* fragmentShaderSource = "#version 330 core\n"
"out vec4 FragColor;\n"
"void main()\n"
"{\n"
"   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
"}\n\0";

int main()
{
    // glfw: inicjalizacja i konfiguracja
    // ------------------------------
    glfwInit();
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
    glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);

    // glfw - tworzenie okna
    // --------------------
    GLFWwindow* window = glfwCreateWindow(SCR_WIDTH, SCR_HEIGHT, "OpenGL - P2", NULL, NULL);
    if (window == NULL)
    {
        std::cout << "Failed to create GLFW window" << std::endl;
        glfwTerminate();
        return -1;
    }
    glfwMakeContextCurrent(window);

    // OpenGL - ustawienie aktywnego obszaru - rozmiar oraz po³o¿enie (viewport) renderowania wzgledem okna GLFW
    // --------------------
    // glViewport(0, 0, 800, 600);
    // taki zapis nie zapewniw poprawnego dzialania przy przeskalowanou okna

    // glfw - zarejestrowanie funkcji framebuffer_size_callback wywo³ywanej zwrotnie (callback function)
    //        wywo³ywanej automatycznej za kazdym razem gdy wielkosc okna ulegnie zmianie
    //        uaktualniajacej viewport
    // --------------------
    glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

    // glad: zaladowanie wszystkich funkcji (wskaznikow) OpenGL
    // ---------------------------------------
    if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress))
    {
        std::cout << "Failed to initialize GLAD" << std::endl;
        return -1;
    }

    // Utworzenie i kompilacja shaderow
    // ------------------------------------
    // vertex shader
    int vertexShader = glCreateShader(GL_VERTEX_SHADER);
    glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
    glCompileShader(vertexShader);
    // sprawdzenie bledow
    int success;
    char infoLog[512];
    glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);
    if (!success)
    {
        glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // fragment shader
    int fragmentShader = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader, 1, &fragmentShaderSource, NULL);
    glCompileShader(fragmentShader);
    // sprawdzenie bledow
    glGetShaderiv(fragmentShader, GL_COMPILE_STATUS, &success);
    if (!success)
    {
        glGetShaderInfoLog(fragmentShader, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::FRAGMENT::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // linkowanie
    int shaderProgram = glCreateProgram();
    glAttachShader(shaderProgram, vertexShader);
    glAttachShader(shaderProgram, fragmentShader);
    glLinkProgram(shaderProgram);
    // sprawdzenie bledow
    glGetProgramiv(shaderProgram, GL_LINK_STATUS, &success);
    if (!success) {
        glGetProgramInfoLog(shaderProgram, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::PROGRAM::LINKING_FAILED\n" << infoLog << std::endl;
    }
    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader);

    // Wprowadzenie danych wierzcholkow i ustawienie atrybitow
    // ------------------------------------------------------------------
    float vertices1[] = {
        // Pierwszy trójk¹t (górny)
        -0.5f,  0.1f, 0.0f, // lewy
         0.5f,  0.1f, 0.0f, // prawy
         0.0f,  0.9f, 0.0f, // górny 
    };
    float vertices2[] = {
        // Drugi trójk¹t (dolny)
        -0.5f, -0.1f, 0.0f, // lewy
         0.5f, -0.1f, 0.0f, // prawy
         0.0f, -0.9f, 0.0f  // dolny
    };

    // Utworzenie vertex buffer objects (VBO) oraz Vertex Array Object (VAO)
    unsigned int VBO1, VAO1, VBO2, VAO2;
    glGenVertexArrays(1, &VAO1);
    glGenBuffers(1, &VBO1);

    glGenVertexArrays(1, &VAO2);
    glGenBuffers(1, &VBO2);

    // Pierwszy trójk¹t
    glBindVertexArray(VAO1);
    glBindBuffer(GL_ARRAY_BUFFER, VBO1);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices1), vertices1, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glBindVertexArray(0);

    // Drugi trójk¹t
    glBindVertexArray(VAO2);
    glBindBuffer(GL_ARRAY_BUFFER, VBO2);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices2), vertices2, GL_STATIC_DRAW);
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);
    glBindBuffer(GL_ARRAY_BUFFER, 0);
    glBindVertexArray(0);

    // rysowanie wireframe
    //glPolygonMode(GL_FRONT_AND_BACK, GL_LINE);

    // petla renderowania - bez niej program po wyrysowaniu pojedynczego obrazu zakonczyl by dzialanie i zamknal okno
    // -----------
    while (!glfwWindowShouldClose(window))
    {
        // przetwazanie wejscia przy renderowaniu kazdej klatki
        // kazda iteracja petli renderowania nosi nazwe klatki
        // -----
        processInput(window);

        // komendy renderowania pojedynczej klatki - pojedynczy przebieg petli renderowania
        // ------
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // rysowanie trójk¹tów
        glUseProgram(shaderProgram);

        glBindVertexArray(VAO1);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        glBindVertexArray(VAO2);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // glfw: zamiana bufora ekranu oraz przeglsadniecie puli zdazen IO (wcisniete klawisze, ruch myszy)
        // -------------------------------------------------------------------------------
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // Zwolnienie pamiêci
    // ------------------------------------------------------------------------
    glDeleteVertexArrays(1, &VAO1);
    glDeleteBuffers(1, &VBO1);
    glDeleteVertexArrays(1, &VAO2);
    glDeleteBuffers(1, &VBO2);
    glDeleteProgram(shaderProgram);

    // glfw: zakonczenie dzialania, czyszczenie i zwalnianie zaalokowanych zasobow GLFW
    // ------------------------------------------------------------------
    glfwTerminate();
    return 0;
}

// obsluga wejscia: odpytywanie GLFW czy jakikolwiek klawisz zostal wcisniety/puszczony i reakcja na to.
// ---------------------------------------------------------------------------------------------------------
void processInput(GLFWwindow* window)
{
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}

// glfw: gdy wielosc okna ulega zmianie ta funkcja jest automatycznie wywo³ywana
// width oraz height - to nowe wymiary okna GLFW - automatycznie wypelniane
// ---------------------------------------------------------------------------------------------
void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
    // ustawienie poprawnego viewport po przeskalowaniu okna
    glViewport(0, 0, width, height);
}
