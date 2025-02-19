document.getElementById('feedbackForm').addEventListener('submit', function (event) {
    event.preventDefault();
    document.getElementById('confirm').style.display = 'flex';
});

document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('confirm').style.display = 'none';
});