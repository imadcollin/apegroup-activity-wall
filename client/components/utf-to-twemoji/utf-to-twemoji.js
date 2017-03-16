class UtfToTwemoji {

    beforeRegister() {
        this.is = `utf-to-twemoji`;
        this.properties = {
            emoji: {
                type: String,
                observer: `_emojiChanged`
            },
            noEmoji: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            }
        };
    }

    ready() {
        let lightTextContent = Polymer.dom(this).textContent.trim();
        if(lightTextContent && lightTextContent != ``) {
            this.emoji = lightTextContent; 
        }

        new MutationObserver(this._onMutation.bind(this))
            .observe(this, { childList: true, subtree: true, characterData: true });
    }

    _emojiChanged(newEmoji) {
        let localDOMContainer = Polymer.dom(this.root);
        let localDOMIcons = localDOMContainer.querySelectorAll(`.emoji-container`);
        localDOMIcons.map((child) => {
            localDOMContainer.removeChild(child);
        });

        if(newEmoji === ``) {
            this.noEmoji = true;

        } else if(newEmoji) {
            this.noEmoji = false;

            let div = document.createElement(`div`);
            div.classList.add(`emoji-container`);
            let twemojiParsed = twemoji.parse(newEmoji);
            div.innerHTML = twemojiParsed;
            localDOMContainer.appendChild(div);
        }

    }

    _onMutation(info) {
        let target = info[0].target;
        let textContent = target.textContent.trim();
        
        if(info[0].type === `characterData`) {
            this.emoji = textContent;
        }
    }
}

Polymer(UtfToTwemoji);