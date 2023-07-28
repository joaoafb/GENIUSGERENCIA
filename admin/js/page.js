function addproduto() {

    document.querySelector('.content-wrapper').innerHTML = `
    <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
    <li class="breadcrumb-item active" aria-current="page">Produtos</li>
    <li class="breadcrumb-item active" aria-current="page">Adicionar Produtos</li>
    </ol>
  </nav>

<div class="row">
  <!-- Lado Esquerdo do Formulário -->
  <div class="col-md-6">
    <form>
      <!-- Categoria: Informações do Produto -->
      <div class="form-group">
        <label for="titulo">Título do Produto:</label>
        <input autocomplete="off" required type="text" class="form-control" id="titulo" placeholder="Digite o título do produto">
      </div>
      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <textarea class="form-control" id="descricao" rows="4" placeholder="Digite a descrição do produto"></textarea>
      </div>
      <div class="form-group">
        <label for="categoria">Categoria:</label>
        <input autocomplete="off" required type="text" class="form-control" id="categoria" placeholder="Digite a categoria do produto">
      </div>
      <div class="form-group">
        <label for="modelo">Modelo:</label>
        <input autocomplete="off" required type="text" class="form-control" id="modelo" placeholder="Digite o modelo do produto.">
      </div>
      
    </form>
  </div>

  <!-- Lado Direito do Formulário -->
  <div class="col-md-6">
    <form id="form-produto">
   

      <!-- Categoria: Variações e Valor -->
  
      <div class="form-group column">
      <br>
      <label for="">Foto 1: (Obrigatorio)</label>
      <input autocomplete="off" required type="file" class="form-control-file" id="imagemProduto"><br><br>
      <label for="">Foto 2:</label>
      <input autocomplete="off"  type="file" class="form-control-file" id="imagemProduto2"><br><br>
     
      <label for="">Foto 3:</label>
      <input autocomplete="off"  type="file" class="form-control-file" id="imagemProduto3"><br><br>
     

      </div><br>
      <div class="form-group">
        <label for="valor">Valor:</label>
        <input autocomplete="off" required type="text" class="form-control" id="valor" placeholder="Digite o valor do produto">
      </div>

      <!-- Botão de envio -->
      <button type="submit" style="margin-top:10px" disabled id="btn-add-product" class="btn btn-primary">Adicionar Produto</button>
    </form>
  </div>
</div>
</div>

    `
    document.querySelector("#imagemProduto").addEventListener("change", function() {
        setTimeout(() => {
            uploadImage()
        }, 500);

    })

    document.querySelector("#imagemProduto2").addEventListener("change", function() {
        setTimeout(() => {
            uploadImage2()
        }, 500);

    })
    document.querySelector("#imagemProduto3").addEventListener("change", function() {
        setTimeout(() => {
            uploadImage3()
        }, 500);

    })



    document.querySelector("#form-produto").addEventListener("submit", function() {
        const titulo = document.querySelector("#titulo").value
        const descricao = document.querySelector("#descricao").value
        const categoria = document.querySelector("#categoria").value
        const modelo = document.querySelector("#modelo").value


        const valor = document.querySelector("#valor").value
        const img = sessionStorage.getItem("imgprodutos")
        const img2 = sessionStorage.getItem("imgprodutos2")
        const img3 = sessionStorage.getItem("imgprodutos3")
        const formData = {
            titulo,
            descricao,
            categoria,
            modelo,
            img2,
            img3,
            valor,
            img
        };

        // Envia os dados para o servidor usando o fetch
        fetch("/api/marloscardoso/addproduto", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {

                if (data.message == 'Produto Cadastrado') {
                    Swal.fire({

                        icon: 'success',
                        title: 'Produto Adicionado',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        addproduto()
                    }, 1600);
                }
                // Aqui você pode realizar alguma ação após o servidor processar os dados
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
            });


    })
}


function uploadImage() {
    const fileInput = document.getElementById('imagemProduto');
    const file = fileInput.files[0];

    if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/marloscardoso/imgproduto', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(url => {
            console.log('URL da imagem no Firebase:', url.url);
            sessionStorage.setItem("imgprodutos", url.url)
            $("#btn-add-product").removeAttr("disabled");
            // Aqui você pode realizar alguma ação após o servidor processar os dados
        })
        .catch(error => {
            console.error('Erro ao enviar a imagem:', error);
        });
}


