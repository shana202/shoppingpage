document.addEventListener('DOMContentLoaded', () => {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');

    // Mock data with 10 entries
    const mockData = [
        { id: 1, title: "Coconut Vanilla Over Ice", content: "A delicious coconut flavor with a soft hint of vanilla, harmoniously combined with a smooth, rounded Arabica blend.", category: "coffee", type: "vertuo", exactMatch: false },
        { id: 2, title: "Paris Espresso", content: "This Parisian café experience in a cup is mild and balanced, with the light-roasted Robustas delicate bitterness gracing the softer biscuity aromas.", category: "coffee", type: "original", exactMatch: false },
        { id: 3, title: "Stockholm Lungo", content: "An intense, all-Arabica coffee best enjoyed black to savor the pure taste beloved by Swedes  malty, with a hint of rich bitterness.", category: "coffee", type: "original", exactMatch: false },
        { id: 4, title: "Golden Caramel", content: "This flavored blend delights with a classic caramel flavor combined with sweet biscuit notes.", category: "coffee", type: "vertuo", exactMatch: false },
        { id: 5, title: "Creatista Pro", content: "Premium espresso machine, with electronic recipe maker, digital touch screen, hot water and integrated steam pipe to create latte art. Prepares Cappuccino, Latte and more", category: "machines", type: "original", exactMatch: false },
        { id: 6, title: "Essenza Mini Piano Black", content: "Small, easy to use and doesn't compromise on taste.", category: "machines", type: "original", exactMatch: false },
        { id: 7, title: "VertuoPlus", content: "Exceptional coffee made easy for a unique coffee experience at home.", category: "machines", type: "vertuo", exactMatch: false },
        { id: 8, title: "Barista Recipe Maker", content: "Barista is an invitation to discover a wide world of recipe possibilities", category: "accessories", type: "vertuo", exactMatch: true },
        { id: 9, title: "Cold Brew Starter Kit", content: "Enjoy the craft of cold brew", category: "coffee", type: "vertuo", exactMatch: false },
        { id: 10, title: "Martini Glass Set", content: "To celebrate in style", category: "accessories", type: "", exactMatch: false },
    ];

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchInput.value.toLowerCase();
        const category = document.getElementById('category').value;
        const type = document.getElementById('type').value;
        const exactMatch = document.getElementById('exact-match').checked;

        const results = searchData(query, category, type, exactMatch);
        displayResults(results);
    });

    function searchData(query, category, type, exactMatch) {
        return mockData.filter(item => {
            const matchesQuery = exactMatch
                ? (item.title.toLowerCase() === query || item.content.toLowerCase() === query)
                : (item.title.toLowerCase().includes(query) || item.content.toLowerCase().includes(query));

            const matchesCategory = category === '' || item.category === category;

            const matchesType = type === '' || item.type === type;

            const matchesExactMatch = !exactMatch || item.exactMatch;

            return matchesQuery && matchesCategory && matchesType && matchesExactMatch;
        });   
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
                    <small>Category: ${item.category} | Type: ${item.type}</small>
                    <span class="url">https://example.com/result/${item.id}</span>
                </a>
            `;
            resultList.appendChild(listItem);
        });

        resultsContainer.appendChild(resultList);
    }
});
