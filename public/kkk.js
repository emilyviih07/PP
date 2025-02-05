document.getElementById('form-gasto').addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = document.getElementById('valor').value;
    const categoria = document.getElementById('categoria').value;

    const novoGasto = { descricao, valor, categoria };

    // Enviar para o servidor
    fetch('/adicionar-gasto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(novoGasto)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('mensagem').innerHTML = data.message;
        carregarGastos();
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});

function carregarGastos() {
    fetch('/gastos')
        .then(response => response.json())
        .then(data => {
            const listaGastos = document.getElementById('lista-gastos');
            listaGastos.innerHTML = '';

            data.forEach(gasto => {
                const li = document.createElement('li');
                li.textContent = `${gasto.descricao} - R$${gasto.valor.toFixed(2)} - ${gasto.categoria}`;
                listaGastos.appendChild(li);
            });
        });
}

// Carregar os gastos ao iniciar a página
carregarGastos();