function uploadImage2() {
    const fileInput = document.getElementById('imagemProduto2');
    const file = fileInput.files[0];

    if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/marloscardoso/imgproduto', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(url => {
            console.log('URL da imagem no Firebase:', url.url);
            sessionStorage.setItem("imgprodutos2", url.url)
            $("#btn-add-product").removeAttr("disabled");
            // Aqui você pode realizar alguma ação após o servidor processar os dados
        })
        .catch(error => {
            console.error('Erro ao enviar a imagem:', error);
        });
}

function uploadImage3() {
    const fileInput = document.getElementById('imagemProduto3');
    const file = fileInput.files[0];

    if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/marloscardoso/imgproduto', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(url => {
            console.log('URL da imagem no Firebase:', url.url);
            sessionStorage.setItem("imgprodutos3", url.url)
            $("#btn-add-product").removeAttr("disabled");
            // Aqui você pode realizar alguma ação após o servidor processar os dados
        })
        .catch(error => {
            console.error('Erro ao enviar a imagem:', error);
        });
}



function uploadImgCateg() {
    const fileInput = document.getElementById('imgCategoria');
    const file = fileInput.files[0];

    if (!file) {
        console.error('Nenhum arquivo selecionado.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/marloscardoso/imgcategoria', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(url => {
            console.log('URL da imagem no Firebase:', url.url);
            sessionStorage.setItem("imagemcategoria", url.url)
            document.querySelector("form button").removeAttribute("disabled");
            // Aqui você pode realizar alguma ação após o servidor processar os dados
        })
        .catch(error => {
            console.error('Erro ao enviar a imagem:', error);
        });
}

function listprodutos() {
    document.querySelector('.content-wrapper').innerHTML = `
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
  <li class="breadcrumb-item active" aria-current="page">Produtos</li>
  <li class="breadcrumb-item active" aria-current="page">Lista de Produtos</li>
  </ol>
</nav>
    
    <div class="divInput">
    <input autocomplete="off" id="searchInput" oninput="filterProdutos()" type="search" autocomplete="off" class="input form-control" placeholder="Pesquise aqui">
    <button class="btnRecarregar btn btn-primary" onclick="listprodutos()"><i class="fas fa-sync-alt"></i></button>
    </div>
    <table>
    <thead>
      <tr>
        <th>Imagem</th>
        <th>Nome</th>
        <th>Valor</th>
        <th>Descrição</th>
        <th>Ações</th>
      </tr>
    </thead>
    <tbody id="list-produtos">
      
      <!-- Adicione outras linhas conforme necessário -->
    </tbody>
  </table>`


    fetch('/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                const itemRow = $("<tr>");

                const imgTd = $("<td>").append($("<img>").attr("src", item.img).attr("alt", "Imagem do Produto").attr("width", 50));
                const tituloTd = $("<td>").text(item.titulo);
                const valorTd = $("<td>").text("R$ " + item.valor);
                const descricaoTd = $("<td>").text(item.descricao);
                const optionsTd = $("<td>");

                const btnEditar = $("<button>").addClass("btnEditar btnoption").append($("<i>").addClass("fas fa-edit"));
                btnEditar.on("click", function() {
                    // Use o seletor jQuery para selecionar o modal
                    const meuModal = $("#ModalProduto");

                    // Abra o modal usando o método modal()
                    meuModal.modal("show");
                    document.querySelector("#TituloProduto").innerText = item.titulo

                    document.querySelector(".modal-body").innerHTML = `
                    <img src="${item.img}" alt="">
                    
<div class="row">
<!-- Lado Esquerdo do Formulário -->
<div class="col-md-6">
  
    <!-- Categoria: Informações do Produto -->
    <div class="form-group">
      <label for="titulo">Título do Produto:</label>
      <input autocomplete="off" required type="text" class="form-control" id="titulo" placeholder="Digite o título do produto">
    </div>
    <div class="form-group">
      <label for="descricao">Descrição:</label>
      <textarea class="form-control" id="descricao" rows="4" placeholder="Digite a descrição do produto"></textarea>
    </div>
    <div class="form-group">
      <label for="categoria">Categoria:</label>
      <input autocomplete="off" required type="text" class="form-control" id="categoria" placeholder="Digite a categoria do produto">
    </div>
  
  </form>
</div>

<!-- Lado Direito do Formulário -->
<div class="col-md-6">
  <form id="form-produto">
    <!-- Categoria: Informações do Estoque -->
 

   

    <!-- Categoria: Variações e Valor -->

  
    <div class="form-group">
      <label for="valor">Valor:</label>
      <input autocomplete="off" required type="text" class="form-control" id="valor" placeholder="Digite o valor do produto">
    </div>
    <div class="form-group">
    <label for="modelo">Modelo:</label>
    <input autocomplete="off" required type="text" class="form-control" id="modelo" placeholder="Digite o modelo do produto.">
  </div>

 
</div>
</div>
</div>
                    `

                    const titulo = document.querySelector("#titulo")
                    const descricao = document.querySelector("#descricao")
                    const categoria = document.querySelector("#categoria")
                    const estoque = document.querySelector("#estoque")

                    const valor = document.querySelector("#valor")
                    const modelo = document.querySelector("#modelo")

                    titulo.value = item.titulo !== undefined ? item.titulo : '';
                    descricao.value = item.descricao !== undefined ? item.descricao : '';
                    categoria.value = item.categoria !== undefined ? item.categoria : '';

                    valor.value = item.valor !== undefined ? item.valor : '';
                    modelo.value = item.modelo !== undefined ? item.modelo : '';
                    document.querySelector("#btnSalvar").onclick = function() {
                        const Dados = {
                                titulo: document.querySelector("#titulo").value,
                                descricao: document.querySelector("#descricao").value,
                                categoria: document.querySelector("#categoria").value,
                                estoque: document.querySelector("#estoque").value,
                                valor: document.querySelector("#valor").value,
                                modelo: document.querySelector("#modelo").value,
                                id: item._id,
                            }
                            // Enviar os dados para o servidor usando Fetch API
                        fetch('/api/marloscardoso/alterarprodutos', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(Dados)
                            })
                            .then(response => response.json())
                            .then(data => {
                                meuModal.modal("hide")
                                if (data.message == 'Dados Alterados') {
                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Dados Alterados!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(() => {
                                        listprodutos()
                                    }, 1550);
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao enviar os dados para o servidor', error);
                                // Aqui você pode tratar os erros, se necessário
                            });

                    }

                });

                const btnApagar = $("<button>").addClass("btnApagar btnoption").append($("<i>").addClass("fas fa-trash"));
                btnApagar.on("click", function() {

                    const productId = item._id
                    Swal.fire({
                        title: 'Deseja apagar o produto?',
                        text: "Você não será capaz de reverter isso!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim, quero!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`/api/marloscardoso/produtos/${productId}`, {
                                    method: 'DELETE'
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data.message);
                                    if (data.message == 'Produto apagado com sucesso.') {
                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Produto Excluido!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        setTimeout(() => {
                                            listprodutos()
                                        }, 1550);
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro ao apagar produto:', error);
                                });

                        }
                    })


                });

                optionsTd.append(btnEditar, btnApagar);

                itemRow.append(imgTd, tituloTd, valorTd, descricaoTd, optionsTd);

                $("#list-produtos").append(itemRow);




            });



        })
        .catch(error => {
            console.error('Erro ao obter os dados:', error);
        });


}

