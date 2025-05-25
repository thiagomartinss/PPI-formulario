import express from 'express';

const host = "0.0.0.0";
const port = 3000;
var clientes = [];
var fornecedores = [];

const app = express();

app.use(express.urlencoded({ extended: true }));//processar o formulario

app.get("/", (requisicao, resposta) => {
    resposta.send(`
            <!DOCTYPE html>
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                        <div class="container-fluid">
                            <a class="navbar-brand" href="#">Menu principal</a>
                            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse" id="navbarNav">
                                <ul class="navbar-nav">
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Cadastros</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="/cadastroCliente">Cadastros de Cliente</a></li>
                                            <li><a class="dropdown-item" href="/cadastroFornecedor">Cadastros de fornecedor</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">Listagem</a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="/listaClientes">Lista de clientes</a></li>
                                            <li><a class="dropdown-item" href="/listarFornecedores">Lista de Fornecedores</a></li>
                                        </ul>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="/logout">Sair</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>
        `);
    resposta.end();
});

app.get("/cadastroCliente", (requisicao, resposta) => {
    resposta.send(`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <main class="container w-75 mt-5">
                        <form method="POST" action="/cadastroCliente" class="row g-3 needs-validation border p-4" novalidate>
                            <h2 class="text-center">Cadastro de cliente</h2>
                            <div class="form-floating col-md-4">
                                <input type="text" class="form-control" id="primeiroNome" name="primeiroNome" placeholder="Primeiro nome" required>
                                <label for="primeiroNome" class="form-label">Primeiro nome</label>
                            </div>
                            <div class="form-floating col-md-4">
                                <input type="text" class="form-control" id="ultimoNome" name="ultimoNome" placeholder="Último nome" required>
                                <label for="ultimoNome" class="form-label">Último nome</label>
                            </div>
                            <div class="form-floating col-md-4">
                                <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(99) 99999-9999" required>
                                <label for="telefone">Telefone</label>
                            </div>
                            <div class="form-floating col-md-6">
                                <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" required>
                                <label for="cidade" class="form-label">Cidade</label>
                            </div>
                            <div class="form-floating col-md-3">
                                <select class="form-select" id="uf" name="uf" required>
                                    <option selected disabled value=""></option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PR">PR</option>
                                    <option value="RJ">RJ</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                </select>
                                <label for="uf" class="form-label">UF</label>
                            </div>
                            <div class="form-floating col-md-3">
                                <input type="text" class="form-control" id="cep" name="cep" required>
                                <label for="cep" class="form-label">CEP</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com">
                                <label for="email">Email</label>
                            </div>
                            <div class="form-floating col-md-6">
                                <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha">
                                <label for="senha">Senha</label>
                            </div>
                            <div class="form-floating col-md-6">
                                <input type="password" class="form-control" id="confirmSenha" name="confirmSenha" placeholder="Password">
                                <label for="confirmSenha">Confirmar senha</label>
                            </div>
                            <div class="form-floating col-md-4 mb-3">
                                <select class="form-select" id="contato" name="contato" required aria-label="Preferência de contato">
                                    <option value=""></option>
                                    <option value="Manhã">Manhã</option>
                                    <option value="Tarde">Tarde</option>
                                    <option value="Noite">Noite</option>
                                </select>
                                <label for="contato">Preferência de contato</label>
                            </div>
                            <div class="form-floating col-md-4 mb-3">
                                <select class="form-select" id="tpCliente" name="tpCliente" required aria-label="Tipo do cliente">
                                    <option value=""></option>
                                    <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                    <option value="Pessoa Física">Pessoa Física</option>
                                </select>
                                <label for="tpCliente">Tipo do cliente</label>
                            </div>
                            <div class="form-floating col-md-4 mb-3">
                                <select class="form-select" id="unidade" name="unidade" required aria-label="Unidade">
                                    <option value=""></option>
                                    <option value="Matriz">Matriz</option>
                                    <option value="Filial SP">Filial SP</option>
                                    <option value="Filial PR">Filial PR</option>
                                </select>
                                <label for="acesso">Selecione a unidade preferêncial</label>
                            </div>
                            <div class="form-floating col-md-8">
                                <textarea class="form-control" placeholder="Observação" id="obs" name="obs"></textarea>
                                <label for="obs">Observação do cliente</label>
                            </div>
                            <div class="form-floating col-md-4">
                                <input type="date" class="form-control" id="nascimento" name="nascimento" placeholder="Data de nascimento" required>
                                <label for="nascimento">Data de nascimento</label>
                            </div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="SIM" id="check" name="check" checked>
                                    <label class="form-check-label" for="check">Permite entrar em contato</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-success" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>
        `);
    resposta.end();
});

