let listaDeItens = []
let itemAEditar

const formulario = document.getElementById('form-itens')
const itemInput = document.getElementById('receber-item')
const ulItems = document.getElementById('lista-de-itens')
const ulItemsComprados = document.getElementById('itens-comprados')
const listaRecuperada = localStorage.getItem('listaDeItems')

const salvarDadosNoNavegador = () => {
    localStorage.setItem('listaDeItems', JSON.stringify(listaDeItens))
}

const salvarEdicao = () => {
    const itemEditado = document.querySelector(`[data-value="${itemAEditar}"] input[type="text"]`)
    listaDeItens[itemAEditar].item = itemEditado.value
    console.log(listaDeItens)
    itemAEditar = -1
    mostrarItem()
}

const salvarItem = () => {
    const novoItem = itemInput.value

    const checarDuplicado = listaDeItens.some(elemento => elemento.item.toLowerCase() === novoItem.toLowerCase())

    if (checarDuplicado) {
        alert("Item já existente.")
    } else {
        listaDeItens.push({
            item: novoItem,
            checar: false
        })
    }

    itemInput.value = ''
}

const mostrarItem = () => {
    ulItems.innerHTML = ''
    ulItemsComprados.innerHTML = ''
    listaDeItens.forEach((elemento, index) => {
        if (elemento.checar) {
            ulItemsComprados.innerHTML += `
<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
<div>
    <input type="checkbox" checked class="is-clickable" />  
    <span class="itens-comprados is-size-5">${elemento.item}</span>
</div>
<div>
    <i class="fa-solid fa-trash is-clickable deletar"></i>
</div>
</li>
            `
        } else {
            ulItems.innerHTML += `
<li class="item-compra is-flex is-justify-content-space-between" data-value="${index}">
<div>
    <input type="checkbox" class="is-clickable" />
    <input type="text" class="is-size-5" value="${elemento.item}" ${index !== Number(itemAEditar) ? 'disabled' : ''} />
</div>
<div>
    ${index === Number(itemAEditar) ? '<button onclick="salvarEdicao()"><i class="fa-regular fa-floppy-disk is-clickable"></i></button>' : '<i class="fa-regular is-clickable fa-pen-to-square editar"></i>'}
    <i class="fa-solid fa-trash is-clickable deletar"></i>
</div>
</li>
        `
        }
    })

    const inputCheck = document.querySelectorAll('input[type="checkbox"]')

    inputCheck.forEach(item => {
        item.addEventListener('click', (e) => {
            const indiceDoElemento = e.target.parentNode.parentNode.getAttribute('data-value')
            listaDeItens[indiceDoElemento].checar = e.target.checked
            mostrarItem()
        })
    })

    const deletarObjetos = document.querySelectorAll('.deletar')

    deletarObjetos.forEach(item => {
        item.addEventListener('click', (e) => {
            const indiceDoElemento = e.target.parentNode.parentNode.getAttribute('data-value')
            listaDeItens.splice(indiceDoElemento, 1)
            mostrarItem()
        })
    })

    const editarItems = document.querySelectorAll('.editar')

    editarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            itemAEditar = e.target.parentNode.parentNode.getAttribute('data-value')
            mostrarItem()
        })
    })

    salvarDadosNoNavegador()
}

if(listaRecuperada) {
    listaDeItens = JSON.parse(listaRecuperada)
    mostrarItem()
} else {
    listaDeItens = []
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault()
    salvarItem()
    mostrarItem()
    itemInput.focus()
})
