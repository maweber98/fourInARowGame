class Token {
    constructor(index, owner) {
        this.owner = owner;
        this.id = `token-${index}-${owner.id}`;
        this.dropped = false;
        this.columnLocation = 0;
    }

    drawHTMLToken() {
        const token = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(token);
        token.setAttribute('id', this.id);
        token.setAttribute('class', 'token');
        token.style.backgroundColor = this.owner.color;
    }

    /**
     * Gets associated htmlToken
     * @return {element} HTML element associated with token object
     */
    get htmlToken() {
        return document.getElementById(this.id);
    }

    /**
     * Gets leftOffset of html element
     * @return {string} Left offset of token object's htmlToken
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    /**
     * Moves html token one column to the left
     */
    moveLeft() {
        if (this.columnLocation > 0) {
            this.htmlToken.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    /**
     * Moves html token one column to the right
     */
    moveRight(columns) {
        if (this.columnLocation < columns - 1) {
            this.htmlToken.style.left = this.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /** 
     * Drops html token into targeted board space.
     * @param   {Object}   target - Targeted space for dropped token.
     * @param   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset) {
        this.dropped = true;

        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }

}