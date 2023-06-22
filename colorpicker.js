function SimplePicker() {
    this.picker = document.createElement("div");
    this.input = document.createElement("input");
    this.input.type = "color";
    this.input.style.cursor = "pointer";
    this.handler = (e) => {
        this.color = this.input.value;
        this.changeColor();
    };
    this.input.addEventListener("input", this.handler);
    this.input.style.opacity = "0";
    this.picker.appendChild(this.input);
    this.picker.setAttribute(
        "style",
        `
        width: max-content;
        background-color: black;
        cursor: pointer;
        border-radius: .3rem;
        margin: .1rem;
        `
    );
    this.picker.classList.add(".picker");
    this.color = "#000";
    this.changeColor();
    return this;
}

SimplePicker.prototype.setHandler = function (handler) {
    this.input.addEventListener("input", handler);
};
SimplePicker.prototype.changeColor = function () {
    this.color = this.input.value;
    this.picker.style.backgroundColor = this.color;
    return this;
};
SimplePicker.prototype.setDefaultColor = function (color) {
    this.color = color;
    this.input.value = color;
    this.changeColor();
    return this;
};
SimplePicker.prototype.appendTo = function (element) {
    element.appendChild(this.picker);
    return this;
};

function PickerRow(...options) {
    this.pickers = [];
    this.row = document.createElement("div");
    this.toDefault = document.createElement("div");
    this.toDefault.innerHTML = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADFElEQVR4nO2ayU9UQRCHPyPCGFfAEW/K0WBc/ggVFRXxIi43Fy4iQa8qNxP0ookJf4dKjBKNhLjgQjRGRVAvLgej3mTJoJhKfi/pkGGYefTM9DN8yUsm8/p1V72urq6uerDA/0sN0AxcBnqBYeAXMAlMAN+B98At4BLQAqwkEFLAMeAu8AeYLvAyJfuAQ8CSPMYbBB77VGApcBb45ghlb/0+cF4zsxGoloBVQFr/HQS6gAdAxnn+K9ABVOYYN2rrhT3AR6fTZ8BxYFVMczwJvHb6GwEai6mImVGP09kLYAf+2A28Ud9/gasa06si6yS4dfIbOA0sxj8VMtkJjTUok/SiSD3wQR28AzZRfLY5Y5qnWz9fRdLqyB5+CqyhdNTKQ01Lqbq4iqQcc3oELKP0rJAzMRmexFWkxzEn8y7log74NGP/KcjFRgu7FGvCGChgI817s4v2CfNOJFWRc84+UQwXWxKqFCqYIttJMEedsCPR9EkRi50SSw0wpfAgTgAYDAc0G/dIOFekiJ0nEk2vFNlHwhmRInaKSzQ/pUg54yovTEqRXGfmkBjQlWhFqpyER6JNKy1ZLVeW6MXeIFktCTir+91P+LRI1hu5NsQLhE+XZO3OdrNZNy1bGDr9krUp281qJ2hcTbjUyMNmciXB70jTE4RLm2S0NT0rR9ToOWGyCBiSjK1zbTRf1HAn4dEk2T5L1px0qvFQYMmHCuCVZGvPN8MY5V3PEA6dTi54ztmI2KWHxoDNlJ+twLhkKriUcd15A5ZQLmdcNSpZrsXpIDUjgVyOJPZy1UiiWkneJpXtbQw7ZQW36FKKje/hjLLCvKh3ptbMbAulWROjTk1xg6+O6xwzG1P11dyhbyrkncYdc1rre5CU4wDseinv5mvHtlJGtE9ECzv2msiHRmfao6z9KQWdcdZBmxN2TMuUfFaL55ydDiecib5isPD6orKWDXLblbpqVTRqUZt+J08QhR3txZ6F2bBBDwO3dQQo9BOOjKLY1nIpkA1LfO/Vqe2mao8/9NYn9futjqfdahvMRzUL4Jl/LdUeZXdmzywAAAAASUVORK5CYII=" width="32" height="32">`;
    this.toDefault
        .querySelector("img")
        .setAttribute("style", `user-select:none`);

    this.toDefault.setAttribute(
        "style",
        `display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: .3rem;
        margin: .2rem;
        `
    );
    this.row.setAttribute(
        "style",
        `width: max-content;
        background-color: #ddd;
        margin: 1rem 0.1rem;
        padding: .2rem;
        border-radius: .2rem;
        display: flex;
        `
    );

    options.forEach((option) => {
        var picker = new SimplePicker();
        var o = {};
        if (option.change != undefined) o.change = option.change;
        if (option.color != undefined) {
            o.color = option.color;
            picker.setDefaultColor(option.color);
        }

        if (option.title != undefined) o.title = option.title;
        o.picker = picker;
        this.pickers.push(o);
    });

    this.init();
}

PickerRow.prototype.init = function (element) {
    this.pickers.forEach((picker) => {
        if (
            picker.change != undefined &&
            picker.change.element != undefined &&
            picker.change.variable != undefined &&
            picker.picker.color != undefined
        ) {
            picker.picker.picker.addEventListener("input", function () {
                picker.change.element.style.setProperty(
                    picker.change.variable,
                    picker.picker.color
                );
            });
        }
        this.row.appendChild(picker.picker.picker);
    });
    this.row.appendChild(this.toDefault);
    this.toDefault.addEventListener("click", (e) => {
        this.pickers.forEach((picker) => {
            picker.picker.setDefaultColor(picker.color);
            picker.change.element.style.setProperty(
                picker.change.variable,
                picker.color
            );
        });
    });
};

PickerRow.prototype.appendTo = function (element) {
    element.appendChild(this.row);
    return this;
};
