// ==UserScript==
// @name         ATALHOS PADRONIZADOS - CONSIGNADO CLT
// @version      1.2
// @match        https://s12.chatguru.app/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Ante-Deguemon/BINDS-CONSULTORES-GL-5.0/main/BINDS-CLT.user.js
// @downloadURL  https://raw.githubusercontent.com/Ante-Deguemon/BINDS-CONSULTORES-GL-5.0/main/BINDS-CLT.user.js
// ==/UserScript==

(function() {
    'use strict';

    // =========================================================================
    // CONFIGURAÇÃO DOS ATALHOS PADRÕES (IGUAL PARA TODOS OS CONSULTORES)
    // =========================================================================
    const CONFIGURACAO_ATALHOS = {
        'F3':  ['69dce931939d5d56e962fed1'], // FECHAR ATENDIMENTO
        'F4':  ['69dfc15c97192296c3d7f58a'], // GERAR LINK AUTORIZA
        'F6':  ['64550dedbf469f52f37d218d'], // PEDIR DOC CLT
        'F7':  ['69610f0979048dcd4033d958'], // FORM C6
        'F8':  ['660eed83b644ff84d9cfe4a9'], // TEMPLATE CONTINUAR ATENDIMENTO
        'F9':  ['69ef6933ed7b83c0680aaea1'], // DELEGAR FGTS
        'F10': [''], // NÃO MAPEADO
        'F11': [''], // NÃO MAPEADO
        'F12': [''], // NÃO MAPEADO
    };

    // =========================================================================
    // CONFIGURAÇÃO DA TECLA DE APRESENTAÇÃO INDIVIDUAL
    // =========================================================================
    const TECLA_APRESENTACAO = 'F1'; // Tecla que cada um usará para sua apresentação
    // =========================================================================


    function dispararClique(seletor) {
        if (typeof $ !== 'undefined') {
            var jqBtn = $(seletor);
            if (jqBtn.length > 0) { jqBtn.click(); return true; }
        }
        var jsBtn = document.querySelector(seletor);
        if (jsBtn) { jsBtn.click(); return true; }
        return false;
    }

    document.addEventListener('keydown', function(e) {
        const teclaPressionada = e.key.toUpperCase();

        // 1. LÓGICA DA APRESENTAÇÃO PESSOAL (ID INDIVIDUAL)
        if (teclaPressionada === TECLA_APRESENTACAO) {
            e.preventDefault();
            e.stopPropagation();

            // Tenta pegar o ID que está salvo no computador do funcionário
            let idPessoal = localStorage.getItem('id_apresentacao_consultor');

            // Se não tiver nenhum ID salvo ainda...
            if (!idPessoal) {
                // Abre a caixinha perguntando o ID
                idPessoal = prompt("Configuração Inicial:\nCole aqui o seu ID de Diálogo de Apresentação Pessoal:");
                
                if (idPessoal) {
                    idPessoal = idPessoal.trim();
                    // Salva no navegador para nunca mais pedir
                    localStorage.setItem('id_apresentacao_consultor', idPessoal);
                    alert("ID Salvo com sucesso! Aperte a tecla novamente para testar.");
                }
                return;
            }

            // Se já tem o ID salvo, faz o clique normal
            var selectorPessoal = 'button[data-dialog-id="' + idPessoal + '"]';
            dispararClique(selectorPessoal);
            return;
        }

        // 2. LÓGICA DOS ATALHOS PADRÕES DO GITHUB
        if (CONFIGURACAO_ATALHOS.hasOwnProperty(teclaPressionada)) {
            e.preventDefault();
            e.stopPropagation();

            const listaIds = CONFIGURACAO_ATALHOS[teclaPressionada];
            if (listaIds[0] === '') return;

            for (var i = 0; i < listaIds.length; i++) {
                var selector = 'button[data-dialog-id="' + listaIds[i] + '"]';
                if (dispararClique(selector)) break;
            }
        }
    }, true);
})();
