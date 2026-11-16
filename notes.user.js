// ==UserScript==
// @name        Novel Notes
// @namespace   https://github.com/readsack
// @icon
// @version     1.0.0
// @include       *
// @author      readsack
// @description Bookmarking Extension
// @grant        GM_getValue
// @grant        GM_setValue

// ==/UserScript==

/*
Color Palette
Backgrounds
bg: #17181c
bg-alt: #22242a
bg-hover: #2c2f36
Foreground
text: #d7d9df
text-muted: #8b909b
white: #eceef2
Accent
accent: #e5a05a
accent-alt: #e5a05a
accent-hover:#f0b777
UI
border: #30333b 
*/

(function() {
    "use strict";

    // Your code starts here

    console.log("Userscript loaded!");
    const styles = document.createElement("style");
    styles.innerText = `
        
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        .mainbox-vmonkey {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            
        }
        .container-vmonkey {
            width: 80%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .container-vmonkey > textarea {
            width: 100%;
            background-color: rgba(0,0,0,0);
            border: 2px solid #30333b;
            resize: none;
            transition: all ease 500ms;
            color: #d7d9df;
            font-family: 'Space Mono';
            font-size: 1rem;
            padding: 10px;
            height: calc(1ch + 20px);
        }
        .textbox-vmonkey {
            height: 100px !important;
            font-size: 0.9rem !important;
        }
        
        .notebox-vmonkey:hover {
            border: 2px solid #e5a05a;
        }
        .btn-vmonkey {
            padding: 10px 60px;
            background-color: #e5a05a;
            color: #d7d9df;
            margin: 10px 0;
            font-weight: bold;
            font-family: 'Space Mono';
            border: none;
            outline: none;
        }
        .label-vmonkey {
            color: #d7d9df;
            margin-top: 15px;
                font-family: 'Space Mono';
            text-align: left;
            width: 100%;
        }

    `;
    var save = (e) => {
        var values = GM_getValue("NovelNotesData", []);
        if (document.querySelector(".textbox-vmonkey").value.trim() == "") {
            return;
        }
        values = [...values, {
            url: document.URL,
            sel: document.querySelector(".textbox-vmonkey").value,
            note: document.querySelector(".notebox-vmonkey").value
        }]
        GM_setValue("NovelNotesData", values);
        console.log(GM_getValue("NovelNotesData", []))
    }
    document.head.appendChild(styles);
    const widget = document.createElement("div");
    widget.style.position = "fixed";
    widget.style.width = "300px";
    widget.style.height = "320px";
    widget.style.zIndex = "2147483647";
    widget.style.backgroundColor = "#17181c";
    widget.style.bottom = "10px";
    widget.style.left = "10px";
    widget.style.border = "2px solid #30333b";
    widget.innerHTML = `
        <div class="mainbox-vmonkey">
            <div class="container-vmonkey">
                <div class="label-vmonkey">Selected Text: </div>
                <textarea class="textbox-vmonkey" readonly></textarea>
                <div class="label-vmonkey">Notes: </div>
                <textarea class="notebox-vmonkey"></textarea>
                <button class="btn-vmonkey">Save</button>
            </div>
        </div> 
    `;
    document.addEventListener("selectionchange", () => {
        const selectedText = window.getSelection().toString();
        if (selectedText.length > 0)
            document.querySelector(".textbox-vmonkey").value = selectedText;
    });
    document.body.appendChild(widget);
    if (document.querySelector(".btn-vmonkey") != null)
        document.querySelector(".btn-vmonkey").addEventListener("click", save)
})();
