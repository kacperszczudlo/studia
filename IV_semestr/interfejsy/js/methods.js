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
      description: "Jak poprawnie zarzucać wędkę spinningową i łowić więcej ryb.",
      videoId: "hUurIgE2H8U", // How to Cast a Spinning Reel and Catch More Fish
      views: "1,027,960",
      likes: "6,882",
      difficulty: "Średni",
      category: "spinning"
    },
    {
      name: "Spinning",
      description: "Przewodnik po zakładaniu żyłki na kołowrotek spinningowy.",
      videoId: "IyUp5T6-piE", // How To Put Line On A Spinning Reel
      views: "450,320",
      likes: "5,120",
      difficulty: "Średni",
      category: "spinning"
    },
    {
      name: "Spinning",
      description: "Łowienie na przynęty sztuczne – poradnik dla początkujących.",
      videoId: "SamrdgVjpQk", // Fishing with Lures for Beginners
      views: "320,150",
      likes: "3,890",
      difficulty: "Średni",
      category: "spinning"
    },
    {
      name: "Spławik",
      description: "Łatwy sposób na łowienie na spławik – poradnik dla początkujących.",
      videoId: "4Sb0cqSndTk", // How To Float Fish - the easy way!
      views: "1,078,381",
      likes: "12,087",
      difficulty: "Łatwy",
      category: "spławik"
    },
    {
      name: "Spławik",
      description: "Pełny przewodnik po łowieniu na spławik dla początkujących.",
      videoId: "upK-3iJFwNQ", // Float Fishing For Beginners - FULL GUIDE
      views: "280,450",
      likes: "3,210",
      difficulty: "Łatwy",
      category: "spławik"
    },
    {
      name: "Spławik",
      description: "Nauka łowienia na spławik – szybki poradnik dla nowych wędkarzy.",
      videoId: "l-gV4UfriGE", // Learn To Float Fish - Coarse Fishing Quickbite
      views: "150,780",
      likes: "1,890",
      difficulty: "Łatwy",
      category: "spławik"
    },
    {
      name: "Grunt",
      description: "Rozpocznij łowienie metodą feederową z prostym zestawem wędkarskim.",
      videoId: "-OinQ_Fn4lc", // Start Method Feeder Fishing with my Simple Fishing Kit!
      views: "380,650",
      likes: "4,560",
      difficulty: "Łatwy",
      category: "grunt"
    },
    {
      name: "Grunt",
      description: "Pełny przewodnik po łowieniu metodą feederową dla początkujących.",
      videoId: "icGScqmXmBo", // How to Fish the METHOD FEEDER - Full Guide!
      views: "290,340",
      likes: "3,450",
      difficulty: "Łatwy",
      category: "grunt"
    },
    {
      name: "Grunt",
      description: "Jak łowić metodą feederową – 5 kroków do większej liczby ryb.",
      videoId: "3TjpPwyMgBk", // How To Fish The Method Feeder - 5 Steps To Catch More Fish
      views: "456,789",
      likes: "5,678",
      difficulty: "Łatwy",
      category: "grunt"
    },
    {
      name: "Karp",
      description: "Jak zacząć łowienie karpi – ustawianie wędki karpiowej.",
      videoId: "t2pv64sLFGY", // Starting Carp Fishing - How To Set Up A Carp Rod
      views: "210,890",
      likes: "2,780",
      difficulty: "Trudny",
      category: "karp"
    },
    {
      name: "Karp",
      description: "Łowienie karpi – powrót do podstaw dla początkujących.",
      videoId: "2xu49SHg_9k", // Carp Fishing - Back To Basics
      views: "789,123",
      likes: "8,901",
      difficulty: "Trudny",
      category: "karp"
    },
    {
      name: "Karp",
      description: "Jak łowić karpie na kukurydzę – łatwa i tania przynęta.",
      videoId: "-mCalYsZASg", // How To Catch Carp With Corn! (Easy and cheap bait for carp fishing)
      views: "180,560",
      likes: "2,340",
      difficulty: "Trudny",
      category: "karp"
    },
    {
      name: "Muchowa",
      description: "Jak rzucać wędką muchową – 5 wskazówek dla początkujących.",
      videoId: "0-9GqI-f5PE", // How to Cast a Fly Rod for Beginners (5 Fly Casting Tips That Will Help!)
      views: "320,450",
      likes: "4,120",
      difficulty: "Trudny",
      category: "muchowa"
    },
    {
      name: "Muchowa",
      description: "Podstawy sprzętu do wędkarstwa muchowego – jak zacząć.",
      videoId: "j7GXqUQQ2i0", // Fly Fishing Gear Basics - How to Get Started in Fly Fishing
      views: "250,780",
      likes: "3,210",
      difficulty: "Trudny",
      category: "muchowa"
    },
    {
      name: "Muchowa",
      description: "Nauka wędkarstwa muchowego w jednym filmie – pełny przewodnik.",
      videoId: "Gk2ZusF6eJw", // Learn to Fly Fish in One Video — A Complete Beginner's Journey!
      views: "190,340",
      likes: "2,890",
      difficulty: "Trudny",
      category: "muchowa"
    },
    {
      name: "Morska",
      description: "Szybki przewodnik po rozpoczęciu wędkarstwa morskiego we właściwy sposób.",
      videoId: "t4l8YeKNVss", // A Quick Guide to Starting Sea Fishing the right way
      views: "310,560",
      likes: "3,890",
      difficulty: "Średni",
      category: "morska"
    },
    {
      name: "Morska",
      description: "Przewodnik po wędkarstwie morskim z brzegu dla początkujących – z przynętami.",
      videoId: "x_fNuU_EEy0", // Beginner Saltwater Shore Fishing Guide - With Lures
      views: "270,450",
      likes: "3,450",
      difficulty: "Średni",
      category: "morska"
    },
    {
      name: "Morska",
      description: "Nauka łowienia z plaży – podstawowe techniki wędkarstwa morskiego.",
      videoId: "hTPUEHdfZac", // Learn To Beach Fish Basic Beach Fishing Techniques - Sea Fishing Quickbite
      views: "150,780",
      likes: "1,890",
      difficulty: "Średni",
      category: "morska"
    },
    {
      name: "Podlodowe",
      description: "Podstawy wędkarstwa podlodowego dla początkujących – jak zacząć.",
      videoId: "KpISHNqoaLQ", // Ice Fishing Basics For Beginners / How To Go Ice Fishing Explained 101
      views: "280,340",
      likes: "3,210",
      difficulty: "Średni",
      category: "podlodowe"
    },
    {
      name: "Podlodowe",
      description: "Jak łowić pod lodem – podstawy wędkarstwa podlodowego 101.",
      videoId: "R1r7RzzZBag", // How to Ice Fish - Beginner Ice Fishing 101
      views: "220,560",
      likes: "2,780",
      difficulty: "Średni",
      category: "podlodowe"
    },
    {
      name: "Podlodowe",
      description: "Łowienie okoni pod lodem – wszystko, co musisz wiedzieć.",
      videoId: "8r4wyyr2tGY", // Ice Fishing Perch – EVERYTHING You Need To Know
      views: "180,450",
      likes: "2,340",
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