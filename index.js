fetch("./data.json")
.then(response => response.json())
.then(json=> populateList(Object.entries(json)))

let myUL = document.createElement("ul")
document.body.append(myUL)

let listaInputs = []
let pais = []
let lis = []

// localStorage.clear()
let filhosDados = JSON.parse(localStorage.getItem('filhos')) || [];
let paisDados = JSON.parse(localStorage.getItem('pais')) || [];
let listaFilhos = []
let listaPais = []

let contadorFilhos = 0
let contadorPais = 0

function populateList(array){
    for (let i = 0; i < array.length; i++){
        let li = document.createElement('li')
        let check = document.createElement('input')
        check.setAttribute("type","checkbox")
        check.setAttribute("level", array[i][1]['level'])
        check.addEventListener("click", clicked, false)
        li.appendChild(check)


        for (f of filhosDados){
            listaFilhos = f
            break
        }
        for (p of paisDados){
            listaPais = p
            break
        }

        for (let j = 0; j < listaPais.length; j++){
            for (let k = 0; k < listaFilhos.length; k++){
                if (listaPais[j]==listaFilhos[k]){
                    listaPais.splice(j, 1)
                }
            }
        }
        for (let j = 0; j < listaPais.length; j++){
            if (listaPais[j] == contadorPais){
                if(listaFilhos.find(isTrue)){
                    check.checked = true
                    check.indeterminate = false
                    listaPais.splice(j, 1)
                    break
                }
                else{
                    check.indeterminate = true
                    break
                }
            }
        }
        contadorPais++

        for (let f = 0; f<listaFilhos.length; f++){
            if(listaFilhos[f]==contadorFilhos){
                check.checked = true
                break
            }
        }
        contadorFilhos++

        let label = document.createElement("label")
        label.textContent = array[i][1]['name']
        label.addEventListener("dblclick", hideAndShow, false)

        li.appendChild(label)
        li.setAttribute("visible", true)

        let item = []
        item.push(array[i][1]['name'])
        item.push(array[i][1]['level'])
        listaInputs.push(item)

        switch(array[i][1]['level']){
            case 0:
                myUL.appendChild(li)
                break
            case 1:
                let ul = document.createElement("ul")

                ul.appendChild(li)
                myUL.appendChild(ul)
                break
            case 2:
                let ul2 = document.createElement("ul")
                let ul22 = document.createElement("ul")

                ul2.appendChild(li)
                ul22.appendChild(ul2)
                myUL.appendChild(ul22)
                break
            case 3:
                let ul3 = document.createElement("ul")
                let ul33 = document.createElement("ul")
                let ul333 = document.createElement("ul")

                ul3.appendChild(li)
                ul33.appendChild(ul3)
                ul333.appendChild(ul33)
                myUL.appendChild(ul333)
                break
            case 4:
                let ul4 = document.createElement("ul")
                let ul44 = document.createElement("ul")
                let ul444 = document.createElement("ul")
                let ul4444 = document.createElement("ul")

                ul4.appendChild(li)
                ul44.appendChild(ul4)
                ul444.appendChild(ul44)
                ul4444.appendChild(ul444)
                myUL.appendChild(ul4444)
                break
        }

        if (array[i][1]['children'] != {}){
            let newArray = Object.entries(array[i][1]['children'])
            populateList(newArray)
        }
    } 
}

//ideia: pegar todos os elementos do DOM e checar em qual nível está o nome único
//enquanto o próximo elemento for de nível menor, o nome deve ganhar um check

//transformar json em array (como na função de cima)
//percorrer o array até achar o nome
//pegar o level
//comparar os próximos elementos com o level
//se forem menores, dar um check
//se for maior, sair do laço e sair da função


