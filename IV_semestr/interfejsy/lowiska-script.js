// Initialize Google Map with enhanced debugging
function initMap() {
    console.log('Initializing Google Map...');
  
    if (!window.google || !window.google.maps) {
      console.error('Google Maps API failed to load. Check API key, billing, and network.');
      return;
    }
  
    // Center the map on Poland
    const polandCenter = { lat: 52.215933, lng: 19.134422 }; // Approximate center of Poland
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 6, // Zoom level for Poland
      center: polandCenter,
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] }, // Hide points of interest for cleaner map
        { featureType: "transit", stylers: [{ visibility: "off" }] } // Hide transit for cleaner map
      ]
    });
  
    console.log('Map initialized successfully.');
  
    // Example fishing locations in Poland (you can add more or replace with your data)
    const fishingLocations = [
      { name: "Jezioro Wigry", lat: 54.0058, lng: 23.1022 }, // Lake Wigry
      { name: "Wisła (Warszawa)", lat: 52.2297, lng: 21.0122 }, // Vistula River in Warsaw
      { name: "Jezioro Niegocin", lat: 53.8450, lng: 21.8350 }, // Lake Niegocin
      { name: "Rzeka Bug", lat: 52.3400, lng: 22.2000 } // Bug River
    ];
  
    // Add markers for each fishing location with debugging
    fishingLocations.forEach(location => {
      console.log(`Adding marker for ${location.name} at [${location.lat}, ${location.lng}]`);
      const marker = new google.maps.Marker({
        position: { lat: location.lat, lng: location.lng },
        map: map,
        title: location.name,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/fishing.png", // Fishing icon (optional, can be customized)
          scaledSize: new google.maps.Size(32, 32) // Size of the icon
        }
      });
  
      // Add info window with location name
      const infowindow = new google.maps.InfoWindow({
        content: `<h3>${location.name}</h3>`
      });
  
      marker.addListener('click', () => {
        infowindow.open(map, marker);
      });
    });
  }
  
  // Call initMap when the page loads (handled by Google Maps API script)
  window.initMap = initMap;
  
  // Error handling for Google Maps API
  window.onerror = function(message, url, line, col, error) {
    console.error('Error loading Google Maps:', message, 'URL:', url, 'Line:', line, 'Column:', col, 'Error:', error);
  };