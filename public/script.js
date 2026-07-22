let allApps = [];

// 1. सर्वर से ऐप्स का डेटा लोड करना
document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/apps')
        .then(response => response.json())
        .then(data => {
            allApps = data;
            displayApps(allApps);
        })
        .catch(error => console.error('Error loading apps:', error));
});

// 2. ऐप्स को स्क्रीन पर दिखाना
function displayApps(apps) {
    const popularGrid = document.getElementById('popularApps');
    const latestGrid = document.getElementById('latestApps');

    popularGrid.innerHTML = '';
    latestGrid.innerHTML = '';

    const popularApps = apps.filter(app => app.isPopular);
    const latestApps = apps.filter(app => app.isLatest);

    // Popular Apps
    popularApps.forEach(app => {
        popularGrid.appendChild(createAppCard(app));
    });

    // Latest Apps
    latestApps.forEach(app => {
        latestGrid.appendChild(createAppCard(app));
    });
}

// 3. 3D ऐप कार्ड का HTML बनाना
function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';
    card.onclick = () => openModal(app);

    card.innerHTML = `
        <img src="${app.icon}" alt="${app.name}" loading="lazy">
        <h4>${app.name}</h4>
        <p>${app.category}</p>
        <p style="color: var(--accent-color); font-weight: bold; margin-top: 4px;">v${app.version}</p>
    `;
    return card;
}

// 4. ऐप्स को सर्च करना (Search Function)
function searchApps() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filteredApps = allApps.filter(app => 
        app.name.toLowerCase().includes(query) || 
        app.category.toLowerCase().includes(query)
    );
    displayApps(filteredApps);
}

// 5. कैटेगरी के हिसाब से ऐप्स फ़िल्टर करना
function filterCategory(category) {
    // बटन का एक्टिव स्टाइल बदलना
    const buttons = document.querySelectorAll('.cat-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (category === 'All') {
        displayApps(allApps);
    } else {
        const filtered = allApps.filter(app => app.category === category);
        displayApps(filtered);
    }
}

// 6. ऐप डिटेल्स और डाउनलोड पॉप-अप (Modal) खोलना
function openModal(app) {
    const modal = document.getElementById('appModal');
    const modalDetails = document.getElementById('modalDetails');

    modalDetails.innerHTML = `
        <div style="text-align: center;">
            <img src="${app.icon}" style="width: 80px; height: 80px; border-radius: 18px; margin-bottom: 10px;">
            <h2>${app.name}</h2>
            <p style="opacity: 0.7; margin-bottom: 5px;">Developer: ${app.developer}</p>
            <p style="font-size: 0.85rem; background: var(--bg-color); display: inline-block; padding: 4px 12px; border-radius: 12px; margin-bottom: 15px;">
                Size: ${app.size} | Version: ${app.version}
            </p>
            <p style="text-align: left; margin: 15px 0; font-size: 0.95rem;">${app.description}</p>
            
            <a href="${app.download_url}" target="_blank" class="download-btn">
                <i class="fa-solid fa-download"></i> Download APK
            </a>
        </div>
    `;

    modal.style.display = 'flex';
}

// 7. पॉप-अप बंद करना
function closeModal() {
    document.getElementById('appModal').style.display = 'none';
}

// 8. डार्क मोड / लाइट मोड चालू-बंद करना
function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.body.setAttribute('data-theme', newTheme);
    
    const themeBtn = document.getElementById('themeToggle');
    if (newTheme === 'dark') {
        themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}
