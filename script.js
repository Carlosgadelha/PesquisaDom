let listaRepositorios, listaLinguagens
const filtro = document.querySelector('header input')

function preloader(){
    
    const organizacao = document.querySelector('.telaInicial input').value

    if(organizacao){

        document.querySelector(' .telaInicial input').classList.add('escondido')

        document.querySelector(' .telaInicial button').classList.add('escondido')

        document.querySelector(' .telaInicial .preloader').classList.remove('escondido')

        document.querySelector(' .telaInicial p').classList.remove('escondido')

        pesquisar(organizacao)

    }else{
        alert('Insira uma organização !')
    }
}

function pesquisar(organizacao){

    const promise = axios.get(`https://api.github.com/orgs/${organizacao}/repos`);

    promise.then( resposta =>{

        listaRepositorios = resposta.data
        listaLinguagens = listarLinguagens(listaRepositorios)

        console.log(resposta)
        exibirNaTela(listaRepositorios)
        exibirNaTelaLateral(listaRepositorios)
        
    })
    
    promise.catch(()=>{
        window.location.reload()
    });

}

function isLinguagem(linguagem){

   linguagem = linguagem.toUpperCase()
   listaLinguagens = listaLinguagens.map( element => element.toUpperCase())
   return (linguagem === 'C++' || listaLinguagens.includes(linguagem) || linguagem === 'C') ? true: false

}

function filtrar(){

    if(filtro.value){
        let repositoriosFiltrados
        let linguagem 
        
        if(isLinguagem(filtro.value)){
            repositoriosFiltrados = listaRepositorios.filter( repositorio => {

                if(repositorio.language !== null ){
                    if(filtro.value.toUpperCase() === repositorio.language.toUpperCase()) return repositorio
                }
            }) 
            
        }else{
            const exp = new RegExp(filtro.value.trim(),'i')
            repositoriosFiltrados = listaRepositorios.filter( repositorio => exp.test(repositorio.name))
        }

        exibirNaTela(repositoriosFiltrados)
          
    }else{
        exibirNaTela(listaRepositorios)
    }
}

function listarLinguagens(dados){

    let linguagens = []

    dados.forEach(element => {

        if(element.language !== null) linguagens.push(element.language)
    })

    let linguagensSemDuplicados = [... new Set(linguagens)]

    return linguagensSemDuplicados
}

function exibirNaTela(dados){

    gerenciarTelas('header',true)
    gerenciarTelas('repositorios',true)
    gerenciarTelas('barraLateral',true)
    gerenciarTelas('telaInicial',false)

    if(dados.length){
        const repositorios = document.querySelector('.repositorios')
        repositorios.innerHTML = ''

        dados.forEach(element => {
            
            if( element.language !== null){

               repositorios.innerHTML += `

                <div class= 'repositorio'>
                    <h2>${element.name}</h2>
                    <p>${element.language}</p>
                    <div class='informacoes'>
                      <p> teste</p>
                    
                    </div>
                </div>
        
               ` 
            }else{

                repositorios.innerHTML += `

                <div class= 'repositorio'>
                    <h2>${element.name}</h2>

                </div>
        
               ` 
            }
            
        }); 

    }else{
        alert("Nenhum resultado encontrado! ")
        filtro.value = ''
        exibirNaTela(listaRepositorios)
    }    

}

function gerenciarTelas(tela,status){

    if(status === true){
        document.querySelector(`.${tela}`).classList.remove('escondido')
    }else{
        document.querySelector(`.${tela}`).classList.add('escondido')
    }

}

function exibirNaTelaLateral(dados){

    const telaLateral = document.querySelector('.barraLateral')
    const nomeOrganizacao = dados[0].owner.login.toUpperCase()
    const linkLogo = dados[0].owner.avatar_url

    telaLateral.innerHTML += `
        
        <img src='${linkLogo}'>
        <h1> ${nomeOrganizacao}</h1>

    `

}
    
filtro.addEventListener('input', (event) => {

    if(event.target.value === '') filtrar() 

});

// console.log(document.body)


function criarElementos(){

    let divNova = document.createElement("div");
    let conteudoNovo = document.createTextNode("Olá, fui criado");
    divNova.appendChild(conteudoNovo); //adiciona o nó de texto à nova div criada

}

criarElementos()

