import $ from 'jquery' // Importando jQuery

import { onLoadHtmlSuccess } from '../core/includes' // Importando a função que irá executar quando for carregar um HTML

// Constante que recebe a duração da animação
const duration = 300

// Função que vai filtrar as cidades
// -> Passando como parâmetro 'city' 
function filterByCity(city) {
    // Selecionando os elemento que contém o atributo 'wm-city'
    // -> Usando a função 'each()' para pegar cada elemento encontrado
    $('[wm-city]').each(function (ind, elem) {
        // Constante 'isTarget' recebe o elemento atual que contém o atributo 'wm-city'
        // -> que é igual á 'city' ou igual á 'null'
        // -> Se 'city' não for 'null' irá mostrar mostrar o elemento que foi passado
        // -> Se for 'null' qualquer elemento será alvo e irá mostrar todos elementos
        const isTarget = $(this).attr('wm-city') === city || city === null

        if (isTarget) { // Se 'isTarget' for 'true' irá mostrar o elemento
            $(this).parent().removeClass('d-none')
            $(this).fadeIn(duration)
        } else { // Se não irá esconder o elemento
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none')
            })
        }
    })
}

$.fn.cityButtons = function () {
    // Constante 'cities' recebe o contrutor 'Set'
    const cities = new Set

    // Selecionando os elementos que contém o atributo 'wm-city'
    // -> Usando a função 'each()' para pegar cada elemento encontrado
    $('[wm-city]').each(function (ind, elem) {
        // Adicionando os elementos com o atributo 'wm-city' dentro da constante 'cities'
        cities.add($(elem).attr('wm-city'))
    })
    // Constante 'btns' recebe um 'Array' com os elementos que estão dentro do 'cities'
    // -> Usando a função 'map()' para transformar as cidades em botão
    const btns = Array.from(cities).map(city => {        
        // Constante 'btn' recebe um elemento 'button'
        // -> Usando 'addClass()' para adicionar as classes 'btn' e 'btn-info'
        // -> Usando 'html()' para adicionar o nome da cidade como conteúdo do botão
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)

        // 'btn' recebe um evento de 'click' que chama a função 'filterByCity()'
        // -> Passando como parâmetro o nome da cidade 'city'
        btn.on('click', elem => filterByCity(city))
        return btn
    })    

    // Constante 'btnAll' recebe um elemento 'button'
    // -> Usando 'addClass()' para adicionar as classes 'btn', 'btn-info' e 'active'
    // -> Usando 'html()' para adicionar o nome 'Todas' ao botão 
    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas')

    // 'btnAll' recebe um evento de 'click' que chama a função 'filterByCity()'
    // -> Passando como parâmetro 'null'
    btnAll.on('click', elem => filterByCity(null))

    // Adicionando 'btnAll' para o Array 'btns'
    btns.push(btnAll)

    // Constante 'btnGroup' recebe um elemento 'div'
    // -> Usando 'addClass()' para adicionar a classe 'btn-group'
    const btnGroup = $('<div>').addClass(['btn-group'])

    // Adicionando todos os botões dentro do 'btnGroup'
    btnGroup.append(btns)

    // Adicionando dentro do elemento atual o 'btnGroup'
    $(this).html(btnGroup)
    return this
}

onLoadHtmlSuccess(function () {
    // Selecionando o elemento que contém o atributo 'wm-city-buttons'
    // -> E Executando a função 'cityButtons()'
    $('[wm-city-buttons]').cityButtons()
})


