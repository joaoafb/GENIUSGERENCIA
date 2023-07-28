$(document).ready(function() {
    $('.nav-link-collapse').on('click', function() {
        $('.nav-link-collapse').not(this).removeClass('nav-link-show');
        $(this).toggleClass('nav-link-show');
    });
});

function count() {
    fetch('/api/marloscardoso/listapedidos')
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);
            const filteredValues = values.filter(item => item.status !== 'Pedido Cancelado' && item.status !== 'Pedido Finalizado');
            const length = filteredValues.length;



            document.querySelector("#count-pedidos").innerHTML = length;
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
}
count()






function logout() {
    sessionStorage.removeItem("token");
    localStorage.removeItem("token");
    console.log("Usuário deslogado.");
    location.href = '/'
}


function home() {



    const data = {
        token: sessionStorage.getItem("token"),

    };
    sendData(data);



}

async function sendData(data) {
    try {
        const response = await fetch("/api/marloscardoso/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();


        if (result.message == 'Token Valido') {
            console.log("Token Valido")
            document.querySelector('#title-loja').innerHTML = sessionStorage.getItem("loja")
        } else {
            location.href = '/'
        }
    } catch (error) {
        console.error("Erro ao enviar dados para o servidor", error);
    }

}


function pagehome() {
    document.querySelector('.content-wrapper').innerHTML = `

<div class="alert alert-light" role="alert">
    Bem-vindo ao sistema de gerencimento Genius Leap. 
</div>




<h1>Painel de Controle</h1>



<div class="flex wrap ">
    <div class="cardbox text-bg-light card" id="countpedidos">0 Pedidos</div>
    <div class="cardbox text-bg-light card" id="countprodutos">0 Produtos</div>
    <div class="cardbox text-bg-light card" id="countclientes">0 Clientes</div>
    <div class="cardbox text-bg-light card" id="countcategorias">0 Categorias</div>
    <div class="cardbox text-bg-light card"><span  id="countvendas">0 Vendas</span><span id="countreais">R$0</span></div>

</div>
    `

    //CONTABILIZAR
    fetch('/api/marloscardoso/listapedidos')
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);




            document.querySelector("#countpedidos").innerHTML = values.length + ' Pedidos'
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });

    fetch('/api/marloscardoso/listprodutos')
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);





            document.querySelector("#countprodutos").innerHTML = values.length + ' Produtos'
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });

    fetch('/api/marloscardoso/listclientes')
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);





            document.querySelector("#countclientes").innerHTML = values.length + ' Clientes'
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    fetch('/api/marloscardoso/listcategorias')
        .then(response => response.json())
        .then(data => {
            const values = Object.values(data);




            document.querySelector("#countcategorias").innerHTML = values.length + ' Categorias'
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });
    fetch('/api/marloscardoso/listapedidos')
        .then(response => response.json())
        .then(data => {
            let total = 0;

            const values = Object.values(data);
            const filteredValues = values.filter(item => item.status !== 'Pedido Cancelado');
            const length = filteredValues.length;

            document.querySelector("#countvendas").innerHTML = length + ' Vendas';

            filteredValues.forEach(item => { // Utilize o filteredValues no loop
                total += Number(item.pricetotal);
            });

            document.querySelector("#countreais").innerHTML = 'R$' + total;
        })
        .catch(error => {
            console.error('Erro ao obter dados:', error);
        });


}


function pedidos() {
    document.querySelector('.content-wrapper').innerHTML = `
    <nav aria-label="breadcrumb">
  <ol class="breadcrumb">
   
    <li class="breadcrumb-item active" aria-current="page">Pedidos</li>
  </ol>
</nav>
    <h1>Pedidos</h1>
    <div class="flex row">
    <input id="searchInput" oninput="filterTable()" style="width:80%;margin-left:10px;" type="search" autocomplete="off" class="input form-control" placeholder="Pesquise aqui">
    <select class="btn btn-dark " type="button" id="select">
    <option value="Filtro" selected>Filtro</option>
    <option value="Todos" >Todos</option>
    <option value="Aguardando Pagamento">Aguardando Pagamento</option>
    <option value="Compra Aprovada">Compra Aprovada</option>
    <option value="Pedido Postado">Pedido Postado</option>
    <option value="Pedido Finalizado">Pedido Finalizado</option>
    <option value="Pedido Cancelado">Pedido Cancelado</option>
   
</select>

</div>
    <table>
        <thead>
            <tr>
               <th>ID</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Status</th>
                <th>Produto</th>
                <th>Telefone</th>
                <th>Ações</th>
            </tr>
        </thead>
        <tbody id="list-pedidos">
           
            <!-- Adicione mais linhas aqui para mais pedidos -->
        </tbody>
    </table>
    `

    procurarprodutos('Compra Aprovada')
    document.querySelector("#select").addEventListener("change", function() {

        if (document.querySelector("#select").value == 'Todos') {
            todosprodutos()
        } else {
            procurarprodutos(document.querySelector("#select").value)
        }
    })




}

