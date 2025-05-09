document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Mock data with 10 entries
    const mockData = [
        { id: 1, title: "Introduction to JavaScript", content: "Learn the basics of JavaScript programming", category: "web", date: "2023-05-15", exactMatch: false },
        { id: 2, title: "Python for Data Science", content: "Explore data analysis with Python", category: "web", date: "2023-06-20", exactMatch: false },
        { id: 3, title: "Beautiful Sunset", content: "A stunning image of a sunset over the ocean", category: "images", date: "2023-04-10", exactMatch: false },
        { id: 4, title: "Breaking News: Tech Innovation", content: "New AI breakthrough announced", category: "news", date: "2023-07-05", exactMatch: false },
        { id: 5, title: "Healthy Recipes", content: "Quick and easy vegetarian meals", category: "web", date: "2023-03-25", exactMatch: false },
        { id: 6, title: "Space Exploration Update", content: "NASA's latest mission to Mars", category: "news", date: "2023-07-01", exactMatch: false },
        { id: 7, title: "Cute Puppies", content: "Adorable images of various dog breeds", category: "images", date: "2023-06-12", exactMatch: false },
        { id: 8, title: "JavaScript", content: "Advanced JavaScript techniques and best practices", category: "web", date: "2023-05-30", exactMatch: true },
        { id: 9, title: "Climate Change Report", content: "Latest findings on global warming", category: "news", date: "2023-07-10", exactMatch: false },
        { id: 10, title: "Web Development Trends", content: "Upcoming technologies in web development", category: "web", date: "2023-06-28", exactMatch: false },
    ];

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        const category = document.getElementById('category').value;
        const dateRange = document.getElementById('date-range').value;
        const exactMatch = document.getElementById('exact-match').checked;

        const results = searchData(query, category, dateRange, exactMatch);
        displayResults(results);
    });

    function searchData(query, category, dateRange, exactMatch) {
        return mockData.filter(item => {
            const matchesQuery = exactMatch
                ? (item.title.toLowerCase() === query || item.content.toLowerCase() === query)
                : (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));

            const matchesCategory = category === '' || item.category === category;

            const matchesDate = checkDateRange(item.date, dateRange);

            const matchesExactMatch = !exactMatch || item.exactMatch;

            return matchesQuery && matchesCategory && matchesDate && matchesExactMatch;
        });
    }

    function checkDateRange(itemDate, dateRange) {
        if (dateRange === '') return true;

        const currentDate = new Date();
        const itemDateTime = new Date(itemDate).getTime();

        switch (dateRange) {
            case 'day':
                return itemDateTime > currentDate.getTime() - 86400000; // 24 hours in milliseconds
            case 'week':
                return itemDateTime > currentDate.getTime() - 604800000; // 7 days in milliseconds
            case 'month':
                return itemDateTime > currentDate.getTime() - 2592000000; // 30 days in milliseconds
            default:
                return true;
        }
    }

    function displayResults(results) {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';

        if (results.length === 0) {
            resultsContainer.innerHTML = '<p class="no-results">No results found.</p>';
            return;
        }

        const resultList = document.createElement('ul');
        results.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <a href="#" class="result-link">
                    <h3>${item.title}</h3>
                    <p>${item.content}</p>
                    <small>Category: ${item.category} | Date: ${item.date}</small>
                    <span class="url">https://example.com/result/${item.id}</span>
                </a>
            `;
            resultList.appendChild(listItem);
        });

        resultsContainer.appendChild(resultList);
    }
});
