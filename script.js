const botão = document.querySelector('#botão-hamburguer');
const menu = document.querySelector('.nav-list')

botão.addEventListener('click', () => {
    menu.classList.toggle('active')

    botão.classList.toggle('fa-bars')
    botão.classList.toggle('fa-xmark')
})