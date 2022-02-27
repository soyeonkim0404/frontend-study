const searchEl = document.querySelector('.search');
const searchIuputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', () => {
    searchIuputEl.focus();
});

searchIuputEl.addEventListener('focus', () => {
    searchEl.classList.add('focused');
    searchIuputEl.setAttribute('placeholder', '통합검색');
});

searchIuputEl.addEventListener('blur', () => {
    searchEl.classList.remove('focused');
    searchIuputEl.setAttribute('placeholder', '');
});
