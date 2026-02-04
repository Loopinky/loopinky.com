document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.menu').classList.toggle('active');
    this.classList.toggle('active');
});

document.querySelectorAll('.menu a').forEach(function(a) {
    a.addEventListener('click', function() {
        document.querySelector('.menu').classList.remove('active');
        document.querySelector('.hamburger').classList.remove('active');
    });
});
