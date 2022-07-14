const getDados = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setDados = (dados) => localStorage.setItem('todoList' , JSON.stringify(dados))

const criarItem = (ItemNome , status , indice) => {
    const item = document.createElement('label')
    item.classList.add('tarefas_item')
    item.innerHTML = 
        `<input type="checkbox" ${status} data-indice= ${indice}>
        <div>${ItemNome}</div>
        <input type="button" value="X" data-indice= ${indice}>`;
    document.querySelector("#tarefasLista").appendChild(item);
}
const LimparTarefas = () => {
    const tarefalista = document.querySelector("#tarefasLista")
    while (tarefalista.firstChild){
        tarefalista.removeChild(tarefalista.lastChild)
    }
}
const atualizarTela = () =>{
    LimparTarefas()
    const dados = getDados()
    dados.forEach((item , index) => criarItem(item.tarefa , item.status , index))
}
const inserirItem = (evento) =>{
    const key = evento.key
    const inputItem = document.querySelector("#novoItem")
    if(key === "Enter"){
        const dados = getDados()
        dados.push({'tarefa': inputItem.value, "status": ""})
        setDados(dados) 
        inputItem.value = ''
        atualizarTela();
    }
}
const removerItem = (indice) =>{
    const dados = getDados()
    dados.splice(indice , 1)
    setDados(dados)
    atualizarTela()
}
const atualizarItem = (index) =>{
    const dados = getDados()
    dados[index].status = dados[index].status === '' ? 'checked': '';
    setDados(dados)
    console.log( dados[index].status + index) 
    atualizarTela()
}
const clickItem = (evento) =>{
    const elemento = evento.target
    const indice =  elemento.dataset.indice 
    if (elemento.type === 'button'){
        const indice =  elemento.dataset.indice
        removerItem(indice)
    } else if (elemento.type === 'checkbox'){
        const indice =  elemento.dataset.indice
        atualizarItem(indice)
    }
}
document.querySelector("#novoItem").addEventListener("keypress" , inserirItem)
document.querySelector("#tarefasLista").addEventListener('click' , clickItem);
atualizarTela();

//timer

