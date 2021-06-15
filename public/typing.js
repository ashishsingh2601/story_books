var app = document.getElementById('typewriter');

var type = new Typewriter(app, {
    loop: true,
    delay: 75,
});

type
    .pauseFor(1800)
    .typeString("Pen down your life!")
    .pauseFor(2100)
    .deleteChars(19)
    .typeString("Secure your memories by writing them down.")
    .pauseFor(900)
    .deleteChars(42)
    .typeString("Click on login to start your journey")
    .pauseFor(900)
    .start();