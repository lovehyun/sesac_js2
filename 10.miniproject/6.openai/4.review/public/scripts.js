let reviews = [];

async function submitReview() {
    const rating = parseInt(document.querySelector('input[name="rating"]:checked').value);
    const comment = document.getElementById('comment').value;

    try {
        const response = await fetch('/api/review', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rating, comment})
        });

        console.log(response);
        await getReview();
        await fetchAISummary();
    } catch (error) {
        console.error('에러');
    }
}

async function getReview() {
    try {
        const response = await fetch('/api/review');
        data = await response.json();
        reviews = data.reviews;
        console.log(reviews);
        displayReviews();
    } catch (error) {
        console.error('에러: ', error.message);
    }
}

window.onload = async () => {
    await getReview();
    await fetchAISummary();
}

function displayReviews() {
    const reviewsContainer = document.getElementById('reviews-container');

    // 현재 있는거부터 삭제..
    reviewsContainer.querySelectorAll('.review-box').forEach(box => box.remove());

    // 새로 추가
    reviews.forEach(review => {
        const reviewBox = document.createElement('div');
        reviewBox.className = 'review-box';
        reviewBox.innerHTML = `
            <p>Rating: ${review.rating}</p>
            <p>${review.comment}</p>
        `
        reviewsContainer.appendChild(reviewBox);
    })
}

async function fetchAISummary() {
    try {
        const response = await fetch('/api/ai-summary');
        data = await response.json();
        const aisummary = data.summary;
        console.log(reviews);
        displayAIReviews(aisummary, data.averageRating);
    } catch (error) {
        console.error('에러: ', error.message);
    }
}

function displayAIReviews(summary, score) {
    const summaryContainer = document.getElementById('ai-summary');
    summaryContainer.innerHTML = `<p><strong>AI요약: </strong> ${summary}</p><p><strong>평균 별점: ${score.toFixed(2)}</strong></p>`
}
