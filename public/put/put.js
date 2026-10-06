const campos = ['cpf', 'nome', 'sobrenome', 'email', 'idade', 'telefone', 'rua', 'bairro', 'cidade', 'estado', 'rg'];
const mensagem = document.getElementById('mensagem');

function buscarDados(cpf) {
    fetch(`pessoas?cpf=${encodeURIComponent(cpf)}`)
        .then(response => response.json())
        .then(data => {
            const pessoaEncontrada = data[0];

            if (pessoaEncontrada) {
                document.getElementById('id').value = pessoaEncontrada.id;
                campos.forEach(campo => document.getElementById(campo).value = pessoaEncontrada[campo] ?? '');
                mensagem.textContent = '';
                mensagem.className = '';
            } else {
                document.getElementById('form-put').reset();
                mensagem.textContent = 'Pessoa não encontrada!';
                mensagem.className = 'erro';
            }
        });
}

document.getElementById('form-busca').addEventListener('submit', function (e) {
    e.preventDefault();
    buscarDados(document.getElementById('cpfBusca').value.trim());
});

document.getElementById('form-put').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = document.getElementById('id').value;
    if (!id) {
        mensagem.textContent = 'Busque uma pessoa pelo CPF antes de atualizar.';
        mensagem.className = 'erro';
        return;
    }

    const pessoa = {};
    campos.forEach(campo => pessoa[campo] = document.getElementById(campo).value.trim());
    pessoa.idade = Number(pessoa.idade);
    pessoa.estado = pessoa.estado.toUpperCase();

    fetch(`pessoas/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoa)
    })
        .then(response => response.json())
        .then(() => {
            document.getElementById('form-put').reset();
            document.getElementById('cpfBusca').value = '';
            mensagem.textContent = 'Cadastro atualizado com sucesso!';
            mensagem.className = 'sucesso';
        })
        .catch(() => {
            mensagem.textContent = 'Erro ao atualizar.';
            mensagem.className = 'erro';
        });
});

const cpfUrl = new URLSearchParams(window.location.search).get('cpf');
if (cpfUrl) {
    document.getElementById('cpfBusca').value = cpfUrl;
    buscarDados(cpfUrl);
}
