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

const char* fragmentShaderSource1 = "#version 330 core\n"
"out vec4 FragColor;\n"
"void main()\n"
"{\n"
"   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n"
"}\n\0";

const char* fragmentShaderSource2 = "#version 330 core\n"
"out vec4 FragColor;\n"
"void main()\n"
"{\n"
"   FragColor = vec4(0.2f, 0.5f, 1.0f, 1.0f);\n"
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

    // fragment shader 1
    int fragmentShader1 = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader1, 1, &fragmentShaderSource1, NULL);
    glCompileShader(fragmentShader1);
    // sprawdzenie bledow
    glGetShaderiv(fragmentShader1, GL_COMPILE_STATUS, &success);
    if (!success)
    {
        glGetShaderInfoLog(fragmentShader1, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::FRAGMENT1::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // fragment shader 2
    int fragmentShader2 = glCreateShader(GL_FRAGMENT_SHADER);
    glShaderSource(fragmentShader2, 1, &fragmentShaderSource2, NULL);
    glCompileShader(fragmentShader2);
    // sprawdzenie bledow
    glGetShaderiv(fragmentShader2, GL_COMPILE_STATUS, &success);
    if (!success)
    {
        glGetShaderInfoLog(fragmentShader2, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::FRAGMENT2::COMPILATION_FAILED\n" << infoLog << std::endl;
    }

    // linkowanie shader program 1
    int shaderProgram1 = glCreateProgram();
    glAttachShader(shaderProgram1, vertexShader);
    glAttachShader(shaderProgram1, fragmentShader1);
    glLinkProgram(shaderProgram1);
    // sprawdzenie bledow
    glGetProgramiv(shaderProgram1, GL_LINK_STATUS, &success);
    if (!success) {
        glGetProgramInfoLog(shaderProgram1, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::PROGRAM1::LINKING_FAILED\n" << infoLog << std::endl;
    }

    // linkowanie shader program 2
    int shaderProgram2 = glCreateProgram();
    glAttachShader(shaderProgram2, vertexShader);
    glAttachShader(shaderProgram2, fragmentShader2);
    glLinkProgram(shaderProgram2);
    // sprawdzenie bledow
    glGetProgramiv(shaderProgram2, GL_LINK_STATUS, &success);
    if (!success) {
        glGetProgramInfoLog(shaderProgram2, 512, NULL, infoLog);
        std::cout << "ERROR::SHADER::PROGRAM2::LINKING_FAILED\n" << infoLog << std::endl;
    }

    glDeleteShader(vertexShader);
    glDeleteShader(fragmentShader1);
    glDeleteShader(fragmentShader2);

    // Wprowadzenie danych wierzcholkow i ustawienie atrybitow
    // ------------------------------------------------------------------
    float vertices[] = {
        // Pierwszy trójk¹t (górny)
        -0.5f,  0.1f, 0.0f, // lewy
         0.5f,  0.1f, 0.0f, // prawy
         0.0f,  0.9f, 0.0f, // górny

         // Drugi trójk¹t (dolny)
         -0.5f, -0.1f, 0.0f, // lewy
          0.5f, -0.1f, 0.0f, // prawy
          0.0f, -0.9f, 0.0f  // dolny
    };

    // Utworzenie vertex buffer objects (VBO) oraz Vertex Array Object (VAO)
    unsigned int VBO, VAO;
    glGenVertexArrays(1, &VAO);
    glGenBuffers(1, &VBO);

    // Najpierw podpiêcie Vertex Array Object, póŸniej podpiêcie i ustawienie atrybutów vertex buffer(s).
    glBindVertexArray(VAO);

    // ustawienie danych
    glBindBuffer(GL_ARRAY_BUFFER, VBO);
    glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW);

    // ustawienie atrybutow
    glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0);
    glEnableVertexAttribArray(0);

    // Odpiêcie
    glBindBuffer(GL_ARRAY_BUFFER, 0);

    // Odpiecie VAO
    glBindVertexArray(0);

    // petla renderowania
    // -----------
    while (!glfwWindowShouldClose(window))
    {
        // przetwazanie wejscia przy renderowaniu kazdej klatki
        // -----
        processInput(window);

        // komendy renderowania pojedynczej klatki
        // ------
        glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
        glClear(GL_COLOR_BUFFER_BIT);

        // rysowanie pierwszego trójk¹ta (górnego)
        glUseProgram(shaderProgram1);
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 0, 3);

        // rysowanie drugiego trójk¹ta (dolnego)
        glUseProgram(shaderProgram2);
        glBindVertexArray(VAO);
        glDrawArrays(GL_TRIANGLES, 3, 3);

        // glfw: zamiana bufora ekranu oraz przeglsadniecie puli zdazen IO
        // -------------------------------------------------------------------------------
        glfwSwapBuffers(window);
        glfwPollEvents();
    }

    // Zwolnienie pamiêci
    // ------------------------------------------------------------------------
    glDeleteVertexArrays(1, &VAO);
    glDeleteBuffers(1, &VBO);
    glDeleteProgram(shaderProgram1);
    glDeleteProgram(shaderProgram2);

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