// Acessar o elemento <div> onde o dicionário será exibido
const dictionaryElement = document.getElementById("dictionary");

// Acessar o input de texto e o botão
const wordInput = document.getElementById("word");
const btnSearch = document.getElementById("btnSearch");

// Função para fazer uma solicitação à API e exibir os resultados no dicionário
function getDictionaryData() {
    let word = wordInput.value; // Obter a palavra digitada pelo usuário

    // Realizar uma solicitação GET à API do Big Huge Thesaurus
    fetch("https://api.datamuse.com/words?ml=" + word)
        .then(response => response.json())
        .then(data => {
            // Limpar o conteúdo atual do dicionário
            dictionaryElement.innerHTML = "";

            // Verificar se a palavra foi encontrada
            if (data.length > 0) {
                // Iterar sobre as palavras sinônimas
                data.forEach(synonym => {
                    // Criar elementos para exibir cada sinônimo
                    var synonymElement = document.createElement("p");
                    synonymElement.textContent = synonym.word;

                    // Adicionar os elementos ao dicionário
                    dictionaryElement.appendChild(synonymElement);
                });
            } else {
                // Se a palavra não for encontrada, exibir uma mensagem de erro
                var errorElement = document.createElement("p");
                errorElement.textContent = "Palavra não encontrada.";

                // Adicionar o elemento de erro ao dicionário
                dictionaryElement.appendChild(errorElement);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Adicionar evento de clique ao botão de pesquisa
btnSearch.addEventListener("click", getDictionaryData);

// Chamar a função pela primeira vez para exibir o dicionário vazio
getDictionaryData();