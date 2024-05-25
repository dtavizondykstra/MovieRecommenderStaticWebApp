async function loadJsonFile(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to load ${filePath}`);
    }
    return response.json();
}

function toLowerCase(str) {
    return str.toLowerCase();
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

    const lowerCaseInput = toLowerCase(input);
    console.log("Transformed movie title:", lowerCaseInput);

    try {
        const movieData = await loadJsonFile('top_10_movies.json');

        // Normalize keys in movieData to lowercase for easier comparison
        const normalizedMovieData = {};
        for (const key in movieData) {
            normalizedMovieData[toLowerCase(key)] = movieData[key];
        }

        if (!normalizedMovieData[lowerCaseInput]) {
            alert('Movie not found');
            console.log("Available movies:", Object.keys(normalizedMovieData));
            return;
        }

        const topRecommendations = normalizedMovieData[lowerCaseInput];

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
