// auth.js

// Funkcja do rejestracji
async function registerUser(email, password) {
    try {
      // Walidacja danych
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Proszę podać poprawny adres email');
      }
      if (!password || password.length < 8) {
        throw new Error('Hasło musi mieć co najmniej 8 znaków');
      }
  
      // Hashowanie hasła
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Rejestracja w Supabase Authentication
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
  
      if (authError) {
        throw new Error(authError.message);
      }
  
      // Pobierz ID użytkownika z Supabase Authentication
      const userId = data.user.id;
  
      // Zapis użytkownika do tabeli users
      const { data: insertData, error: dbError } = await supabase
        .from('users')
        .insert([
          {
            id: userId, // Używamy ID z Supabase Authentication
            email,
            password: hashedPassword,
          },
        ]);
  
      if (dbError) {
        throw new Error(dbError.message);
      }
  
      alert('Rejestracja zakończona sukcesem! Możesz się zalogować.');
      showLoginModal();
    } catch (error) {
      alert('Błąd rejestracji: ' + error.message);
    }
  }
  
  // Funkcja do logowania
  async function loginUser(email, password) {
    try {
      // Walidacja danych
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error('Proszę podać poprawny adres email');
      }
      if (!password) {
        throw new Error('Proszę podać hasło');
      }
  
      // Logowanie w Supabase Authentication
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
  
      if (authError) {
        throw new Error(authError.message);
      }
  
      // Pobierz zahashowane hasło z tabeli users
      const { data: userData, error: dbError } = await supabase
        .from('users')
        .select('password')
        .eq('email', email)
        .single();
  
      if (dbError || !userData) {
        throw new Error('Błąd podczas weryfikacji użytkownika');
      }
  
      // Porównaj hasła
      const isPasswordValid = await bcrypt.compare(password, userData.password);
      if (!isPasswordValid) {
        throw new Error('Nieprawidłowe hasło');
      }
  
      alert('Logowanie zakończona sukcesem!');
      window.location.href = 'profile.html'; // Przekierowanie po zalogowaniu
    } catch (error) {
      alert('Błąd logowania: ' + error.message);
    }
  }
  
  // Obsługa formularza rejestracji
  document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await registerUser(email, password);
  });
  
  // Obsługa formularza logowania
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await loginUser(email, password);
  });