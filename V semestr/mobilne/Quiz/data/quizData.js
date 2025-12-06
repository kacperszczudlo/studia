// data/quizData.js (Utwórz folder 'data' i umieść w nim ten plik)

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: "Test Historyczny: Starożytny Rzym",
    duration: 30, // sekundy [cite: 137]
    questions: [
      {
        question: "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?", // [cite: 117]
        answers: [
          { content: "LUCJUSZ CYNNA", isCorrect: true }, // [cite: 119, 120]
          { content: "JULIUSZ CEZAR", isCorrect: false }, // [cite: 129, 130]
          { content: "LUCJUSZ MURENA", isCorrect: false }, // [cite: 131, 132]
          { content: "MAREK KRASSUS", isCorrect: false }, // [cite: 133, 134]
        ]
      },
      {
        question: "Kto był pierwszym cesarzem rzymskim?",
        answers: [
          { content: "Juliusz Cezar", isCorrect: false },
          { content: "Oktawian August", isCorrect: true },
          { content: "Kaligula", isCorrect: false },
          { content: "Neron", isCorrect: false },
        ]
      },
      {
        question: "W którym roku upadło Cesarstwo Zachodniorzymskie?",
        answers: [
          { content: "476 n.e.", isCorrect: true },
          { content: "395 n.e.", isCorrect: false },
          { content: "1453 n.e.", isCorrect: false },
          { content: "44 p.n.e.", isCorrect: false },
        ]
      },
    ]
  },
  {
    id: 2,
    title: "Test z Programowania: JavaScript",
    duration: 60,
    questions: [
      {
        question: "Co zwraca operator 'typeof' dla tablicy (array) w JavaScript?",
        answers: [
          { content: "array", isCorrect: false },
          { content: "object", isCorrect: true },
          { content: "string", isCorrect: false },
          { content: "undefined", isCorrect: false },
        ]
      },
      {
        question: "Która metoda dodaje element na końcu tablicy?",
        answers: [
          { content: "shift()", isCorrect: false },
          { content: "pop()", isCorrect: false },
          { content: "push()", isCorrect: true },
          { content: "unshift()", isCorrect: false },
        ]
      },
    ]
  }
];