function clicked(){
    let inputs = document.getElementsByTagName('input')
    let li = document.getElementsByTagName('li')
    let nome = this.parentNode.children[1].textContent
    let nivel
    let posicao
    let filhos = []

    for (let i = 0; i < listaInputs.length; i++){
        if (listaInputs[i][0] == nome){
            nivel = parseInt(listaInputs[i][1])
            posicao = parseInt(i)
            break
        }
        else{
            pais.push(inputs[i])
            lis.push(li[i])
        }
    }
    let comparandoNivel = nivel+1

    if (this.checked){
        listaFilhos = []
        listaPais = []
        listaFilhos.push(posicao)
        while(comparandoNivel > nivel){
            posicao++
            comparandoNivel = parseInt(listaInputs[posicao][1], 10)
            if (comparandoNivel > nivel){
                filhos.push(listaInputs[posicao][0])
                inputs[posicao].checked = true
                inputs[posicao].indeterminate = false
                listaFilhos.push(posicao)
            }
        }

        filhosDados.pop()
        var semRepetidos = listaFilhos.filter(function(el, i) {
            return listaFilhos.indexOf(el) === i;
        });
        listaFilhos = semRepetidos
        filhosDados.push(listaFilhos)
        saveDadosToStorage()

        var semRepPais = pais.filter(function(el, i) {
            return pais.indexOf(el) === i;
        });
        pais = semRepPais

        ordenacao = []
        for (let i = 0; i < pais.length; i++){
            for (let j = 0; j < pais.length; j++){
                if (parseInt(pais[j].getAttribute('level')) == i){
                    ordenacao.push(pais[j])
                }
            }
        }
        pais = ordenacao

        for (let i = 0; i < pais.length; i++){
            if (parseInt(pais[i].getAttribute('level')) >= nivel){
                listaPais.splice(i, 1)
            }
            else{
                pais[i].indeterminate = true
                lis[i].style.backgroundColor = "rgb(169, 199, 228)"
                listaPais.push(i)
            }
        }

        paisDados.pop()
        var semRepeticao = listaPais.filter(function(el, i) {
            return listaPais.indexOf(el) === i;
        });
        listaPais = semRepeticao
        paisDados.push(listaPais)
        savePaisToStorage()
    }
    else{
        while(comparandoNivel > nivel){
            posicao++
            comparandoNivel = parseInt(listaInputs[posicao][1], 10)
            if (comparandoNivel > nivel){
                filhos.splice(listaInputs[posicao][0], 1)
                inputs[posicao].checked = false
                inputs[posicao].indeterminate = false
            }
        }
        filhosDados.pop()
        var semRepetidos = filhos.filter(function(el, i) {
            return filhos.indexOf(el) === i;
        });
        filhos = semRepetidos
        filhosDados.push(filhos)
        saveDadosToStorage()
        
        for (let i = 0; i < pais.length; i++){
            pais[i].indeterminate = false
            lis[i].style.backgroundColor = ""
        }

        listaPais = pais
        paisDados.pop()
        var semRepeticao = listaPais.filter(function(el, i) {
            return listaPais.indexOf(el) === i;
        });
        listaPais = semRepeticao
        paisDados.push(listaPais)
        savePaisToStorage()
    }      
}

function hideAndShow(){
    let lis = document.getElementsByTagName('li')
    let nome = this.parentNode.textContent
    let nivel
    let posicao

    for (let i = 0; i < listaInputs.length; i++){
        if (listaInputs[i][0] == nome){
            nivel = parseInt(listaInputs[i][1])
            posicao = parseInt(i)
            break
        }
    }
    let comparandoNivel = nivel+1


    if(this.getAttribute('visible')=='false'){
        while(comparandoNivel > nivel){
            posicao++
            comparandoNivel = parseInt(listaInputs[posicao][1], 10)
            if (comparandoNivel > nivel){
                lis[posicao].style.display = "list-item"
            }
        }
        this.setAttribute('visible', true)
        return 
    }

    while(comparandoNivel > nivel){
        posicao++
        comparandoNivel = parseInt(listaInputs[posicao][1], 10)
        if (comparandoNivel > nivel){
            lis[posicao].style.display = "none"
        }
        this.setAttribute('visible', false)
    }   
    return 
}

function savePaisToStorage(){
    localStorage.setItem("pais", JSON.stringify(paisDados))
}

function saveDadosToStorage(){
    localStorage.setItem("filhos", JSON.stringify(filhosDados))
}

function isTrue(){
    for (let i=0; i < listaFilhos.length; i++){
        for (let j=0; j < listaPais.length; j++){
            return listaFilhos[i]==listaPais[j]
        }
    }
    return false
}