function procurarprodutos(status) {
    document.querySelector("#list-pedidos").innerHTML = ''
    fetch('/api/marloscardoso/listapedidos')
        .then(response => response.json())
        .then(data => {


            data.forEach(item => {
                if (item.status == status) {


                    var newRow = $("<tr>");
                    newRow.append($("<td>").text(item.token));
                    newRow.append($("<td>").text(item.firstNameInput));
                    newRow.append($("<td>").text(item.cpf));
                    newRow.append($("<td>").text(item.status));

                    item.pedido.forEach(pedido => {
                        const div = $('<div>')
                        div.append($("<td>").text(pedido.title));
                        newRow.append(div)
                    })
                    newRow.append($("<td>").text(item.phoneInput));
                    const btn = document.createElement("button")
                    btn.textContent = 'Detalhes'

                    newRow.append($("<button>").on("click", function() {
                        const Modal = $("#ModalPedido");
                        document.querySelector("#input1").value = item.token
                            // Supondo que você tenha o objeto "item" com as propriedades "codRastreio" e "status"


                        if (item.status === 'Compra Aprovada') {
                            document.querySelector("#btnCompraAprovada").disabled = true;
                        } else {
                            document.querySelector("#btnCompraAprovada").disabled = false;
                        }

                        if (item.status === 'Pedido Finalizado') {
                            document.querySelector("#btnPedidoFinalizado").disabled = true;
                        } else {
                            document.querySelector("#btnPedidoFinalizado").disabled = false;
                        }
                        if (item.status === 'Pedido Cancelado') {
                            document.querySelector("#btnPedidoCancelado").disabled = true;
                        } else {
                            document.querySelector("#btnPedidoCancelado").disabled = false;
                        }

                        // Abra o modal usando o método modal()
                        Modal.modal("show");

                        document.querySelector("#listapedidos").innerHTML = ''
                        item.pedido.forEach(pedido => {

                            const pedidoDetails = $('#listapedidos');

                            // Cria o elemento HTML usando jQuery
                            const card = $('<div class="card mb-3">');
                            const row = $('<div class="row g-0">');
                            const imgDiv = $('<div class="col-md-4 divImg">');
                            const img = $('<img class="img-fluid" id="img-pedido" alt="">').attr('src', pedido.image);
                            imgDiv.append(img);

                            const cardBody = $('<div class="col-md-8">');
                            const cardBodyContent = $('<div class="card-body">');
                            const cardTitle = $('<h5 class="card-title" id="pedido-title">').text(pedido.title);
                            const cardDescription = $('<p class="card-text" id="pedido-description">').text(pedido.descricao);
                            const cardPrice = $('<p class="card-text" id="pedido-price">').text('Valor: R$ ' + pedido.price);

                            cardBodyContent.append(cardTitle, cardDescription, cardPrice);
                            cardBody.append(cardBodyContent);
                            row.append(imgDiv, cardBody);
                            card.append(row);

                            // Adiciona o elemento criado na div #list-cards
                            pedidoDetails.append(card);


                        })




                        document.querySelector("#codRast").value = item.codRastreio
                        document.querySelector("#price").value = 'R$' + item.pricetotal
                        document.querySelector("#nomeCompleto").value = item.firstNameInput + ' ' + item.lastNameInput
                        document.querySelector("#cpf").value = item.cpf
                        document.querySelector("#telefone").value = item.phoneInput
                        document.querySelector("#email").value = item.emailInput
                        document.querySelector("#TituloProduct").innerHTML = item.token
                        document.querySelector("#endereco").value = item.addressInput + ', ' + item.addressAltInput + ', ' + item.cityInput + ', ' + item.stateInput


                        document.querySelector("#dataHoraPedido").value = item.data


                    }).attr("class", "btndetalhes").text('Detalhes'));

                    // Adicionar a nova linha à tabela (myTable)
                    $("#list-pedidos").append(newRow);

                }
            })
        })
}

