const mensagem = document.getElementById('mensagem');
const dados = document.getElementById('dados');
const botaoDeletar = document.getElementById('deletar');
let pessoaSelecionada = null;

function buscarDados(cpf) {
    fetch(`pessoas?cpf=${encodeURIComponent(cpf)}`)
        .then(response => response.json())
        .then(data => {
            pessoaSelecionada = data[0] || null;
            mensagem.textContent = '';
            mensagem.className = '';

            if (pessoaSelecionada) {
                dados.innerHTML = `
                    <p><strong>Nome:</strong> ${pessoaSelecionada.nome} ${pessoaSelecionada.sobrenome}</p>
                    <p><strong>CPF:</strong> ${pessoaSelecionada.cpf}</p>
                    <p><strong>E-mail:</strong> ${pessoaSelecionada.email}</p>
                    <p><strong>Cidade:</strong> ${pessoaSelecionada.cidade} - ${pessoaSelecionada.estado}</p>`;
                botaoDeletar.hidden = false;
            } else {
                dados.innerHTML = '';
                botaoDeletar.hidden = true;
                mensagem.textContent = 'Pessoa não encontrada!';
                mensagem.className = 'erro';
            }
        });
}

document.getElementById('form-busca').addEventListener('submit', function (e) {
    e.preventDefault();
    buscarDados(document.getElementById('cpfBusca').value.trim());
});

botaoDeletar.addEventListener('click', function () {
    if (!pessoaSelecionada) return;

    fetch(`pessoas/${pessoaSelecionada.id}`, { method: 'DELETE' })
        .then(() => {
            dados.innerHTML = '';
            botaoDeletar.hidden = true;
            document.getElementById('cpfBusca').value = '';
            mensagem.textContent = 'Cadastro excluído com sucesso!';
            mensagem.className = 'sucesso';
            pessoaSelecionada = null;
        })
        .catch(() => {
            mensagem.textContent = 'Erro ao excluir.';
            mensagem.className = 'erro';
        });
});

const cpfUrl = new URLSearchParams(window.location.search).get('cpf');
if (cpfUrl) {
    document.getElementById('cpfBusca').value = cpfUrl;
    buscarDados(cpfUrl);
}
