const botão = document.querySelector('#botão-hamburguer');
const menu = document.querySelector('.nav-list')

botão.addEventListener('click', () => {
    menu.classList.toggle('active')

    botão.classList.toggle('fa-bars')
    botão.classList.toggle('fa-xmark')
})


  // 1. Inicializa o contador
        let totalItensNoCarrinho = 0;

        // 2. Pega os elementos do DOM
        // O span onde o número aparece
        const badgeContador = document.getElementById('carrinho-count');
        // Todos os botões de "Adicionar" da página
        const botoesAdicionar = document.querySelectorAll('.botão-compre');

        // 3. Função que atualiza a tela
        function atualizarContadorNaTela() {
            badgeContador.innerText = totalItensNoCarrinho;
            
            // Dica extra: Esconde a bolinha se for zero
            if (totalItensNoCarrinho === 0) {
                badgeContador.style.display = 'none';
            } else {
                badgeContador.style.display = 'block';
            }

            // Adiciona uma animação visual de "pulo"
            badgeContador.classList.add('animar');
             // Remove a classe da animação depois que ela termina para poder rodar de novo
            setTimeout(() => {
                 badgeContador.classList.remove('animar');
            }, 300);
        }

        // 4. Adiciona o evento de clique em CADA botão de adicionar
        botoesAdicionar.forEach(botao => {
            botao.addEventListener('click', function() {
                // Incrementa a variável lógica
                totalItensNoCarrinho++; 
                
                // Chama a função que muda o HTML
                atualizarContadorNaTela(); 
            });
        });

