document.addEventListener('DOMContentLoaded', () => {
    // 1. Simple Anime Card Interactions
    const animeCards = document.querySelectorAll('.anime-card');
    
    animeCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.03)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
            card.style.boxShadow = '0 6px 10px rgba(0,0,0,0.1)';
        });

        // Description Card Interaction
        card.addEventListener('click', (event) => {
            // Prevent action if clicking on a link
            if (event.target.tagName.toLowerCase() === 'a') {
                return;
            }

            // Close other open description cards
            animeCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('description-active');
                }
            });

            // Toggle current card's description
            card.classList.toggle('description-active');
        });
    });

    // Close description cards when clicking outside
    document.addEventListener('click', (event) => {
        animeCards.forEach(card => {
            if (!card.contains(event.target)) {
                card.classList.remove('description-active');
            }
        });
    });

    // 2. Dynamic Random Recommendation Feature
    const createRecommendationFeature = () => {
        const recommendationContainer = document.createElement('div');
        recommendationContainer.classList.add('recommendation-container');
        
        const recommendButton = document.createElement('button');
        recommendButton.textContent = '🎲 Random Pick';
        recommendButton.classList.add('recommendation-btn');
        
        const resultDisplay = document.createElement('div');
        resultDisplay.classList.add('recommendation-result');
        
        recommendButton.addEventListener('click', () => {
            const cards = [...animeCards];
            const randomCard = cards[Math.floor(Math.random() * cards.length)];
            const randomTitle = randomCard.querySelector('h2').textContent;
            
            // Playful recommendation display
            resultDisplay.innerHTML = `
                <p>Today's Pick: ${randomTitle}</p>
            `;
            
            // Highlight the recommended anime
            cards.forEach(card => card.classList.remove('recommended'));
            randomCard.classList.add('recommended');
            
            randomCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        });
        
        recommendationContainer.appendChild(recommendButton);
        recommendationContainer.appendChild(resultDisplay);
        
        document.querySelector('header').appendChild(recommendationContainer);
    };

    // 3. Subtle Page Load Animation
    const animatePageLoad = () => {
        animeCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    };

    // Initialize all features
    createRecommendationFeature();
    animatePageLoad();
});