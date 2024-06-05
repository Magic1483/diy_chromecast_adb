// ==UserScript==
// @name         бомжацкий хромкаст
// @namespace    http://tampermonkey.net/
// @version      2024-02-03
// @description  бомжацкий хромкаст
// @author       You
// @match        *://*.youtube.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==




function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });

        // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}



(function() {
    const DEST_IP = '192.168.100.4'

    function cast(){
        fetch('http://localhost:8800/cast', {
            method: "POST",
            body: JSON.stringify({
                url:window.location.href,
                dest_url:DEST_IP
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
    }

    waitForElm('div#flexible-item-buttons>yt-button-view-model>button-view-model>button>div').then((elm) => {
        document.getElementById('flexible-item-buttons').style.display = 'none'

        let t = document.createElement('div');
        t.id = 'cast_element';
        document.querySelector('ytd-menu-renderer').appendChild(t)

        t.textContent = 'Cast2TV';

        t.style.width = '100px';
        t.style.color = 'white';
        t.style.alignItems = 'center';
        t.style.display = 'flex';
        t.style.justifyContent = 'center';
        t.style.fontSize = 'large';
        t.style.cursor = 'pointer';
        t.onclick = cast;
        t.style.backgroundColor = '#272727';
        t.style.borderRadius = '50px';
        t.style.marginLeft = '2%';



    });
})();