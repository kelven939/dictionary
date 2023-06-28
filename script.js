// Acessar o elemento <div> onde o dicionário será exibido
var dictionaryElement = document.getElementById("dictionary");

// Função para fazer uma solicitação à API e exibir os resultados no dicionário
function getDictionaryData() {
    var word = prompt("Digite uma palavra:"); // Solicita ao usuário uma palavra a ser pesquisada

    // Realizar uma solicitação GET à API do WordsAPI para obter sinônimos e traduções
    fetch("https://google-translate1.p.rapidapi.com/language/translate/v2/detect" + word, {
        method: "GET",
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
		'Accept-Encoding': 'application/gzip',
		'X-RapidAPI-Key': 'dc6446a2admsh745128a0afca428p18b5e5jsn6a344212aafb',
		'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(data => {
        // Limpar o conteúdo atual do dicionário
        dictionaryElement.innerHTML = "";

        // Verificar se a palavra foi encontrada
        if (data.success && data.results) {
            // Exibir os sinônimos no dicionário
            if (data.results.synonyms) {
                var synonymsElement = document.createElement("p");
                synonymsElement.innerHTML = "<strong>Sinônimos:</strong> " + data.results.synonyms.join(", ");

                dictionaryElement.appendChild(synonymsElement);
            }

            // Exibir as traduções no dicionário
            if (data.results.translation) {
                var translationElement = document.createElement("p");
                translationElement.innerHTML = "<strong>Tradução:</strong> " + data.results.translation;

                dictionaryElement.appendChild(translationElement);
            }
        } else {
            // Se a palavra não for encontrada, exibir uma mensagem de erro
            var errorElement = document.createElement("p");
            errorElement.textContent = "Palavra não encontrada.";

            dictionaryElement.appendChild(errorElement);
        }
    })
    .catch(error => {
        console.log(error);
    });
}

// Chamar a função para solicitar a palavra ao usuário e exibir os resultados no dicionário
getDictionaryData();