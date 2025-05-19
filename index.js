import express from 'express';

const host = "0.0.0.0";
const port = 3000;
var clientes = [];

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
                    <nav class="navbar navbar-expand-lg bg-body-tertiary">
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
                                            <li><a class="dropdown-item" href="/listaClientes">Lista de Cliente</a></li>
                                        </ul>
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
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
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
                            <div class="form-floating col-md-3">
                                <select class="form-select" id="uf" name="uf" required>
                                    <option selected disabled value=""></option>
                                    <option value="AC">AC</option>
                                    <option value="AL">AL</option>
                                    <option value="AP">AP</option>
                                    <option value="AM">AM</option>
                                    <option value="BA">BA</option>
                                    <option value="CE">CE</option>
                                    <option value="DF">DF</option>
                                    <option value="ES">ES</option>
                                    <option value="GO">GO</option>
                                    <option value="MA">MA</option>
                                    <option value="MT">MT</option>
                                    <option value="MS">MS</option>
                                    <option value="MG">MG</option>
                                    <option value="PA">PA</option>
                                    <option value="PB">PB</option>
                                    <option value="PR">PR</option>
                                    <option value="PE">PE</option>
                                    <option value="PI">PI</option>
                                    <option value="RJ">RJ</option>
                                    <option value="RN">RN</option>
                                    <option value="RS">RS</option>
                                    <option value="RO">RO</option>
                                    <option value="RR">RR</option>
                                    <option value="SC">SC</option>
                                    <option value="SP">SP</option>
                                    <option value="SE">SE</option>
                                    <option value="TO">TO</option>
                                </select>
                                <label for="uf" class="form-label">UF</label>
                            </div>
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
        `;
    }
    resposta.send(conteudo);
    resposta.end();
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

app.listen(port,host, () =>{
    console.log('Servidor em execução em http://${host}:${port}/');
});