import { createElement } from '../utils/dom';

export var layoutPlugin = {
    by: "layout",
    split: function(el, opts) { 
        // detect and set options
        opts.image = opts.image || (el.dataset && el.dataset.image) || el.currentSrc || el.src;
        opts.rows = opts.rows || (el.dataset && el.dataset.rows) || 1;
        opts.cols =  opts.cols || (el.dataset && el.dataset.cols) || 1;
 
        // Seek out the first <img> if the value is true
        if ( opts.image === true ) {
            var img = el.querySelector("img");
            opts.image = img && (img.currentSrc || img.src);
        }
        
        // add optional image to background
        if (opts.image) {
            el.style.setProperty("background-image", "url(" + opts.image + ")");
        }

        var totalCells = opts.rows * opts.cols;
        var elements = [];
        var container = document.createElement('span'); 
        container.className = 'cell-grid';
        for (var i = 0; i < totalCells; i++) {
            // Create a span
            var cell = createElement(container, 'cell');
            var inner = createElement(cell, 'cell-inner');
            elements.push(cell);
        }

        // Append elements back into the parent
        el.appendChild(container);

        return elements;
    }
};
