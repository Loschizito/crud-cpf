const tabela = document.getElementById('tabela-corpo');
const mensagem = document.getElementById('mensagem');

function listar(cpf) {
    const url = cpf ? `pessoas?cpf=${encodeURIComponent(cpf)}` : 'pessoas';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            tabela.innerHTML = '';
            mensagem.textContent = '';
            mensagem.className = '';

            if (data.length === 0) {
                mensagem.textContent = cpf ? 'Nenhuma pessoa encontrada com esse CPF.' : 'Nenhum cadastro.';
                mensagem.className = 'erro';
                return;
            }

            data.forEach(objeto => {
                const cpfUrl = encodeURIComponent(objeto.cpf);
                tabela.innerHTML += `<tr>
                    <td>${objeto.id}</td>
                    <td>${objeto.cpf}</td>
                    <td>${objeto.nome}</td>
                    <td>${objeto.sobrenome}</td>
                    <td>${objeto.email}</td>
                    <td>${objeto.idade}</td>
                    <td>${objeto.telefone}</td>
                    <td>${objeto.rua}</td>
                    <td>${objeto.bairro}</td>
                    <td>${objeto.cidade}</td>
                    <td>${objeto.estado}</td>
                    <td>${objeto.rg}</td>
                    <td class="acoes">
                        <a href="put.html?cpf=${cpfUrl}">Editar</a>
                        <a href="delete.html?cpf=${cpfUrl}" class="perigo">Excluir</a>
                    </td>
                </tr>`;
            });
        })
        .catch(() => {
            mensagem.textContent = 'Erro ao carregar os dados.';
            mensagem.className = 'erro';
        });
}

document.getElementById('form-busca').addEventListener('submit', function (e) {
    e.preventDefault();
    listar(document.getElementById('cpfBusca').value.trim());
});

document.getElementById('limpar').addEventListener('click', function () {
    document.getElementById('cpfBusca').value = '';
    listar();
});

listar();
