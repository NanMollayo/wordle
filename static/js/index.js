let index = 0;
let attempt = 0;
let answer_array = [
  "APPLE",
  "TRAIN",
  "SUPER",
  "HAPPY",
  "COAST",
  "GLORY",
  "FLOOR",
  "QUERY",
  "BRAVO",
  "BRAKE",
  "BRAWL",
  "ALICE",
  "MARCH",
  "SEVEN",
  "LUCKY",
  "TABLE",
  "KOREA",
  "DOKDO",
  "STEAM",
  "MAKER",
  "INDEX",
  "MOUSE",
];
let answer = "SUPER";
let anstate = 0; //정답인 글자 수, 5이면 정답
let 인터벌; //타이머 돌리는 함수

function appstart() {
  function set_ans() {
    const num = Math.floor(Math.random() * answer_array.length);
    //console.log(num);
    answer = answer_array[num];
    console.log(answer);
  }
  function asking() {
    const inf = document.querySelector(".info");
    inf.style = "opacity : 1;";
  }
  function asking_end() {
    const inf2 = document.querySelector(".info");
    inf2.style = "opacity : 0;";
  }

  function displayend() {
    console.log("종료");
    const clock_end = document.querySelector(".timer");
    const endtime = clock_end.innerText;
    if (anstate === 5) {
      //정답인 경우
      clock_end.innerText = `정답! 소요시간  ${endtime}`;
    } else {
      //오답인 경우
      clock_end.innerText = `오답! 정답은  ${answer}`;
    }

    //아래는 실험적 코드
    //const div = document.createElement("div");
    //div.innerText = "게임종료";
    //div.style =
    //  "font-weight: bolder; font-size: 20px; width:100vw; background-color:white; top:23vh; left:0vw; display:flex; justify-content:center; align-items:center; position:absolute;";
    //document.body.appendChild(div);
  }

  function gamend() {
    window.removeEventListener("keydown", keyboarddown);
    window.removeEventListener("click", keyclick);
    displayend();
    clearInterval(인터벌);
  }

  function next() {
    if (attempt <= 3) {
      attempt++;
      index = 0;
      anstate = 0;
    } else {
      gamend(); //기회 소진으로 게임끝
    }
  }

  function backspace() {
    const del = index - 1;
    const block = document.querySelector(
      `.board_block[data-block='${attempt}${del}']`
    );
    //console.log(block.innerText);
    block.innerText = "";
    index = index - 1;
  }

  async function enterkey() {
    //서버에 정답을 요청하고 기다리는 구문
    //const 응답 = await fetch("/answer"); //await를 이용해서 정답을 받기 전에 실행되는 것을 방지
    //const answer = await 응답.json();

    //console.log(응답);
    //console.log(answer);

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board_block[data-block='${attempt}${i}']`
      );
      if (block.innerText === answer[i]) {
        block.style.background = "#6AAA64";
        anstate++;
      } else if (answer.includes(block.innerText)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }
    if (anstate === 5) {
      //정답 맞춰서 게임 종료
      gamend();
    } else {
      next();
    }
  }

  function keyboarddown(event) {
    //console.log(event);
    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board_block[data-block='${attempt}${index}']`
    );

    if (index <= 4 && 65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    } else if (
      //엔터키는 조건을 만족해야만 눌림
      (index === 5 && event.key === "Enter") ||
      (index === 5 && event.key === "ENTER")
    ) {
      //console.log("엔터키");
      enterkey();
    } else if (index != 0 && event.key === "Backspace") {
      //console.log("백키");
      backspace();
    }
  }

  function keyclick(event) {
    console.log(event.target.innerText);
    if (event.target.innerText.length === 1) {
      const keyObject = { keyCode: 65 };
      keyObject.key = event.target.innerText;
      keyboarddown(keyObject);
    } else if (event.target.innerText === "ENTER") {
      //엔터
      const keyObject = { keyCode: 1 };
      keyObject.key = event.target.innerText;
      keyboarddown(keyObject);
    } else if (event.target.alt === "Backspace") {
      //백스페이스(이미지를 누르는 경우)
      const keyObject = { keyCode: 8 };
      keyObject.key = event.target.alt;
      keyboarddown(keyObject);
    } else if (event.target.innerText === "Backspace") {
      //백스페이스2(이미지 옆을 누르는경우)
      const keyObject = { keyCode: 8 };
      keyObject.key = event.target.innerText;

      keyboarddown(keyObject);
    } else if (event.target.alt === "ask") {
      //질문버튼을 누르는 경우
      asking();
    } else if (event.target.innerText.length > 10) {
      //빈 화면을 누르는 경우
      asking_end();
    } else return;
  }

  function startTimer() {
    //타이머 함수
    const 시작 = new Date();
    function 시간() {
      const 작동 = new Date();
      const time = new Date(작동 - 시작);
      const 분 = time.getMinutes().toString();
      const 초 = time.getSeconds().toString();
      const clock = document.querySelector(".timer");
      clock.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
    }
    인터벌 = setInterval(시간, 1000); //클리어를 위해서 함수로 지정
  }
  startTimer(); //타이머 함수 호출
  set_ans();
  window.addEventListener("keydown", keyboarddown); //키보드 클릭시 키보드다운 함수 호출

  window.addEventListener("click", keyclick);
}

appstart();
