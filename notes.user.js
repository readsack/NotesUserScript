// ==UserScript==
// @name        Novel Notes
// @namespace   https://github.com/readsack
// @icon
// @version     1.0.0
// @include       *
// @author      readsack
// @description Bookmarking Extension
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

(function () {
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
            height: 20px;
            background-color: rgba(0,0,0,0);
            border: 2px solid #30333b;
            resize: none;
            transition: all ease 500ms;
            color: #d7d9df;
            font-family: 'Space Mono';
            padding: 10px;
        }
        .textbox-vmonkey {
            height: 100px !important;
            font-size: 12px;
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
        }
        .label-vmonkey {
            color: #d7d9df;
            margin-top: 15px;
            font-family: 'Space Mono';
            text-align: left;
            width: 100%;
        }

    `;
    document.head.appendChild(styles);
    document.addEventListener("select");
    const widget = document.createElement("div");
    widget.style.position = "sticky";
    widget.style.width = "300px";
    widget.style.height = "300px";
    widget.style.zIndex = "1000";
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
                <div class="btn-vmonkey">Save</div>
            </div>
        </div> 
    `;
    document.addEventListener("selectionchange", () => {
        const selectedText = window.getSelection().toString();
        if (selectedText.length > 0)
            document.querySelector(".textbox-vmonkey").value = selectedText;
    });
    document.body.appendChild(widget);
})();
