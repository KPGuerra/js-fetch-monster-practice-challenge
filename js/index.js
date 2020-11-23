/////////////DOM Elements && Variables/////////
const monsterContainer = document.querySelector("#monster-container")
const forward = document.getElementById("forward")
const back = document.getElementById("back")
const createMonster = document.getElementById("create-monster")

const url = "http://localhost:3000/monsters"
let pageNum = 1

/////////////////////Event Listeners///////////
forward.addEventListener("click", event => initialize(pageNum+=1))
back.addEventListener("click", event => initialize(pageNum-=1))


//////////////Fetches////////////////////////
function fetchRequest(method, url, obj) {
    return fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(obj)
    })
    .then(response => response.json())
}
/////////////////Handlers/////////////////

function renderOneMonster (monster){
    const monsterCard = document.createElement('div')
    monsterCard.classList.add("card")
    monsterCard.dataset.id = monster.id

    monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <h3>${monster.age}</h3>
        <p>${monster.description}</p>
    `
    monsterContainer.append(monsterCard)
}

function initialize(pageNum, limitNum = 50) {
    if (pageNum < 1) {
        pageNum = 1
        alert("You are on the first page!")
        
    }
    else {
        monsterContainer.innerHTML=" "
        fetch(`http://localhost:3000/monsters/?_limit=${limitNum}&_page=${pageNum}`)
        .then(response => response.json())
        .then(monsterData => monsterData.forEach(renderOneMonster))
    }
}

initialize(pageNum)

const monsterForm = document.createElement("form")
const monsterName = document.createElement("input")
    monsterName.id = "name"
    monsterName.placeholder = "name"
const monsterDesc = document.createElement("input")
    monsterDesc.id = "description"
    monsterDesc.placeholder = "description"
const monsterAge = document.createElement("input")
    monsterAge.id= "age"
    monsterAge.placeholder = "age"
const submitButton = document.createElement("input")
    submitButton.type= "submit"
    monsterForm.append(monsterName, monsterDesc, monsterAge, submitButton)
 createMonster.append(monsterForm)


monsterForm.addEventListener("submit", (event)=> {
    event.preventDefault()

    const newMonster = {
        name: event.target.name.value,
        age: event.target.age.value,
        description: event.target.description.value
    }

    fetchRequest('POST', url, newMonster)
    .then(newMonsterObj => {
        renderOneMonster(newMonsterObj)
    })
    .catch(error => console.log(`Uh oh: ${error}`))

    event.target.reset()
})
