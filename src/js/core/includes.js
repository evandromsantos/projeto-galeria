import $ from 'jquery' // Importando jQuery

// Constante 'loadHtmlSuccessCallbacks' recebe um Array de funções callback
const loadHtmlSuccessCallbacks = []

// Criando e exportando uma função que será executada quando for ler um 'import' HTML
// -> Que recebe como parâmetro uma callback
export function onLoadHtmlSuccess(callback) {
    // Adicionando a 'callback' dentro do Array 'loadHtmlSuccessCallbacks'
    // Para não adicionar a mesma 'callback' mais de uma vez
    if (!loadHtmlSuccessCallbacks.includes(callback)) { // Se a 'callback' não estiver incluida dentro do Array
        loadHtmlSuccessCallbacks.push(callback) // Fazemos um 'push()' da callback para incluir
    }
}

// Crie uma função para ler todos os atributos [wm-include]
// -> Passando como parâmetro 'parent' que é a 'tag' que tem as propriedades [wm-include]
function loadIncludes(parent) {
    // Se 'parent' estiver vazio 
    if (!parent) parent = 'body' // Irá procurar no 'body' inteiro

    // Selecionando 'parent' com jQuey
    // -> Use a função 'find()' para procurar dentro do 'parent' todos elementos de possuem '[wm-include]'
    // -> Use a função 'each()' para pegar cada um dos elementos encontrados
    $(parent).find('[wm-include]').each(function (ind, elem) {
        // Constante 'url' recebe o elemento com o atributo 'wm-include'
        const url = $(elem).attr('wm-include')

        // Fazendo uma chamada 'Ajax'
        $.ajax({
            url, // Passando como primeiro parâmetro a 'url'
            success(data) { // Como segundo parametro a função que vai ser chamada se for bem sucedido -> Passando 'data'(resultado) como parâmetro 
                $(elem).html(data) // Pegando o elemento atual -> Chama a função 'html()' e seta 'data' dentro do 'html()'
                $(elem).removeAttr('wm-include') // Depois excluir a propriedade para não ter outra interpretação dela

                // Chamando o Array que será executado no sucesso da leitura de um HTMl
                // -> E Para cada um dos elementos será executado uma callback 
                // -> Passando o atributo(data = Dados obtidos) como paramentro
                loadHtmlSuccessCallbacks.forEach(callback => callback(data))

                loadIncludes(elem) // Chamando a função 'loadIncludes' para caso tenha outros includes nos 'elementos'(elem) que foram obtidos -> até carregar tudo de forma recursiva
            }
        })
    })
}
loadIncludes()