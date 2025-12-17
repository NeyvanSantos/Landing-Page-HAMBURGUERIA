/* ============================================================
   1. MENU HAMBÚRGUER
   ============================================================ */
const botaoMenu = document.querySelector('#botão-hamburguer');
const menu = document.querySelector('.nav-list');

botaoMenu.addEventListener('click', () => {
    menu.classList.toggle('active');
    // Alterna o ícone entre as barras e o X
    botaoMenu.classList.toggle('fa-bars');
    botaoMenu.classList.toggle('fa-xmark');
});

/* ============================================================
   2. LÓGICA DO CARRINHO (LOCALSTORAGE)
   ============================================================ */

// Função que atualiza o número vermelho no ícone do carrinho
function atualizarContadorNaTela() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const badgeContador = document.getElementById('carrinho-count');
    
    if (badgeContador) {
        // Calcula a soma de todas as quantidades
        const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
        badgeContador.innerText = totalItens;

        // Esconde a bolinha se o carrinho estiver vazio
        if (totalItens === 0) {
            badgeContador.style.display = 'none';
        } else {
            badgeContador.style.display = 'block';
            
            // Pequena animação de "pulo" ao adicionar
            badgeContador.classList.add('animar');
            setTimeout(() => {
                badgeContador.classList.remove('animar');
            }, 300);
        }
    }
}


function mostrarAlertaCustomizado(mensagem) {
    const alerta = document.getElementById('alerta-customizado');
    const msgTexto = document.getElementById('alerta-mensagem');
    
    msgTexto.innerText = mensagem;
    alerta.classList.add('mostrar');

    // Remove o alerta depois de 3 segundos
    setTimeout(() => {
        alerta.classList.remove('mostrar');
    }, 3000);
}

function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const itemExiste = carrinho.find(item => item.nome === produto.nome);

    if (itemExiste) {
        itemExiste.quantidade++;
    } else {
        carrinho.push(produto);
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    
    // CHAMADA DO NOVO ALERTA (Substituindo o alert antigo)
    mostrarAlertaCustomizado(`${produto.nome} foi para o carrinho! 🍔`);
    
    atualizarContadorNaTela();
}

/* ============================================================
   3. EVENTOS DE CLIQUE
   ============================================================ */
const botoesComprar = document.querySelectorAll('.botão-compre');

botoesComprar.forEach((botao) => {
    botao.addEventListener('click', (event) => {
        // Se for o botão do cardápio inicial, ele não deve adicionar nada ao carrinho
        if (botao.innerText.includes("CARDÁPIO")) return;

        event.preventDefault();

        // Pega as informações do card onde o botão foi clicado
        const card = botao.closest('.produto');
        const nome = card.querySelector('h2').innerText;
        const preco = card.querySelector('.preço').innerText; // Corrigido as aspas
        const imagem = card.querySelector('img').src;

        // Cria o objeto do produto
        const produto = { 
            nome: nome, 
            preco: preco, 
            imagem: imagem, 
            quantidade: 1 
        };

        adicionarAoCarrinho(produto);
    });
});

// Executa ao carregar a página para o número não sumir no F5
document.addEventListener('DOMContentLoaded', atualizarContadorNaTela);

// 1. Faz a página aparecer ao carregar
window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('pagina-carregada');
});

// 2. Transição suave ao clicar no link do carrinho
const linkCarrinho = document.querySelector('.cart-link'); // Certifique-se que o link tem essa classe

if (linkCarrinho) {
    linkCarrinho.addEventListener('click', function(e) {
        e.preventDefault(); // Impede a troca imediata de página
        const destino = this.href; // Guarda o link do carrinho

        document.body.classList.add('fade-out'); // Começa o efeito de sumir

        // Espera 500ms (tempo da transição) e depois muda de página
        setTimeout(() => {
            window.location.href = destino;
        }, 500);
    });
}