const createStyle = function (text) {
    var style = document.createElement("style");
    style.type = "text/css";
    style.innerHTML = text;
    document.getElementsByTagName("head")[0].appendChild(style);
};

function SlideSwitcher() {
    createStyle(`
    .ll___slideswither {
        background-color: var(--switcher-bg-color-);
        padding: 0.1rem;
        width: max-content;
        border-radius: 0.4rem;
        display: flex;
    }
    .ll___slideswither > div,
    .ll___slideswither > span {
        background-color: var(--switcher-element-color-);
        padding: 0.2rem 1rem;
        margin: 0.1rem 0.1rem;
        border-radius: 0.4rem;
        letter-spacing: 1px;
        color: var(--switcher-element-text-);
        cursor: pointer;
    }
    .ll___slideswither > span {
        position: absolute;
        background-color: var(--switcher-slider-color-);
        color: var(--switcher-slider-text-);
    }
    
    `);

    this.sliderPosition = 0;
    this.slider = document.createElement("span");
    this.folder = document.createElement("div");
    this.pool = [];
    window.onload = () => this.init(this);
    return this;
}

SlideSwitcher.prototype.add = function (...arr) {
    arr.forEach((e) => {
        let file = document.createElement("div");
        file.innerHTML = e;
        this.folder.appendChild(file);
        this.pool.push(file);
    });
    return this;
};
SlideSwitcher.prototype.changeSlider = function () {
    var file = this.pool[this.sliderPosition];
    var style = document.defaultView.getComputedStyle(file, "");
    this.slider.innerHTML = file.innerHTML;
    this.slider.setAttribute(
        "style",
        `transition: left 0.3s, top 0.2s, width 0.1s;
        width: ${parseFloat(style.getPropertyValue("width")) + 0.5}px;
        top: ${file.offsetTop - parseFloat(style.getPropertyValue("margin"))}px;
        left: ${
            file.offsetLeft - parseFloat(style.getPropertyValue("margin"))
        }px;`
    );
};
SlideSwitcher.prototype.appendTo = function (element) {
    element.appendChild(this.folder);
    return this;
};

// SlideSwitcher.prototype.var = function (name) {
//     // if (name == "bg")
//     return this.folder;
// }
SlideSwitcher.prototype.getElement = function () {
    return this.folder;
};
SlideSwitcher.prototype.init = function (element) {
    element.folder.classList.add("ll___slideswither");
    element.folder.setAttribute(
        "style",
        `--switcher-bg-color-: #9b9b9b;
        --switcher-element-color-: #ccc;
        --switcher-element-text-: #000;
        --switcher-slider-color-: #717171;
        --switcher-slider-text-: #fff;
    `
    );
    this.changeSlider();
    element.folder.insertBefore(element.slider, element.folder.firstChild);
    element.pool.forEach((f) =>
        f.addEventListener("click", function (e) {
            var pos = [...this.parentNode.children].indexOf(this);
            element.sliderPosition = pos - 1;
            element.changeSlider();
        })
    );
    window.onresize = () => {
        element.changeSlider();
    };
    return this;
};
