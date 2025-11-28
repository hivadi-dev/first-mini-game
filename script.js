let timerInterval;
let timerStarted = false;
let timeLeft = 5;

function startTimer() {
    if (timerStarted) return;
    timerStarted = true;

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("❌ باختی! زمانت تموم شد");
            location.reload();
        }
    }, 1000);
}





//هرحا در صفحه کلیک شد مهره اصلی ساخته شه
let flag = true
window.addEventListener('click', (e) => {
    if (flag) {
        let X = e.clientX
        let Y = e.clientY
        let _div = document.createElement('div')
        _div.classList.add('box')
        _div.style.left = X + 'px'
        _div.style.top = Y + 'px'
        document.body.appendChild(_div)
        flag = !flag
        box = _div
    }

})
//اتمام



// حرکت مهره در صفحه
window.addEventListener('keydown', (e) => {

    switch (e.key) {
        case 'ArrowLeft': moveleft(); break;
        case 'ArrowUp': moveup(); break;
        case 'ArrowRight': moveright(); break;
        case 'ArrowDown': movedown(); break;
    }
})

function moveleft() {
   let x = parseInt(getComputedStyle(box).left)
    if (x > 0) box.style.left = (x - 50) + 'px'
    checkHit()
}
function moveright() {
    let x = bparseInt(getComputedStyle(box).left)
    if (x < window.innerWidth - box.offsetWidth) box.style.left = (x + 50) + 'px'
    checkHit()
}
function moveup() {
    let y = parseInt(getComputedStyle(box).top)
    if (y > 0) box.style.top = (y - 50) + 'px'
    checkHit()
}
function movedown() {
    let y = parseInt(getComputedStyle(box).top)
    if (y < window.innerHeight - box.offsetHeight) box.style.top = (y + 50) + 'px'
    checkHit()
}

//اتمام



//تشکیل دانه های تصادفی در صفحه
function myRand() {
    let randW = Math.floor(Math.random() * ((window.innerWidth) - 50))
    let randH = Math.floor(Math.random() * ((window.innerHeight) - 50))

    let _div = document.createElement('div')
    _div.classList.add('doone')
    _div.style.left = randW + 'px'
    _div.style.top = randH + 'px'
    document.body.appendChild(_div)
}
for (let i = 0; i < 10; i++) {
    myRand()
}
//اتمام



//اضافه کردن دانه های تصادفی در صفحه
setInterval(() => {
    myRand()
}, 2000)
//اتمام



///برخورد مهره با دانه و بدست اوردن امتیاز
let score = 0
function checkHit() {

    let scoreplace = document.querySelector('#score')
    let seeds = document.querySelectorAll('.doone')
    let player = box.getBoundingClientRect()

    seeds.forEach(seed => {
        let seedRect = seed.getBoundingClientRect()

        let isHit = !(
            player.right < seedRect.left ||
            player.left > seedRect.right ||
            player.bottom < seedRect.top ||
            player.top > seedRect.bottom
        )

        if (isHit) {

            startTimer();
            seed.style.transform = "scale(0)"
            score++
            scoreplace.textContent = score
            seed.remove()

            if (score >= 7) {
                clearInterval(timerInterval); // تایمر قطع می‌شود
                timerStarted = false;         // جلوگیری از دوباره فراخوانی تایمر
                alert("🎉 برنده شدی! در5 ثانیه، 7 تا دونه خوردی!");
            }

        }
    })
}
///اتمام

