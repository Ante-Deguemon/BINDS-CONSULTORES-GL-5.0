// ==UserScript==
// @name         ATALHOS PADRONIZADOS - CONSULTORES LUCAS FGTS
// @version      1.0
// @match        https://s12.chatguru.app/*
// @grant        none
// @updateURL    https://raw.githubusercontent.com/Ante-Deguemon/BINDS-CONSULTORES-GL-5.0/main/BINDS-LUCAS-FGTS.user.js
// @downloadURL  https://raw.githubusercontent.com/Ante-Deguemon/BINDS-CONSULTORES-GL-5.0/main/BINDS-LUCAS-FGTS.user.js
// ==/UserScript==

(function() {
    'use strict';

    // =========================================================================
    //
    //                           PROIBIDO ALTERAR POR CONTA PROPRIA!
    //
    // =========================================================================
    const CONFIGURACAO_ATALHOS = {
        'F1':  ['69205d691b9474ab13c568d3'], // AUDIO FGTS NEGADO
        'F2':  ['6a046ebfb0a8ea9bc8b3d409'], // DELEGAR CLT
        'F3':  ['6a6cd569df27400876c417c9'], // FLUXO FGTS
        'F4':  ['6a6cd577df27400876c417fc'], // ENVIO MANUAL FILA FGTS CONSULTORES
        'F6':  ['69dce931939d5d56e962fed1'], // FECHAR ATENDIMENTO
        'F7':  ['65f9b93c0962dc56032327ce'], // SEM SALDO
        'F8':  ['660eed83b644ff84d9cfe4a9'], // CONTINUAR ATENDIMENTO
        'F9':  ['67d2d40f754db923f517fb7f'], // DETALHADO BMS
        'F10': ['699721ee8320bfb90ed2464a'], // ANIVERSÁRIO
        'F11': ['6a18695f48bb99c330346eb8'], // AINDA NÃO AUTORIZOU BMS
        'F12': ['6a3064a215997fc4040dfe15'], // INICIO ATEND
    };
    // =========================================================================

    function dispararClique(seletor) {
        if (typeof $ !== 'undefined') {
            var jqBtn = $(seletor);
            if (jqBtn.length > 0) {
                jqBtn.click();
                return true;
            }
        }
        var jsBtn = document.querySelector(seletor);
        if (jsBtn) {
            jsBtn.click();
            return true;
        }
        return false;
    }

    document.addEventListener('keydown', function(e) {
        const teclaPressionada = e.key.toUpperCase();

        if (CONFIGURACAO_ATALHOS.hasOwnProperty(teclaPressionada)) {

            // Mudança aqui: Força o bloqueio do comando do Chrome imediatamente
            // Isso impede o F6 de ir para a barra de endereço e o F1 de abrir ajuda.
            e.preventDefault();
            e.stopPropagation();

            const listaIds = CONFIGURACAO_ATALHOS[teclaPressionada];

            if (listaIds[0] === '') {
                return;
            }

            for (var i = 0; i < listaIds.length; i++) {
                var selector = 'button[data-dialog-id="' + listaIds[i] + '"]';
                var clicouComSucesso = dispararClique(selector);

                if (clicouComSucesso) {
                    break;
                }
            }
        }
    }, true); // O "true" aqui faz o script ouvir a tecla antes de qualquer outra coisa na página
})();
