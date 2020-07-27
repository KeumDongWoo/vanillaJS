const toDoform = document.querySelector(".js-toDoForm"),
    toDoInput = toDoform.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = []; 

function deleteToDo(event){
    const btn = event.target;   //삭제클릭한 버튼
    const li = btn.parentNode;  //삭제클릭한 parentNode 
    toDoList.removeChild(li);   
    const cleanToDos = toDos.filter(function(toDo){ //filter --> 테스트 통과시 배열로 전환
        return toDo.id !== parseInt(li.id);
    });

    toDos = cleanToDos  //삭제후 남은 todo-list 
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;

    delBtn.innerHTML = "X";
    delBtn.addEventListener("click",deleteToDo);    //삭제버튼 이벤트 추가

    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text : text,
        id : newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault(); //기존 이벤트 중단
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.forEach(function(toDo){ //item에 있는 모든함수 실행
            paintToDo(toDo.text);
        });
    }
}


function init(){
    loadToDos();
    toDoform.addEventListener("submit",handleSubmit);
}

init();