const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

$(".container").on("input", ".color > input[type=color]", function (e) {
    $(".color")[0].style.setProperty("--color", e.currentTarget.value);
    e.delegateTarget.style.setProperty("--tbtn-2-", e.currentTarget.value);
});

$(".trdbtn").click(function(e) {
    console.log(e.delegateTarget.classList.toggle("checked"));
})


const c = document.querySelector("#slider");

const s = new SlideSwitcher({
    directions: "column",
})
    .add("first", "second", "thrid")
    .appendTo(c);

const pickerRow = new PickerRow(
    {
        color: "#9b9b9b",
        title: "bg",
        change: {
            element: s.getElement(),
            variable: "--switcher-bg-color-",
        },
    },
    {
        color: "#cccccc",
        title: "bg",
        change: {
            element: s.getElement(),
            variable: "--switcher-element-color-",
        },
    },
    {
        color: "#000000",
        title: "bg",
        change: {
            element: s.getElement(),
            variable: "--switcher-element-text-",
        },
    },
    {
        color: "#717171",
        title: "bg",
        change: {
            element: s.getElement(),
            variable: "--switcher-slider-color-",
        },
    },
    {
        color: "#ffffff",
        title: "bg",
        change: {
            element: s.getElement(),
            variable: "--switcher-slider-text-",
        },
    },
).appendTo(c);
