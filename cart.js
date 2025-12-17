function carregarCarrinho() {
    const container = document.getElementById('itens-carrinho');
    const totalElemento = document.getElementById('valor-total');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    
    container.innerHTML = '';
    let totalGeral = 0;

    if (carrinho.length === 0) {
        container.innerHTML = '<p>Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach((item, index) => {
        // Converte o preço "R$ 35,00" em número para cálculo
        const precoNumerico = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
        totalGeral += precoNumerico * item.quantidade;

        container.innerHTML += `
            <div class="item-carrinho">
                <img src="${item.imagem}" alt="${item.nome}">
                <div>
                    <h4>${item.nome}</h4>
                    <p>${item.preco} x ${item.quantidade}</p>
                </div>
                <button onclick="removerItem(${index})" style="background:none; border:none; color:red; cursor:pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalElemento.innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;
}

function removerItem(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

document.addEventListener('DOMContentLoaded', carregarCarrinho);

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

const btnLimpar = document.getElementById('btn-limpar-carrinho');

if (btnLimpar) {
    btnLimpar.addEventListener('click', () => {
        // Pergunta se o usuário tem certeza (segurança)
        const confirmacao = confirm("Deseja realmente esvaziar seu carrinho?");
        
        if (confirmacao) {
            // 1. Remove os dados do LocalStorage
            localStorage.removeItem('carrinho');
            
            // 2. Chama as funções de atualização que já criamos
            carregarCarrinho(); // Limpa a lista na página
            atualizarContadorNaTela(); // Zera a bolinha vermelha no topo
            
            // 3. Opcional: Alerta customizado de sucesso
            if (typeof mostrarAlertaCustomizado === "function") {
                mostrarAlertaCustomizado("Carrinho esvaziado! 🗑️");
            }
        }
    });
}