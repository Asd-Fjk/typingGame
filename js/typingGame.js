"use strict"

{
    //スタート画面
    all();
    function all() {
        const div = document.createElement("div");
        div.classList.add("div");
        div.id = "div";
        document.body.appendChild(div);
        const p1 = document.createElement("p");
        p1.textContent = "Typing Game";
        p1.classList.add("basic", "p1");
        div.appendChild(p1);
        const p2 = document.createElement("p");
        p2.textContent = "Click to Start!!";
        p2.classList.add("basic");
        div.appendChild(p2);
        //スタート画面
        //ゲーム開始
        let startCounter = 3;
        let timer = NaN;
        function p2Event() {
            setTimeout(game, 4000);
            div.removeChild(p2);
            timer = setInterval(function() {
                p1.textContent = startCounter;
                startCounter--;
                if (startCounter < 0) {
                    startCounter = 3;
                    p1.textContent = "Start!!";
                    clearInterval(timer);
                }
            }, 1000)
            p2.removeEventListener("click", p2Event);    
        }
        function p2Event2() {
            setTimeout(game, 4000);
            div.removeChild(p2);
            timer = setInterval(function() {
                p1.textContent = startCounter;
                startCounter--;
                if (startCounter < 0) {
                    startCounter = 3;
                    p1.textContent = "Start!!";
                    clearInterval(timer);
                }
            }, 1000)
            p2.removeEventListener("keydown", p2Event2);
        }
        p2.addEventListener("click", p2Event);
        p2.addEventListener("keydown", function(e) {
            if (e.key === "e")
            p2Event2();
        });
        //ゲーム開始
        const selectedWordNumber = 3;
        let type = 0;
        let missType = 0;
        let clickedKey;
        let wordNumber = 0;
        let word;
        let loc = 0;
        let finishTimer = 0;
        const intervalTimer = NaN;
        const words = [
            "word",
            "excel",
            "powerpoint",
            "dotinstall.com",
            "louis vuitton"
        ];
        function wrong() {
            p2.classList.remove("wrong");
        }
        function game() {
            div.appendChild(p2);
            setInterval(timeCounter, 10);
            wordSelect();
            document.addEventListener("keydown", function(e) {
                clickedKey = e.key;
                wordChecker();
            })
        }
        function wordSelect() {
            const num = Math.floor(Math.random() * words.length);
            p2.textContent = words[num];
            word = words[num];
            words.splice(num, 1);
        }
        function wordChecker() {
            if (clickedKey !== word[loc]) {
                missType++;
                p2.classList.add("wrong");
                setTimeout(wrong, 10);
                return;
            } else {
                type++;
                loc++;
                p2.textContent = "_".repeat(loc) + word.substring(loc);
            }
            if (loc === word.length) {
                wordNumber++;
                loc = 0;
                wordSelect();
                if (wordNumber === selectedWordNumber) {
                    p2.textContent = "finish!!";
                    console.log(finishTimer);
                    const result = document.createElement("p");
                    result.classList.add("basic");
                    result.classList.add("finish");
                    result.textContent = finishTimer + " : " + Math.floor((type / (type + missType)) * 1000) / 10 + "%" + " Click to Restart!!"
                    div.appendChild(result);
                    result.addEventListener("click", restart);
                    div.removeChild(p1);  
                    return;
                }
            }
        }
        function timeCounter() {
            finishTimer++;
        }
    }
    function restart() {
        document.body.removeChild(div);
        all();
    }
}
