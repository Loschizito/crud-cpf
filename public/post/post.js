const campos = ['cpf', 'nome', 'sobrenome', 'email', 'idade', 'telefone', 'rua', 'bairro', 'cidade', 'estado', 'rg'];
const mensagem = document.getElementById('mensagem');

document.getElementById('form-post').addEventListener('submit', function (e) {
    e.preventDefault();

    const pessoa = {};
    campos.forEach(campo => pessoa[campo] = document.getElementById(campo).value.trim());
    pessoa.idade = Number(pessoa.idade);
    pessoa.estado = pessoa.estado.toUpperCase();

    fetch(`pessoas?cpf=${encodeURIComponent(pessoa.cpf)}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                mensagem.textContent = 'Já existe um cadastro com esse CPF.';
                mensagem.className = 'erro';
                return;
            }

            return fetch('pessoas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pessoa)
            })
                .then(response => response.json())
                .then(() => {
                    document.getElementById('form-post').reset();
                    mensagem.textContent = 'Pessoa cadastrada com sucesso!';
                    mensagem.className = 'sucesso';
                });
        })
        .catch(() => {
            mensagem.textContent = 'Erro ao cadastrar.';
            mensagem.className = 'erro';
        });
});
