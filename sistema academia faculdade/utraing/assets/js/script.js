var selectedRow = null;

function showAlert(message, classname){
    const div = document.createElement("div");
    div.className = `alert alert-${classname}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

function clearFields(){
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#cpf").value = "";
    document.querySelector("#senha").value = "";
}

// adicionar
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.querySelector("#firstname").value;
    const lastname = document.querySelector("#lastname").value;
    const cpf = document.querySelector("#cpf").value;
    const senha = document.querySelector("#senha").value;

    if(firstName == "" || lastname == "" || senha == "" || cpf == ""){
        showAlert("Inserir os valores", "danger");
    } else {
        if(selectedRow == null){
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastname}</td>
            <td>${cpf}</td>
            <td>${senha}</td>
            <a href="#" class="btn btn-warning btn-sm edit">Editar</a>
            
            <a href="#" class="btn btn-danger btn-sm delete">Deletar</a>
        
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Aluno adicionado", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastname;
            selectedRow.children[2].textContent = cpf;
            selectedRow.children[3].textContent = senha;
            selectedRow = null;
            showAlert("Aluno editado", "info");
        }

        clearFields();
    }
});

// Editar

document.querySelector("#student-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastname").value = selectedRow.children[1].textContent;
        document.querySelector("#cpf").value = selectedRow.children[2].textContent;
        document.querySelector("#senha").value = selectedRow.children[3].textContent;

    }
});



// deletar
document.querySelector("#student-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.remove();
        showAlert("Aluno deletado", "danger");
    }
});