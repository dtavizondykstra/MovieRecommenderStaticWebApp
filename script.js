async function loadJsonFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
    }
    return response.json();
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

async function getRecommendations() {
    const input = document.getElementById('movie-input').value.trim();
    const recommendationsList = document.getElementById('recommendations');
    recommendationsList.innerHTML = '';

    console.log("User input movie:", input);

    if (!input) {
        alert('Please enter a movie title');
        return;
    }

    const titleCaseInput = toTitleCase(input);
    console.log("Transformed movie title:", titleCaseInput);

    try {
        const movieData = await loadJsonFile('top_10_movies.json');

        if (!movieData[titleCaseInput]) {
            alert('Movie not found');
            console.log("Available movies:", Object.keys(movieData));
            return;
        }

        const topRecommendations = movieData[titleCaseInput];

        topRecommendations.forEach(title => {
            const li = document.createElement('li');
            li.textContent = title;
            recommendationsList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading recommendations:', error);
        alert('Failed to load recommendations. Please try again.');
    }
}
