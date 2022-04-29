const confirmDeletion = (event,form) => {
    event.preventDefault();
    let decision = confirm("Deseja realmente excluir o registro selecionado?");
    if(decision){
        form.submit();
    }
}

module.exports = confirmDeletion;