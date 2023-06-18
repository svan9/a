$(".container").html(`<div class="tbtn"></div>`.repeat(104));

const randint = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const r = randint(0, 104);

$($(".container > *").get(r)).on("click", function () {
    document.body.innerHTML =
        `<video src="cote.webm" style="width: 100%" autoplay loop></video>`.repeat(
            4
        );
});
