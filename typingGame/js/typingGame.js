"use strict"
{
    let div;
    function all() {       
        div = document.createElement("div");
        div.classList.add("div");
        document.body.appendChild(div);
        let p = document.createElement("p");
        p.classList.add("p");
        div.appendChild(p);
        let p2 = document.createElement("p");
        p2.classList.add("p");
        div.appendChild(p2);
        //スタート画面
        function start() {
            let counter = 3;
            let timer;
            p.textContent = "typing game";
            p2.textContent = "click to Start";
            p2.addEventListener("click", c);
            function c() {
                div.removeChild(p2);
                clearInterval(timer);
                timer = setInterval(Counter, 700);
                
            }
            function Counter() {
                p.textContent = counter;
                counter--;
                if (counter < 0) {
                    counter = 3;
                    clearInterval(timer);
                    p.textContent = "Start!";
                    p2.removeEventListener("click", c)
                    game();
                }
            }
        }
        //ゲーム画面
        const howMany = 6;
        let typeCounter = 0;
        let wrongCounter = 0;
        let word;
        let wordCount = 0;
        let clickedKey;
        let chart = 0;
        let seconds = 0;
        let timer;
        let check = true;
        const words = [
            "mercury", "venus", "creter", "mars", "jupiter", "aurora",
            "saturn", "uranus", "neputune", "phobos", "deimos", "io",
            "europa", "ganymede", "callisto", "titan", "enceladus",
            "miranda", "titania", "triton", "charon",
        ];
        function game() {
            div.appendChild(p2);
            timeCounter();
            document.addEventListener("keydown", (e) => {
                clickedKey = e.key;
                wordChecker();
            });
            wordSelector();
        }
        function timeCounter() {
            timer = setInterval(tick, 10);
        }
        function tick() {
            seconds++;
        }
        function wordSelector() {
            const num = Math.floor(Math.random() * words.length);
            word = words[num];
            p2.textContent = word;
            words.splice(num, 1)
            wordCount++;
        }
        function wordChecker() {
            if (word[chart] !== clickedKey) {
                wrong();
            } else {
                collect();
            }
        }
        function wrong() {
            if (check === true) {
                p2.classList.add("wrong");
                setTimeout(wr, 1);
            }
            wrongCounter++;;
        }
        function wr() {
            p2.classList.remove("wrong");
        }
        function collect() {
            typeCounter++;
            chart++;
            if (word.length === chart && wordCount === howMany) {
                end();
            } else if (word.length === chart) {
                wordSelector();
                chart = 0;
            } else {
                p2.textContent = "_".repeat(chart) + word.substring(chart);
            }
        }
        //ゲーム終了処理
        function end() {
            const queue1 = [];
            const queue2 = [];
            let qSeconds = String(seconds);
            for (var i = qSeconds.length - 2 ; i < qSeconds.length ; i ++) {
                queue1.push(qSeconds[i]);
            }
            for (var i = 0 ; i < qSeconds.length - 2 ; i ++) {
                queue2.push(qSeconds[i]);
            }
            qSeconds = queue2.join("") + "." + queue1.join("");
            p.textContent = `${qSeconds}seconds / ${Math.floor((typeCounter / (typeCounter + wrongCounter)) * 10000) / 100}%`;
            p2.textContent = "click to restart";
            p2.addEventListener("click", restart);
            check = false;
        }
        start();
    }
    all();
    //リスタート処理
    function restart() {
        document.body.removeChild(div);
        all();
    }
}