function todosprodutos() {
    document.querySelector("#list-pedidos").innerHTML = ''
    fetch('/api/marloscardoso/listapedidos')
        .then(response => response.json())
        .then(data => {


            data.forEach(item => {


                var newRow = $("<tr>");
                newRow.append($("<td>").text(item.token));
                newRow.append($("<td>").text(item.firstNameInput));
                newRow.append($("<td>").text(item.cpf));
                newRow.append($("<td>").text(item.status));

                item.pedido.forEach(pedido => {
                    const div = $('<div>')
                    div.append($("<td>").text(pedido.title));
                    newRow.append(div)
                })
                newRow.append($("<td>").text(item.phoneInput));
                const btn = document.createElement("button")
                btn.textContent = 'Detalhes'

                newRow.append($("<button>").on("click", function() {
                    const Modal = $("#ModalPedido");
                    document.querySelector("#input1").value = item.token
                        // Supondo que você tenha o objeto "item" com as propriedades "codRastreio" e "status"


                    if (item.status === 'Compra Aprovada') {
                        document.querySelector("#btnCompraAprovada").disabled = true;
                    } else {
                        document.querySelector("#btnCompraAprovada").disabled = false;
                    }

                    if (item.status === 'Pedido Finalizado') {
                        document.querySelector("#btnPedidoFinalizado").disabled = true;
                    } else {
                        document.querySelector("#btnPedidoFinalizado").disabled = false;
                    }
                    if (item.status === 'Pedido Cancelado') {
                        document.querySelector("#btnPedidoCancelado").disabled = true;
                    } else {
                        document.querySelector("#btnPedidoCancelado").disabled = false;
                    }

                    // Abra o modal usando o método modal()
                    Modal.modal("show");

                    document.querySelector("#listapedidos").innerHTML = ''
                    item.pedido.forEach(pedido => {

                        const pedidoDetails = $('#listapedidos');

                        // Cria o elemento HTML usando jQuery
                        const card = $('<div class="card mb-3">');
                        const row = $('<div class="row g-0">');
                        const imgDiv = $('<div class="col-md-4 divImg">');
                        const img = $('<img class="img-fluid" id="img-pedido" alt="">').attr('src', pedido.image);
                        imgDiv.append(img);

                        const cardBody = $('<div class="col-md-8">');
                        const cardBodyContent = $('<div class="card-body">');
                        const cardTitle = $('<h5 class="card-title" id="pedido-title">').text(pedido.title);
                        const cardDescription = $('<p class="card-text" id="pedido-description">').text(pedido.descricao);
                        const cardPrice = $('<p class="card-text" id="pedido-price">').text('Valor: R$ ' + pedido.price);

                        cardBodyContent.append(cardTitle, cardDescription, cardPrice);
                        cardBody.append(cardBodyContent);
                        row.append(imgDiv, cardBody);
                        card.append(row);

                        // Adiciona o elemento criado na div #list-cards
                        pedidoDetails.append(card);


                    })





                    document.querySelector("#price").innerHTML = 'Valor Total: R$' + item.pricetotal
                    document.querySelector("#nomeCompleto").value = item.firstNameInput + ' ' + item.lastNameInput
                    document.querySelector("#cpf").value = item.cpf
                    document.querySelector("#telefone").value = item.phoneInput
                    document.querySelector("#email").value = item.emailInput
                    document.querySelector("#TituloProduct").innerHTML = item.token
                    document.querySelector("#endereco").value = item.addressInput + ', ' + item.addressAltInput + ', ' + item.cityInput + ', ' + item.stateInput


                    document.querySelector("#dataHoraPedido").value = item.data


                }).attr("class", "btndetalhes").text('Detalhes'));

                // Adicionar a nova linha à tabela (myTable)
                $("#list-pedidos").append(newRow);


            })
        })
}



