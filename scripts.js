document.addEventListener('DOMContentLoaded', () => {
    const grade = document.querySelector('.grade');
    const movimentosExibicao = document.getElementById('movimentos');
    const paresEncontradosExibicao = document.getElementById('pares-encontrados');
    const botaoReiniciar = document.getElementById('botao-reiniciar');

    const imagens = [
        'tutu1',
        'tutu2',
        'tutu3',
        'tutu4',
        'tutu5',
        'tutu6',
        'tutu7',
        'tutu8',
    ];

    let primeiraCarta = null;
    let segundaCarta = null;
    let bloqueiaClique = false;
    let movimentos = 0;
    let paresEncontrados = 0;

    const atualizaInformacoes = () => {
        movimentosExibicao.textContent = `Movimentos: ${movimentos}`;
        paresEncontradosExibicao.textContent = `Pares encontrados: ${paresEncontrados}`;
    };

    const verificaFimDoJogo = () => {
        if (paresEncontrados === 8) {
            setTimeout(() => alert("Parabéns, você venceu!"), 300);
        }
    };

    const checarPar = () => {
        const primeiraImagem = primeiraCarta.getAttribute('data-imagem');
        const segundaImagem = segundaCarta.getAttribute('data-imagem');

        if (primeiraImagem === segundaImagem) {
            primeiraCarta.classList.add('carta-desabilitada');
            segundaCarta.classList.add('carta-desabilitada');
            paresEncontrados++;
            movimentos++;
            verificaFimDoJogo();
            resetarCartas();
        } else {
            // Adiciona um delay para que o jogador veja a segunda carta antes de cobrir novamente
            setTimeout(() => {
                primeiraCarta.classList.remove('revela-carta');
                segundaCarta.classList.remove('revela-carta');
                movimentos++;
                resetarCartas();
            }, 1000); // Tempo mais longo para o jogador visualizar as cartas antes de cobri-las
        }
        atualizaInformacoes();
    };

    const revelarCarta = ({ target }) => {
        if (bloqueiaClique) return; // Impede que o jogador clique enquanto a checagem está acontecendo
        if (target.parentNode.className.includes('revela-carta') || target.parentNode.className.includes('carta-desabilitada')) {
            return;
        }

        target.parentNode.classList.add('revela-carta');

        if (!primeiraCarta) {
            primeiraCarta = target.parentNode;
        } else {
            segundaCarta = target.parentNode;
            bloqueiaClique = true; // Bloqueia novos cliques até a checagem terminar
            checarPar();
        }
    };

    const criaElemento = (tag, nomeClasse) => {
        const elemento = document.createElement(tag);
        elemento.className = nomeClasse;
        return elemento;
    };

    const criaCarta = (imagem) => {
        const carta = criaElemento('div', 'carta');
        const frente = criaElemento('div', 'face frente');
        const costas = criaElemento('div', 'face costas');

        frente.style.backgroundImage = `url('./img/${imagem}.jfif')`;

        carta.appendChild(frente);
        carta.appendChild(costas);

        carta.addEventListener('click', revelarCarta);
        carta.setAttribute('data-imagem', imagem);

        return carta;
    };

    const carregarJogo = () => {
        grade.innerHTML = ''; // Limpa a grade para reiniciar o jogo
        const duplicadas = [...imagens, ...imagens];
        const embaralhadas = duplicadas.sort(() => Math.random() - 0.5);

        embaralhadas.forEach((imagem) => {
            const carta = criaCarta(imagem);
            grade.appendChild(carta);
        });

        movimentos = 0;
        paresEncontrados = 0;
        atualizaInformacoes();
    };

    const resetarCartas = () => {
        primeiraCarta = null;
        segundaCarta = null;
        bloqueiaClique = false;
    };

    botaoReiniciar.addEventListener('click', carregarJogo);

    carregarJogo(); // Inicializa o jogo ao carregar a página
});