app.get("/cadastroFornecedor", (requisicao, resposta) => {
    resposta.send(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                <title>Cadastro de Fornecedor</title>
            </head>
            <body>
                <main class="container w-75 mt-5">
                    <form method="POST" action="/cadastroFornecedor" class="row g-3 needs-validation border p-4" novalidate>
                        <h2 class="text-center">Cadastro de Fornecedor</h2>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="CNPJ" required>
                            <label for="cnpj" class="form-label">CNPJ</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" required>
                            <label for="razaoSocial" class="form-label">Razão Social ou Nome do Fornecedor</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" required>
                            <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Endereço" required>
                            <label for="endereco" class="form-label">Endereço</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" required>
                            <label for="cidade" class="form-label">Cidade</label>
                        </div>
                        <div class="form-floating col-md-3">
                            <select class="form-select" id="uf" name="uf" required>
                                <option selected disabled value=""></option>
                                <option value="MT">MT</option>
                                <option value="MS">MS</option>
                                <option value="MG">MG</option>
                                <option value="PR">PR</option>
                                <option value="RJ">RJ</option>
                                <option value="SC">SC</option>
                                <option value="SP">SP</option>
                            </select>
                            <label for="uf" class="form-label">UF</label>
                        </div>
                        <div class="form-floating col-md-3">
                            <input type="text" class="form-control" id="cep" name="cep" required>
                            <label for="cep" class="form-label">CEP</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com">
                            <label for="email">Email</label>
                        </div>
                        <div class="form-floating col-md-6">
                            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(99) 99999-9999" required>
                            <label for="telefone">Telefone</label>
                        </div>
                        <div class="col-12">
                            <button class="btn btn-success" type="submit">Cadastrar</button>
                            <a class="btn btn-secondary" href="/">Voltar</a>
                        </div>
                    </form>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
        </html>
    `);
    resposta.end();
});


app.post("/cadastroCliente", (requisicao, resposta) => {
    const nome = requisicao.body.primeiroNome;
    const sobrenome = requisicao.body.ultimoNome;
    const telefone = requisicao.body.telefone;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const contato = requisicao.body.contato;
    const tpCliente = requisicao.body.tpCliente;
    const unidade = requisicao.body.unidade;
    const obs = requisicao.body.obs;
    const nascimento = requisicao.body.nascimento;
    const check = requisicao.body.check;
    const senha = requisicao.body.senha;
    const confirmSenha = requisicao.body.confirmSenha;

    if(nome && sobrenome && telefone && cidade && uf && cep && email && contato && tpCliente && unidade && nascimento){
        clientes.push({
            nome: nome,
            sobrenome: sobrenome,
            telefone: telefone,
            cidade: cidade,
            uf: uf,
            cep: cep,
            email: email,
            contato: contato,
            tpCliente: tpCliente,
            unidade: unidade,
            obs: obs,
            nascimento: nascimento,
            check: check
        });
        resposta.redirect("/listaClientes");
    }else{
        var conteudo = `
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <main class="container w-75 mt-5">
                        <form method="POST" action="/cadastroCliente" class="row g-3 needs-validation border p-4" novalidate>
                            <h2 class="text-center">Cadastro de cliente</h2>
                            <div class="form-floating col-md-4">`;
                                if(!nome){
                                    conteudo +=`
                                    <input type="text" class="form-control" id="primeiroNome" name="primeiroNome" placeholder="Primeiro nome" required>
                                    <label for="primeiroNome" class="form-label">Primeiro nome</label>
                                    <span class="text-danger">Digite o nome</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="text" class="form-control" id="primeiroNome" name="primeiroNome" value="${primeiroNome}" placeholder="Primeiro nome" required>
                                    <label for="primeiroNome" class="form-label">Primeiro nome</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-4">`;
                                if(!sobrenome){
                                    conteudo +=`
                                    <input type="text" class="form-control" id="ultimoNome" name="ultimoNome" placeholder="Último nome" required>
                                    <label for="ultimoNome" class="form-label">Último nome</label>
                                    <span class="text-danger">Digite o último nome</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="text" class="form-control" id="ultimoNome" name="ultimoNome" value="${sobrenome}" placeholder="Último nome" required>
                                    <label for="ultimoNome" class="form-label">Último nome</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-4">`;
                                if(!telefone){
                                    conteudo +=`
                                    <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(99) 99999-9999" required>
                                    <label for="telefone">Telefone</label>
                                    <span class="text-danger">Digite o telefone</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}" placeholder="(99) 99999-9999" required>
                                    <label for="telefone">Telefone</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-6">`;
                                if(!cidade){
                                    conteudo +=`
                                    <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" required>
                                    <label for="cidade" class="form-label">Cidade</label>
                                    <span class="text-danger">Digite a cidade</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" placeholder="Cidade" required>
                                    <label for="cidade" class="form-label">Cidade</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-3">`;
                                if(!uf){
                                    conteudo +=`
                                            <select class="form-select" id="uf" name="uf" required>
                                                <option selected disabled value=""></option>
                                                <option value="MT">MT</option>
                                                <option value="MS">MS</option>
                                                <option value="MG">MG</option>
                                                <option value="PR">PR</option>
                                                <option value="RJ">RJ</option>
                                                <option value="SC">SC</option>
                                                <option value="SP">SP</option>
                                            </select>
                                            <label for="uf" class="form-label">UF</label>
                                            <span class="text-danger">Selecione o estado</span>`;
                                            
                                }else{
                                    conteudo +=`
                                    <select class="form-select" id="uf" name="uf" required>
                                        <option selected disabled value=""></option>
                                        <option ${uf == 'MT' ? 'selected' : ''} value="MT">MT</option>
                                        <option ${uf == 'MS' ? 'selected' : ''} value="MS">MS</option>
                                        <option ${uf == 'MG' ? 'selected' : ''} value="MG">MG</option>
                                        <option ${uf == 'PR' ? 'selected' : ''} value="PR">PR</option>
                                        <option ${uf == 'RJ' ? 'selected' : ''} value="RJ">RJ</option>
                                        <option ${uf == 'SC' ? 'selected' : ''} value="SC">SC</option>
                                        <option ${uf == 'SP' ? 'selected' : ''} value="SP">SP</option>                                  
                                   </select>
                                   <label for="uf" class="form-label">UF</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-3">`;
                                if(!cep){
                                    conteudo +=`
                                    <input type="text" class="form-control" id="cep" name="cep" required>
                                    <label for="cep" class="form-label">CEP</label>
                                    <span class="text-danger">Digite o CEP</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>
                                    <label for="cep" class="form-label">CEP</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating mb-3">`;
                                if(!email){
                                    conteudo +=`
                                    <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com">
                                    <label for="email">Email</label>
                                    <span class="text-danger">Digite o CEP</span>`;
                                }else{
                                    conteudo+=`
                                    <input type="email" class="form-control" id="email" name="email" value="${email}" placeholder="name@email.com">
                                    <label for="email">Email</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-6">`;
                                if(!senha){
                                    conteudo +=`
                                    <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha">
                                    <label for="senha">Senha</label>
                                    <span class="text-danger">Digite a senha</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="password" class="form-control" id="senha" name="senha" value="${senha}" placeholder="Senha">
                                    <label for="senha">Senha</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-6">`;
                                if(!confirmSenha){
                                    conteudo +=`
                                    <input type="password" class="form-control" id="confirmSenha" name="confirmSenha" placeholder="Password">
                                    <label for="confirmSenha">Confirmar senha</label>
                                    <span class="text-danger">Digite a confirmação da senha</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="password" class="form-control" id="confirmSenha" name="confirmSenha" value="${confirmSenha}" placeholder="Password">
                                    <label for="confirmSenha">Confirmar senha</label>`;
                                }
                            conteudo+=`</div>
                            <div class="form-floating col-md-4 mb-3">`;
                                if(!contato){
                                    conteudo +=`
                                    <select class="form-select" id="contato" name="contato" required aria-label="Preferência de contato">
                                        <option value=""></option>
                                        <option value="Manhã">Manhã</option>
                                        <option value="Tarde">Tarde</option>
                                        <option value="Noite">Noite</option>
                                    </select>
                                    <label for="contato">Preferência de contato</label>
                                    <span class="text-danger">Selecione a preferência de contato</span>`;
                                }else{
                                    conteudo +=`
                                    <select class="form-select" id="contato" name="contato" required aria-label="Preferência de contato">
                                        <option value=""></option>
                                        <option ${contato == 'Manhã' ? 'selected' : ''} value="Manhã">Manhã</option>
                                        <option ${contato == 'Tarde' ? 'selected' : ''} value="Tarde">Tarde</option>
                                        <option ${contato == 'Noite' ? 'selected' : ''} value="Noite">Noite</option>
                                    </select>
                                    <label for="contato">Preferência de contato</label>`;
                                }
                            conteudo +=`</div>
                            <div class="form-floating col-md-4 mb-3">`;
                                if(!tpCliente){
                                    conteudo +=`
                                    <select class="form-select" id="tpCliente" name="tpCliente" required aria-label="Tipo do cliente">
                                        <option value=""></option>
                                        <option value="Pessoa Jurídica">Pessoa Jurídica</option>
                                        <option value="Pessoa Física">Pessoa Física</option>
                                    </select>
                                    <label for="tpCliente">Tipo do cliente</label>
                                    <span class="text-danger">Selecione o tipo de cliente</span>`;
                                }else{
                                    conteudo +=`
                                    <select class="form-select" id="tpCliente" name="tpCliente" required aria-label="Tipo do cliente">
                                        <option value=""></option>
                                        <option ${tpCliente == 'Pessoa Jurídica' ? 'selected' : ''} value="Pessoa Jurídica">Pessoa Jurídica</option>
                                        <option ${tpCliente == 'Pessoa Física' ? 'selected' : ''} value="Pessoa Física">Pessoa Física</option>
                                    </select>
                                    <label for="tpCliente">Tipo do cliente</label>`;
                                }
                            conteudo +=`</div>
                            <div class="form-floating col-md-4 mb-3">`;
                                if(!unidade){
                                    conteudo +=`
                                    <select class="form-select" id="unidade" name="unidade" required aria-label="Unidade">
                                        <option value=""></option>
                                        <option value="Matriz">Matriz</option>
                                        <option value="Filial SP">Filial SP</option>
                                        <option value="Filial PR">Filial PR</option>
                                    </select>
                                    <label for="acesso">Selecione a unidade preferêncial</label>
                                    <span class="text-danger">Selecione a unidade preferêncial</span>`;
                                }else{
                                    conteudo +=`
                                    <select class="form-select" id="unidade" name="unidade" required aria-label="Unidade">
                                        <option value=""></option>
                                        <option ${unidade == 'Matriz' ? 'selected' : ''} value="Matriz">Matriz</option>
                                        <option ${unidade == 'Filial SP' ? 'selected' : ''} value="Filial SP">Filial SP</option>
                                        <option ${unidade == 'Filial PR' ? 'selected' : ''} value="Filial PR">Filial PR</option>
                                    </select>
                                    <label for="acesso">Selecione a unidade preferêncial</label>`;
                                }
                            conteudo +=`</div>
                            <div class="form-floating col-md-8">
                                <textarea class="form-control" placeholder="Observação" id="obs" name="obs"></textarea>
                                <label for="obs">Observação do cliente</label>
                            </div>
                            <div class="form-floating col-md-4">`;
                                if(!nascimento){
                                    conteudo +=`
                                    <input type="date" class="form-control" id="nascimento" name="nascimento" placeholder="Data de nascimento" required>
                                    <label for="nascimento">Data de nascimento</label>
                                    <span class="text-danger">Digite a data de nascimento</span>`;
                                }else{
                                    conteudo +=`
                                    <input type="date" class="form-control" id="nascimento" name="nascimento" value="${nascimento}" placeholder="Data de nascimento" required>
                                    <label for="nascimento">Data de nascimento</label>`;
                                }
                            conteudo +=`</div>
                            <div class="col-12">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" value="SIM" id="check" name="check" checked>
                                    <label class="form-check-label" for="check">Permite entrar em contato</label>
                                </div>
                            </div>
                            <div class="col-12">
                                <button class="btn btn-success" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`;
    }
    resposta.send(conteudo);
    resposta.end();
});

app.post("/cadastroFornecedor", (requisicao, resposta) => {
    const cnpj = requisicao.body.cnpj;
    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    if(cnpj && razaoSocial && nomeFantasia && endereco && cidade && uf && cep && email && telefone){
        fornecedores.push({
            cnpj: cnpj,
            razaoSocial: razaoSocial,
            nomeFantasia: nomeFantasia,
            endereco: endereco,
            cidade: cidade,
            uf: uf,
            cep: cep,
            email: email,
            telefone: telefone
        });
        resposta.redirect("/listarFornecedores");
    } else {
        var conteudo = `
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
                    <title>Cadastro de Fornecedor</title>
                </head>
                <body>
                    <main class="container w-75 mt-5">
                        <form method="POST" action="/cadastroFornecedor" class="row g-3 needs-validation border p-4" novalidate>
                            <h2 class="text-center">Cadastro de Fornecedor</h2>                          
                            <div class="form-floating col-md-6">`;
                                if(!cnpj){
                                    conteudo += `
                                    <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="CNPJ" required>
                                    <label for="cnpj">CNPJ</label>
                                    <span class="text-danger">Digite o CNPJ</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="cnpj" name="cnpj" value="${cnpj}" placeholder="CNPJ" required>
                                    <label for="cnpj">CNPJ</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!razaoSocial){
                                    conteudo += `
                                    <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Razão Social" required>
                                    <label for="razaoSocial">Razão Social ou Nome do Fornecedor</label>
                                    <span class="text-danger">Digite a Razão Social</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" value="${razaoSocial}" placeholder="Razão Social" required>
                                    <label for="razaoSocial">Razão Social ou Nome do Fornecedor</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!nomeFantasia){
                                    conteudo += `
                                    <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome Fantasia" required>
                                    <label for="nomeFantasia">Nome Fantasia</label>
                                    <span class="text-danger">Digite o Nome Fantasia</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" value="${nomeFantasia}" placeholder="Nome Fantasia" required>
                                    <label for="nomeFantasia">Nome Fantasia</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!endereco){
                                    conteudo += `
                                    <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Endereço" required>
                                    <label for="endereco">Endereço</label>
                                    <span class="text-danger">Digite o Endereço</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="endereco" name="endereco" value="${endereco}" placeholder="Endereço" required>
                                    <label for="endereco">Endereço</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!cidade){
                                    conteudo += `
                                    <input type="text" class="form-control" id="cidade" name="cidade" placeholder="Cidade" required>
                                    <label for="cidade">Cidade</label>
                                    <span class="text-danger">Digite a Cidade</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}" placeholder="Cidade" required>
                                    <label for="cidade">Cidade</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-3">`;
                                if(!uf){
                                    conteudo += `
                                    <select class="form-select" id="uf" name="uf" required>
                                        <option selected disabled value=""></option>
                                        <option value="MT">MT</option>
                                        <option value="MS">MS</option>
                                        <option value="MG">MG</option>
                                        <option value="PR">PR</option>
                                        <option value="RJ">RJ</option>
                                        <option value="SC">SC</option>
                                        <option value="SP">SP</option>
                                    </select>
                                    <label for="uf">UF</label>
                                    <span class="text-danger">Selecione o Estado</span>`;
                                } else {
                                    conteudo += `
                                    <select class="form-select" id="uf" name="uf" required>
                                        <option selected disabled value=""></option>
                                        <option ${uf == 'MT' ? 'selected' : ''} value="MT">MT</option>
                                        <option ${uf == 'MS' ? 'selected' : ''} value="MS">MS</option>
                                        <option ${uf == 'MG' ? 'selected' : ''} value="MG">MG</option>
                                        <option ${uf == 'PR' ? 'selected' : ''} value="PR">PR</option>
                                        <option ${uf == 'RJ' ? 'selected' : ''} value="RJ">RJ</option>
                                        <option ${uf == 'SC' ? 'selected' : ''} value="SC">SC</option>
                                        <option ${uf == 'SP' ? 'selected' : ''} value="SP">SP</option>
                                    </select>
                                    <label for="uf">UF</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-3">`;
                                if(!cep){
                                    conteudo += `
                                    <input type="text" class="form-control" id="cep" name="cep" required>
                                    <label for="cep">CEP</label>
                                    <span class="text-danger">Digite o CEP</span>`;
                                } else {
                                    conteudo += `
                                    <input type="text" class="form-control" id="cep" name="cep" value="${cep}" required>
                                    <label for="cep">CEP</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!email){
                                    conteudo += `
                                    <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com">
                                    <label for="email">Email</label>
                                    <span class="text-danger">Digite o Email</span>`;
                                } else {
                                    conteudo += `
                                    <input type="email" class="form-control" id="email" name="email" value="${email}" placeholder="name@email.com">
                                    <label for="email">Email</label>`;
                                }
                            conteudo += `</div>
                            <div class="form-floating col-md-6">`;
                                if(!telefone){
                                    conteudo += `
                                    <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(99) 99999-9999" required>
                                    <label for="telefone">Telefone</label>
                                    <span class="text-danger">Digite o Telefone</span>`;
                                } else {
                                    conteudo += `
                                    <input type="tel" class="form-control" id="telefone" name="telefone" value="${telefone}" placeholder="(99) 99999-9999" required>
                                    <label for="telefone">Telefone</label>`;
                                }
                            conteudo += `</div>
                            <div class="col-12">
                                <button class="btn btn-success" type="submit">Cadastrar</button>
                                <a class="btn btn-secondary" href="/">Voltar</a>
                            </div>
                        </form>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
            </html>`;
        resposta.send(conteudo);
        resposta.end();
    }
});

app.get("/listaClientes", (requisicao, resposta) => {
    let conteudo =`
            <html lang="pt-br">
                <head>
                    <meta charset="UTF-8">
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
                    <title>Página inicial</title>
                </head>
                <body>
                    <main class="container-fluid p-4 mt-5">
                        <h2 class="text-center mb-3">Lista de clientes</h2>
                        <table class="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">Nome</th>
                                    <th scope="col">Sobrenome</th>
                                    <th scope="col">Tipo</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Telefone</th>
                                    <th scope="col">Data de nascimento</th>
                                    <th scope="col">Cidade</th>
                                    <th scope="col">UF</th>
                                    <th scope="col">CEP</th>
                                    <th scope="col">Unidade</th>                                  
                                    <th scope="col">Contato</th>
                                    <th scope="col">Observação</th>
                                    <th scope="col">Permite entrar em contato</th>
                                </tr>
                            </thead>
                            <tbody>`;
                               for(let i=0; i<clientes.length; i++){
                                    conteudo +=`
                                        <tr>
                                            <td>${clientes[i].nome}</td>
                                            <td>${clientes[i].sobrenome}</td>
                                            <td>${clientes[i].tpCliente}</td>
                                            <td>${clientes[i].email}</td>
                                            <td>${clientes[i].telefone}</td>
                                            <td>${clientes[i].nascimento}</td>
                                            <td>${clientes[i].cidade}</td>
                                            <td>${clientes[i].uf}</td>
                                            <td>${clientes[i].cep}</td>
                                            <td>${clientes[i].unidade}</td>
                                            <td>${clientes[i].contato}</td>
                                            <td>${clientes[i].obs}</td>
                                            <td>${clientes[i].check}</td>
                                        <tr>
                                    `;
                               }
                conteudo +=`</tbody>
                        </table>
                        <a class="btn btn-success mt-5" href="/cadastroCliente">Novo Cadastro</a>
                        <a class="btn btn-secondary mt-5" href="/">Voltar</a>
                    </main>
                </body>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
            </html>`;
    resposta.send(conteudo);
    resposta.end();
});

app.get("/listarFornecedores", (requisicao, resposta) => {
    let conteudo =`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>Lista de Fornecedores</title>
            </head>
            <body>
                <main class="container-fluid p-4 mt-5">
                    <h2 class="text-center mb-3">Lista de Fornecedores</h2>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">CNPJ</th>
                                <th scope="col">Razão Social</th>
                                <th scope="col">Nome Fantasia</th>
                                <th scope="col">Endereço</th>
                                <th scope="col">Cidade</th>
                                <th scope="col">UF</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefone</th>
                            </tr>
                        </thead>
                        <tbody>`;
                            for(let i = 0; i < fornecedores.length; i++){
                                conteudo += `
                                    <tr>
                                        <td>${fornecedores[i].cnpj}</td>
                                        <td>${fornecedores[i].razaoSocial}</td>
                                        <td>${fornecedores[i].nomeFantasia}</td>
                                        <td>${fornecedores[i].endereco}</td>
                                        <td>${fornecedores[i].cidade}</td>
                                        <td>${fornecedores[i].uf}</td>
                                        <td>${fornecedores[i].cep}</td>
                                        <td>${fornecedores[i].email}</td>
                                        <td>${fornecedores[i].telefone}</td>
                                    </tr>
                                `;
                            }
                conteudo += `
                        </tbody>
                    </table>
                    <a class="btn btn-success mt-5" href="/cadastroFornecedor">Novo Cadastro</a>
                    <a class="btn btn-secondary mt-5" href="/">Voltar</a>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js"></script>
        </html>`;
    resposta.send(conteudo);
    resposta.end();
});

app.get("/login", (requisicao, resposta) => {
    resposta.send(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <title>Login do Sistema</title>
            <style>
                .gradient-custom {
                    /* fallback for old browsers */
                    background: #6a11cb;
                    /* Chrome 10-25, Safari 5.1-6 */
                    background: -webkit-linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
                    /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
                    background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1))
                }
            </style>
        </head>
        <body>
            <main>
                <section class="vh-100 gradient-custom">
                    <div class="container py-5 h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div class="card bg-dark text-white" style="border-radius: 1rem;">
                                    <div class="card-body p-5 text-center">
                                        <div class="mb-md-5 mt-md-4 pb-5">
                                            <form id="login-form" class="form" action="" method="post">
                                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                                <div data-mdb-input-init class="form-floating mb-4 mt-4">
                                                    <input type="text" id="login" name="login" class="form-control form-control-lg" />
                                                    <label class="form-label" for="login">Usuário</label>
                                                </div>
                                                <div data-mdb-input-init class="form-floating mb-4">
                                                    <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                                                    <label class="form-label" for="senha">Senha</label>
                                                </div>
                                                <button data-mdb-button-init data-mdb-ripple-init class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    </html>
    `);
});

app.post("/login", (requisicao, resposta) => {
    const usuario = requisicao.body.login;
    const senha = requisicao.body.senha;
    if(usuario & senha){
        resposta.redirect("/");
    }else{
        var conteudo = `
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                <title>Login do Sistema</title>
                <style>
                    .gradient-custom {
                        background: linear-gradient(to right, rgba(106, 17, 203, 1), rgba(37, 117, 252, 1));
                    }
                </style>
            </head>
            <body>
                <main>
                    <section class="vh-100 gradient-custom">
                        <div class="container py-5 h-100">
                            <div class="row d-flex justify-content-center align-items-center h-100">
                                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                                    <div class="card bg-dark text-white" style="border-radius: 1rem;">
                                        <div class="card-body p-5 text-center">
                                            <div class="mb-md-5 mt-md-4 pb-5">
                                                <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
                                                <form method="POST" action="/login">
                                                    <div class="form-floating mb-4 mt-4">`;
                                                        if (!usuario) {
                                                            conteudo += `
                                                            <input type="text" id="usuario" name="usuario" class="form-control form-control-lg"/>
                                                            <label class="form-label" for="usuario">Usuário</label>
                                                            <span class="text-danger">Digite o Usuário</span>`;
                                                        }else{
                                                            conteudo += `
                                                            <input type="text" id="usuario" name="usuario" class="form-control form-control-lg" value="${usuario}"/>
                                                            <label class="form-label" for="usuario">Usuário</label>`;
                                                        }
                                                        conteudo += `</div>
                                                        <div class="form-floating mb-4">`;
                                                        if (!senha) {
                                                            conteudo += `
                                                            <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                                                            <label class="form-label" for="senha">Senha</label>
                                                            <span class="text-danger">Digite a senha</span>`;
                                                        }else{
                                                            conteudo += `
                                                            <input type="password" id="senha" name="senha" class="form-control form-control-lg" />
                                                            <label class="form-label" for="senha">Senha</label>`;
                                                        }      
                                                        conteudo += `</div>
                                                    <button class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>`;
    } 
    resposta.send(conteudo);
    resposta.end();   
});

app.get("/logout", (requisicao, resposta) => {
    resposta.send("<p>Você saiu do sistema.</p>");
});

app.listen(port,host, () =>{
    console.log('Servidor em execução em http://${host}:${port}/');
});