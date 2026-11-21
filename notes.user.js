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
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
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
            height: 320px;
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
            font-size: 16px;
            padding: 10px;
            border-radius: 0px;
        }
        .textbox-vmonkey {
            height: 96px !important;
            font-size: 12px !important;
        }
        .notebox-vmonkey {
            height: 48px !important;
            display: flex;
            align-items: center;
        } 
        
        .notebox-vmonkey:hover {
            border: 2px solid #e5a05a;
        }
        .btn-vmonkey {
            padding: 10px 60px;
            background-color: #e5a05a;
            color: #d7d9df;
            margin-top: 16px;
            font-weight: bold;
            font-family: 'Space Mono';
            border: none;
            outline: none;
            font-size: 14px;
        }
        .label-vmonkey {
            color: #d7d9df;
            margin-top: 15px;
                font-family: 'Space Mono';
            text-align: left;
            font-size: 14px;
            width: 100%;
        }

    `;
    var save = (e) => {
        var values = GM_getValue("NovelNotesData", []);
        if (document.querySelector(".textbox-vmonkey").value.trim() == "") {
            return;
        }
        values = [
            ...values,
            {
                url: document.URL,
                sel: document.querySelector(".textbox-vmonkey").value,
                note: document.querySelector(".notebox-vmonkey").value,
            },
        ];
        GM_setValue("NovelNotesData", values);
        console.log(GM_getValue("NovelNotesData", []));
    };
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
        document.querySelector(".btn-vmonkey").addEventListener("click", save);
    let allNotesWindow = (e) => {
        document.title = "Saved Notes!";
        var values = GM_getValue("NovelNotesData", []);
        document.documentElement.innerHTML = `
            <header>
                <title>Saved Notes!</title>
            </header>
            <body>
                <div class="title">All Your Saved Notes!</div>
            </body>
        `;
        let mainCont = document.createElement("div");
        mainCont.classList.add("cont");

        let handleDel = (id) => {
            let newValues = values.splice(id, id);
            delete values[id];
            GM_setValue("NovelNotesData", values);
            mainCont.innerHTML = "";
            values.forEach((n, i) => {
                mainCont.appendChild(
                    createNoteElement(i, n.url, n.sel, n.note),
                );
            });
            document.body.appendChild(mainCont);
        };

        let createNoteElement = (id, url, text, note) => {
            let noteBox = document.createElement("div");
            noteBox.classList.add("note");
            let userNote = document.createElement("div");
            userNote.classList.add("usernote");
            userNote.innerText = note;
            let selected = document.createElement("div");
            selected.classList.add("sel");
            selected.innerText = text;
            let web = document.createElement("button");
            web.classList.add("web-btn");
            web.onclick = () => {
                unsafeWindow.navigation.navigate(url);
            };
            web.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
</svg>
            `;
            let del = document.createElement("button");
            del.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>
            `;
            del.classList.add("del-btn");
            del.onclick = () => {
                handleDel(id);
            };
            let buttons = document.createElement("div");
            buttons.classList.add("buttons");

            buttons.appendChild(web);
            buttons.appendChild(del);
            noteBox.appendChild(selected);
            noteBox.appendChild(userNote);
            noteBox.appendChild(buttons);

            return noteBox;
        };
        values.forEach((n, i) => {
            mainCont.appendChild(createNoteElement(i, n.url, n.sel, n.note));
        });
        document.body.appendChild(mainCont);
        const styles = document.createElement("style");
        styles.nonce = "8IBTHwOdqNKAWeKl7plt8g==";
        styles.innerText = `
            @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
            body {
                background-color: #17181c;
            }
            * {
             font-family: "Space Mono";   
            }
            .title {
                font-size: 32px;
                color: white;
            }
            .note {
                padding: 32px;
                border: #30333c 2px solid;
                display: flex;
                flex-direction: column;
            }
            .sel {
                color: #e5a05a;
                background-color: #2c2f36;
                font-size: 14px;
            }
            .usernote {
                color: #d7d9df;
                font-size: 16px;
                margin-top: 16px;
            }
            .cont {
                display: grid;
                padding: 16px;
                grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
                gap: 16px;
            }
            .buttons {
                margin-top: auto; 
                padding-top: 16px;
                display: flex;
                gap: 8px;
            }
            button {
                border: 2px solid #30333c;
                padding: 8px;
                background-color: transparent;
                outline: none;
                width: 32px;
                height: 32px;
                color: #d7d9df;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
            }
            .web-btn {
                border-color: #e5a05a;
                color: #e5a05a;
            }
            .web-btn:active {
                color: #17181c;
                background-color: #e5a05a;
            }
            .del-btn {
                color: #925b5b;
                border-color: #925b5b;
            }
            .del-btn:active {
                background-color: #925b5b;
                color: #17181c;
            }

        `;
        document.body.appendChild(styles);
    };
    GM_registerMenuCommand("All Notes", allNotesWindow);
})();
