// Acessar o elemento <div> onde o dicionário será exibido
var dictionaryElement = document.getElementById("dictionary");

// Função para fazer uma solicitação à API e exibir os resultados no dicionário
function getDictionaryData() {
    var word = prompt("Digite uma palavra:"); // Solicita ao usuário uma palavra a ser pesquisada

    // Realizar uma solicitação GET à API do Thesaurus.com
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en_US/" + word)
        .then(response => response.json())
        .then(data => {
            // Limpar o conteúdo atual do dicionário
            dictionaryElement.innerHTML = "";

            // Verificar se a palavra foi encontrada
            if (data.title) {
                // Se a palavra não for encontrada, exibir uma mensagem de erro
                var errorElement = document.createElement("p");
                errorElement.textContent = "Palavra não encontrada.";

                // Adicionar o elemento de erro ao dicionário
                dictionaryElement.appendChild(errorElement);
            } else {
                // Iterar sobre as definições da palavra
                data[0].meanings.forEach(meaning => {
                    // Criar elementos para exibir cada definição
                    var definitionElement = document.createElement("p");
                    definitionElement.innerHTML = "<strong>" + meaning.partOfSpeech + "</strong>: " + meaning.definitions[0].definition;

                    // Adicionar os elementos ao dicionário
                    dictionaryElement.appendChild(definitionElement);
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
}

// Chamar a função para solicitar a palavra ao usuário e exibir os resultados no dicionário
getDictionaryData();