function filterProdutos() {
    const inputVal = $("#searchInput").val().toLowerCase();
    $("#list-produtos tr").each(function() {
        const rowText = $(this).text().toLowerCase();
        if (rowText.indexOf(inputVal) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Função para filtrar os itens na tabela com base no texto digitado
function filterTable() {
    const inputVal = $("#searchInput").val().toLowerCase();
    $("#list-produtos tr").each(function() {
        const rowText = $(this).text().toLowerCase();
        if (rowText.indexOf(inputVal) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}



function verclientes() {
    document.querySelector('.content-wrapper').innerHTML = `
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
  <li class="breadcrumb-item active" aria-current="page">Clientes</li>
  <li class="breadcrumb-item active" aria-current="page">Lista de Clientes</li>
  </ol>
</nav>

    <div class="divInput">
  <input autocomplete="off" id="searchInput" oninput="filterclientes()" type="search" autocomplete="off" class="input form-control" placeholder="Pesquise aqui">
  <button class="btnRecarregar btn btn-primary" onclick="verclientes()"><i class="fas fa-sync-alt"></i></button>
  </div>
  <table>
  <thead>
      <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Compras (Quantidade)</th>
          <th>Ações</th>
          
      </tr>
  </thead>
  <tbody id="list-clientes">
    
    
      <!-- Adicione mais linhas conforme necessário -->
  </tbody>
</table>
  `
    fetch('/api/marloscardoso/listclientes')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                const itemRow = $("<tr>");


                const id = $("<td>").text(item._id);
                const nome = $("<td>").text(item.nome);
                const email = $("<td>").text(item.email);
                const quantidade = $("<td>").text(item.compras)
                const button = $("<button>").text("Detalhes").attr("class", "btndetalhes");
                button.on("click", function() {
                    // Use o seletor jQuery para selecionar o modal
                    const meuModal = $("#ModalDetalhes");

                    // Abra o modal usando o método modal()
                    meuModal.modal("show");
                    $(".modal-title").text('Cliente ' + item.nome)
                    const nomeInput = document.getElementById("nome");
                    const emailInput = document.getElementById("email");
                    const telefoneInput = document.getElementById("telefone");
                    const logradouroInput = document.getElementById("logradouro");
                    const numeroInput = document.getElementById("numero");
                    const bairroInput = document.getElementById("bairro");
                    const cidadeInput = document.getElementById("cidade");
                    const estadoInput = document.getElementById("estado");
                    const cepInput = document.getElementById("cep");

                    nomeInput.value = item.nome !== undefined ? item.nome : '';
                    emailInput.value = item.email !== undefined ? item.email : '';
                    telefoneInput.value = item.telefone !== undefined ? item.telefone : '';
                    logradouroInput.value = item.logradouro !== undefined ? item.logradouro : '';
                    numeroInput.value = item.numero !== undefined ? item.numero : '';
                    bairroInput.value = item.bairro !== undefined ? item.bairro : '';
                    cidadeInput.value = item.cidade !== undefined ? item.cidade : '';
                    estadoInput.value = item.estado !== undefined ? item.estado : '';
                    cepInput.value = item.cep !== undefined ? item.cep : '';
                    document.querySelector("#btnApagarCliente").onclick = function() {
                        const idusuario = item._id
                        fetch(`/api/marloscardoso/excluirusuario/` + idusuario, {
                                method: 'DELETE',
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.message == 'Usuário excluído com sucesso.') {
                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Usuario Excluido Com Sucesso!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(() => {
                                        meuModal.modal("hide")
                                        verclientes()
                                    }, 1550);
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao excluir o usuário no servidor', error);
                                // Aqui você pode tratar os erros, se necessário
                            });
                    }

                    document.querySelector("#btnEditarDados").onclick = function() {
                        // Obter os valores do formulário
                        const Dados = {
                            nome: document.getElementById("nome").value,
                            email: document.getElementById("email").value,
                            telefone: document.getElementById("telefone").value,
                            logradouro: document.getElementById("logradouro").value,
                            numero: document.getElementById("numero").value,
                            bairro: document.getElementById("bairro").value,
                            cidade: document.getElementById("cidade").value,
                            estado: document.getElementById("estado").value,
                            cep: document.getElementById("cep").value,
                            id: item._id

                        };

                        // Enviar os dados para o servidor usando Fetch API
                        fetch('/api/marloscardoso/alterarclientes', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(Dados)
                            })
                            .then(response => response.json())
                            .then(data => {
                                meuModal.modal("hide")
                                if (data.message == 'Dados Alterados') {
                                    Swal.fire({

                                        icon: 'success',
                                        title: 'Dados Alterados!',
                                        showConfirmButton: false,
                                        timer: 1500
                                    })
                                    setTimeout(() => {
                                        verclientes()
                                    }, 1550);
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao enviar os dados para o servidor', error);
                                // Aqui você pode tratar os erros, se necessário
                            });
                    }
                });



                itemRow.append(id, nome, email, quantidade, button);

                $("#list-clientes").append(itemRow);
            })
        })


}

function filterclientes() {
    const inputVal = $("#searchInput").val().toLowerCase();
    $("#list-clientes tr").each(function() {
        const rowText = $(this).text().toLowerCase();
        if (rowText.indexOf(inputVal) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}


function listcategorias() {

    document.querySelector('.content-wrapper').innerHTML = `
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">

  <li class="breadcrumb-item active" aria-current="page">Categorias</li>
    <li class="breadcrumb-item active" aria-current="page">Lista de Categorias</li>
  </ol>
</nav>
  <h1>Lista de Categorias</h1>
  <input autocomplete="off" id="searchInput" oninput="filterTable()" type="search" autocomplete="off" class="input form-control" placeholder="Pesquise aqui">
  <table>
  <thead>
    <tr>
      <th>Imagem</th>
      <th>Nome</th>
    
      <th>Ações</th>
    </tr>
  </thead>
  <tbody id="list-categorias">
    
    <!-- Adicione outras linhas conforme necessário -->
  </tbody>
</table>`



    fetch('/api/marloscardoso/listcategorias')
        .then(response => response.json())
        .then(data => {

            data.forEach(item => {
                const itemRow = $("<tr>");

                const imgTd = $("<td>").append($("<img>").attr("src", item.img).attr("alt", "Imagem ").attr("width", 50))
                const tituloTd = $("<td>").text(item.titulo);
                const optionsTd = $("<td>");



                const btnApagar = $("<button>").addClass("btnApagar btnoption").append($("<i>").addClass("fas fa-trash"));
                btnApagar.on("click", function() {

                    const productId = item._id
                    Swal.fire({
                        title: 'Deseja apagar a categoria?',
                        text: "Você não será capaz de reverter isso!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        cancelButtonText: 'Não',
                        confirmButtonText: 'Sim, quero!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`/api/marloscardoso/categorias/${productId}`, {
                                    method: 'DELETE'
                                })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data.message);
                                    if (data.message == 'Categoria apagada com sucesso.') {
                                        Swal.fire({

                                            icon: 'success',
                                            title: 'Categoria Excluida!',
                                            showConfirmButton: false,
                                            timer: 1500
                                        })
                                        setTimeout(() => {
                                            listcategorias()
                                        }, 1550);
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro ao apagar produto:', error);
                                });

                        }
                    })


                });

                optionsTd.append(btnApagar);

                itemRow.append(imgTd, tituloTd, optionsTd);

                $("#list-categorias").append(itemRow);




            });



        })
        .catch(error => {
            console.error('Erro ao obter os dados:', error);
        });


}
// Função para filtrar os itens na tabela com base no texto digitado
function filterTable() {
    const inputVal = $("#searchInput").val().toLowerCase();
    $("#list-produtos tr").each(function() {
        const rowText = $(this).text().toLowerCase();
        if (rowText.indexOf(inputVal) !== -1) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

function addcategoria() {
    document.querySelector('.content-wrapper').innerHTML = `
  <div class="container mt-4">
  <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
  <li class="breadcrumb-item active" aria-current="page">Categorias</li>
  <li class="breadcrumb-item active" aria-current="page">Adicionar Categoria</li>
  </ol>
</nav>
        
        <form id="add-categ">
            <div class="form-group">
                <label for="titulo">Título:</label>
                <input autocomplete="off" type="text" class="form-control" required id="titulocategoria" placeholder="Digite o título aqui">
            </div>
            <div class="form-group">
                <label for="imagem">Imagem:</label><br>
                <input autocomplete="off" type="file" class="form-control-file" id="imgCategoria">
            </div><br>
            <button type="submit" disabled class="btn btn-primary">Criar Categoria</button>
        </form>
    </div>
  
 `
    document.querySelector("#imgCategoria").addEventListener("change", function() {
        setTimeout(() => {
            uploadImgCateg()
        }, 500);
    })
    document.querySelector("#add-categ").addEventListener("submit", function() {
        const titulo = document.querySelector("#titulocategoria").value
        const imagemCategoria = sessionStorage.getItem("imagemcategoria")
        const img = imagemCategoria
        const formData = {
            titulo,
            img,
        };

        // Envia os dados para o servidor usando o fetch
        fetch("/api/marloscardoso/addcategoria", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {

                if (data.message == 'Categoria Cadastrada') {
                    Swal.fire({

                        icon: 'success',
                        title: 'Categoria Adicionada',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        listcategorias()
                    }, 1600);
                }
                // Aqui você pode realizar alguma ação após o servidor processar os dados
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
            });


    })
}