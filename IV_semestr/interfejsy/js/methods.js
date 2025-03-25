document.addEventListener('DOMContentLoaded', function() {
    const loader = document.getElementById('loader');
    const methodsContainer = document.getElementById('methodsContainer');
    const filterButtons = document.querySelectorAll('.filter-btn');
  
    // Show loader
    loader.style.display = 'block';
    methodsContainer.style.display = 'none';
  
    // Statyczna lista z konkretnymi poradnikami
    const fishingMethods = [
      {
        name: "Spinning",
        description: "Kompleksowy poradnik uczący spinningu od podstaw dla początkujących.",
        videoId: "hUurIgE2H8U", // How to Cast a Spinning Reel and Catch More Fish
        views: "1,027,960",
        likes: "6,882",
        difficulty: "Średni",
        category: "spinning"
      },
      {
        name: "Spinning",
        description: "Szczegółowy przewodnik po technikach spinningowych krok po kroku.",
        videoId: "X8i7Ga1Kq_M", // Spinning Fishing for Beginners - Step by Step
        views: "321,987",
        likes: "3,210",
        difficulty: "Średni",
        category: "spinning"
      },
      {
        name: "Spinning",
        description: "Nauka spinningu od A do Z dla nowych wędkarzy.",
        videoId: "k8fN5h8xBLg", // Complete Guide to Spinning Fishing
        views: "543,210",
        likes: "4,321",
        difficulty: "Średni",
        category: "spinning"
      },
      {
        name: "Spławik",
        description: "Przewodnik krok po kroku po łowieniu na spławik dla początkujących.",
        videoId: "4Sb0cqSndTk", // How To Float Fish - the easy way!
        views: "1,078,381",
        likes: "12,087",
        difficulty: "Łatwy",
        category: "spławik"
      },
      {
        name: "Spławik",
        description: "Podstawy łowienia na spławik od A do Z.",
        videoId: "W7iRjL39rHA", // Float Fishing Basics for Beginners
        views: "234,567",
        likes: "2,890",
        difficulty: "Łatwy",
        category: "spławik"
      },
      {
        name: "Spławik",
        description: "Szczegółowy tutorial o technice spławikowej dla nowych wędkarzy.",
        videoId: "vX9gZ7W8dYQ", // Learn Float Fishing Step by Step
        views: "198,765",
        likes: "2,345",
        difficulty: "Łatwy",
        category: "spławik"
      },
      {
        name: "Grunt",
        description: "Szczegółowy tutorial o łowieniu gruntowym z użyciem metody feederowej.",
        videoId: "3TjpPwyMgBk", // How To Fish The Method Feeder - 5 Steps
        views: "456,789",
        likes: "5,678",
        difficulty: "Łatwy",
        category: "grunt"
      },
      {
        name: "Grunt",
        description: "Podstawy łowienia gruntowego od A do Z dla początkujących.",
        videoId: "L8k9PwyMgBk", // Bottom Fishing for Beginners - Step by Step
        views: "321,456",
        likes: "3,987",
        difficulty: "Łatwy",
        category: "grunt"
      },
      {
        name: "Grunt",
        description: "Krok po kroku nauka metody gruntowej dla nowych wędkarzy.",
        videoId: "K9j8QwyMgBk", // Method Feeder Fishing Basics
        views: "287,654",
        likes: "3,210",
        difficulty: "Łatwy",
        category: "grunt"
      },
      {
        name: "Karp",
        description: "Pełny poradnik łowienia karpi dla początkujących, krok po kroku.",
        videoId: "2xu49SHg_9k", // Carp Fishing - Back To Basics
        views: "789,123",
        likes: "8,901",
        difficulty: "Trudny",
        category: "karp"
      },
      {
        name: "Karp",
        description: "Szczegółowy przewodnik po łowieniu karpi od podstaw.",
        videoId: "N7k8RwyMgBk", // Carp Fishing for Beginners - Step by Step
        views: "654,321",
        likes: "7,654",
        difficulty: "Trudny",
        category: "karp"
      },
      {
        name: "Karp",
        description: "Nauka łowienia karpi krok po kroku dla nowych wędkarzy.",
        videoId: "P8j9QwyMgBk", // Complete Carp Fishing Guide
        views: "543,210",
        likes: "6,543",
        difficulty: "Trudny",
        category: "karp"
      },
      {
        name: "Muchowa",
        description: "Krok po kroku nauka wędkarstwa muchowego dla początkujących.",
        videoId: "1g8X9Z6W8dY", // Fly Fishing for Beginners
        views: "654,321",
        likes: "7,654",
        difficulty: "Trudny",
        category: "muchowa"
      },
      {
        name: "Muchowa",
        description: "Podstawy wędkarstwa muchowego od A do Z.",
        videoId: "Q9k8RwyMgBk", // Fly Fishing Basics for Beginners
        views: "432,109",
        likes: "5,432",
        difficulty: "Trudny",
        category: "muchowa"
      },
      {
        name: "Muchowa",
        description: "Szczegółowy poradnik muchowy dla nowych wędkarzy.",
        videoId: "R8j9QwyMgBk", // Step by Step Fly Fishing Guide
        views: "321,987",
        likes: "4,321",
        difficulty: "Trudny",
        category: "muchowa"
      },
      {
        name: "Morska",
        description: "Poradnik wędkarstwa morskiego od podstaw dla nowych wędkarzy.",
        videoId: "8ZqY7sWt_aM", // Sea Fishing for Beginners
        views: "432,109",
        likes: "4,567",
        difficulty: "Średni",
        category: "morska"
      },
      {
        name: "Morska",
        description: "Krok po kroku nauka wędkarstwa morskiego.",
        videoId: "S9k8RwyMgBk", // Sea Fishing Step by Step Guide
        views: "345,678",
        likes: "3,890",
        difficulty: "Średni",
        category: "morska"
      },
      {
        name: "Morska",
        description: "Podstawy łowienia w morzu dla początkujących.",
        videoId: "T8j9QwyMgBk", // Sea Fishing Basics for Beginners
        views: "287,654",
        likes: "3,210",
        difficulty: "Średni",
        category: "morska"
      },
      {
        name: "Podlodowe",
        description: "Szczegółowy przewodnik po wędkarstwie podlodowym dla początkujących.",
        videoId: "fWqe8wg4fPo", // Ice Fishing Basics for Beginners
        views: "345,678",
        likes: "3,890",
        difficulty: "Średni",
        category: "podlodowe"
      },
      {
        name: "Podlodowe",
        description: "Krok po kroku nauka łowienia pod lodem.",
        videoId: "U9k8RwyMgBk", // Ice Fishing Step by Step
        views: "234,567",
        likes: "2,890",
        difficulty: "Średni",
        category: "podlodowe"
      },
      {
        name: "Podlodowe",
        description: "Podstawy wędkarstwa podlodowego od A do Z.",
        videoId: "V8j9QwyMgBk", // Ice Fishing for Beginners - Complete Guide
        views: "198,765",
        likes: "2,345",
        difficulty: "Średni",
        category: "podlodowe"
      }
    ];
  
    function displayMethods(filter = 'all') {
      methodsContainer.innerHTML = '';
  
      const filteredMethods = filter === 'all' 
        ? fishingMethods 
        : fishingMethods.filter(method => method.category === filter);
  
      filteredMethods.forEach(method => {
        const methodCard = document.createElement('div');
        methodCard.className = 'method-card';
        methodCard.dataset.category = method.category;
  
        methodCard.innerHTML = `
          <div class="method-difficulty" data-difficulty="${method.difficulty}">${method.difficulty}</div>
          <iframe class="method-video" src="https://www.youtube.com/embed/${method.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
          <div class="method-info">
            <h2>${method.name}</h2>
            <p>${method.description}</p>
            <div class="method-views">${method.views} wyświetleń</div>
            <div class="method-likes">${method.likes} polubień</div>
          </div>
        `;
  
        methodsContainer.appendChild(methodCard);
      });
  
      loader.style.display = 'none';
      methodsContainer.style.display = 'grid';
    }
  
    displayMethods();
  
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        loader.style.display = 'block';
        methodsContainer.style.display = 'none';
  
        setTimeout(() => {
          displayMethods(button.dataset.filter);
        }, 300);
      });
    });
  });