function produtos() {
    document.querySelector('.content-wrapper').innerHTML = `
    <div class="flex menuhorizontal">
    <div onclick="addproduto()" class="item-menu"><i class="fas fa-plus"></i></div>
    <div class="item-menu" onclick="listprodutos()"><i class="fas fa-list"></i></div>
    <div></div>
    <div></div>
    </div>
   
    `
}

function categorias() {
    document.querySelector('.content-wrapper').innerHTML = `
    <div class="flex menuhorizontal">
    <div onclick="addcategoria()" class="item-menu"><i class="fas fa-plus"></i></div>
    <div class="item-menu" onclick="listcategorias()"><i class="fas fa-list"></i></div>
    <div></div>
    <div></div>
    </div>
   
    `
}

function clientes() {
    document.querySelector('.content-wrapper').innerHTML = `
    <div class="flex menuhorizontal">
    
    <div class="item-menu" onclick="verclientes()"><i class="fas fa-list"></i></div>
    <div></div>
    <div></div>
    </div>
    `
}

function perfil() {
    document.querySelector('.content-wrapper').innerHTML = `
   
    `
}


function pedidoPostado() {
    if (document.querySelector("#input2").value == "") {
        Swal.fire({

            icon: 'infor',
            title: 'Digite o código de rastreio',
            showConfirmButton: false,
            timer: 1500
        })
    } else {
        pedidoCod()
    }
}
async function pedidoCod() {
    const pedidoId = document.querySelector("#input1").value
    const cod = document.querySelector("#input2").value


    try {
        const response = await fetch(`https://192.168.1.105/api/pedido-postado/${pedidoId}/${cod}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }

        const data = await response.json();
        if (data.message == 'Status do pedido atualizado com sucesso.') {
            $("#ModalPostado").modal("hide");
            pedidos()
            count()
        } else {
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                html: 'Este pedido já foi pago!',
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.href = './pedidos.html'
                }
            })
        }
    } catch (error) {
        alert('Erro ao atualizar o status do pedido.');
        console.error(error);
    }
}




async function pedidoFinalizado() {
    const pedidoId = document.querySelector("#TituloProduct").textContent



    try {
        const response = await fetch(`/api/pedido-finalizado/${pedidoId}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }

        const data = await response.json();
        if (data.message == 'Status do pedido atualizado com sucesso.') {
            $("#ModalPedido").modal("hide");
            pedidos()
            count()
        } else {
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                html: '',
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload()
                }
            })
        }
    } catch (error) {
        alert('Erro ao atualizar o status do pedido.');
        console.error(error);
    }
}

async function compraAprovada() {
    const pedidoId = document.querySelector("#TituloProduct").textContent



    try {
        const response = await fetch(`/api/pedido-aprovado/${pedidoId}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }

        const data = await response.json();
        if (data.message == 'Status do pedido atualizado com sucesso.') {
            $("#ModalPedido").modal("hide");
            pedidos()
            count()
        } else {
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                html: '',
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload()
                }
            })
        }
    } catch (error) {
        alert('Erro ao atualizar o status do pedido.');
        console.error(error);
    }
}

function cancelarPedido() {

    Swal.fire({
        title: 'Deseja Cancelar o Pedido?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim!'
    }).then((result) => {
        if (result.isConfirmed) {
            cancelPedido()
        }
    })
}

async function cancelPedido() {
    const pedidoId = document.querySelector("#TituloProduct").textContent



    try {
        const response = await fetch(`/api/pedido-cancelado/${pedidoId}`, {
            method: 'PUT',
        });

        if (!response.ok) {
            throw new Error('Erro na requisição.');
        }

        const data = await response.json();
        if (data.message == 'Status do pedido atualizado com sucesso.') {
            Swal.fire(
                'Pedido Cancelado!',
                '',
                'success'
            )
            $("#ModalPedido").modal("hide");
            pedidos()
            count()
        } else {
            let timerInterval
            Swal.fire({
                icon: 'error',
                title: 'Algo deu errado!',
                html: '',
                timer: 2000,
                timerProgressBar: true,

                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    location.reload()
                }
            })
        }
    } catch (error) {
        alert('Erro ao atualizar o status do pedido.');
        console.error(error);
    }
}