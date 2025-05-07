async function accedi(){
    const key= document.getElementById("accesso").value;
    const url= 'https://standupparo-apis.vercel.app/api/company-name';
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-api-key": key
            }
        });
        
        if (!response.ok) {
            throw new Error("Chiave non valida");
        }
        const data = await response.json();
        console.log(data);
        localStorage.setItem("key", key);
        document.getElementById("main-content").style.display = "block";
        document.getElementById("error-content").style.display = "none";
        window.location.href = 'dashboard.html';
        } catch {
            document.getElementById("error-content").style.display = "block";
          }
}

let timers = {};
let timerIntervals = {};
let currentActiveTimer = null;
let globalTimerInterval;
let globalSeconds = 0;
 
async function mostraTabella() {
    const url = "https://standupparo-apis.vercel.app/api/devs";
    try {
        const key = localStorage.getItem("key");
 
        const response = await fetch(url, {
            method: "GET",
            headers:  {
                "x-api-key": key
            }
        });
 
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
 
        const json = await response.json();
        console.log(json);
 
        const today = new Date();
        const dataString = today.toLocaleDateString("it-IT", {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
        document.getElementById("dataTimer").innerHTML = `<p>Data: ${dataString}</p>` +
            '<p>Timer: <span id="globalTimer">00:00:00</span></p>';
 
        const table = document.getElementById("example");
        table.style.display = "table";
 
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = "";
 
        json.forEach(element => {
            if (!timers[element.name]) {
                timers[element.name] = 0;
            }
 
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td style="display: none;">${element.id}</td>
                <td>${element.name}</td>
                <td>
                    <button class="play" data-name="${element.name}" onclick="toggleTimer(this, '${element.name}')">Play</button>
                    <span class="timer" id="timer">${formatTime(timers[element.name])}</span>
                </td>
                <td><textarea placeholder="Scrivi le tue note"></textarea></td>
            `;
            tbody.appendChild(tr);
        });
        
        const termina= document.getElementById("termina").style.display = "block";

 
    } catch (error) {
        console.error(error.message);
        alert("Errore durante il caricamento dei dati.");
    }
}
 
function toggleTimer(button, name) {
    const timerSpan = button.nextElementSibling;
 
 
    if (currentActiveTimer && currentActiveTimer !== name) {
        clearInterval(timerIntervals[currentActiveTimer].interval);
        const prevButton = document.querySelector(`[data-name="${currentActiveTimer}"]`);
        prevButton.textContent = "Play";
        timerIntervals[currentActiveTimer].active = false;
    }
 
    const isRunning = timerIntervals[name] && timerIntervals[name].active;
 
    if (isRunning) {
        clearInterval(timerIntervals[name].interval);
        button.textContent = "Play";
        timerIntervals[name].active = false;
        currentActiveTimer = null;
    } else {
        button.textContent = "Pause";
        timerIntervals[name] = timerIntervals[name] || { active: true, interval: null };
 
        timerIntervals[name].interval = setInterval(() => {
            timers[name]++;
            timerSpan.textContent = formatTime(timers[name]);
        }, 1000);
        timerIntervals[name].active = true;
        currentActiveTimer = name;
    }
 
    if (!globalTimerInterval) {
        globalTimerInterval = setInterval(updateGlobalTimer, 1000);
    }
}
 
function updateGlobalTimer() {
    const globalTimerElement = document.getElementById("globalTimer");
    if (Object.values(timerIntervals).every(timer => !timer.active)) {
        clearInterval(globalTimerInterval);
        globalTimerInterval = null;
    } else {
        globalSeconds++;
        globalTimerElement.textContent = formatTime(globalSeconds);
    }
}
 
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(sec)}`;
}
 
function pad(number) {
    return number < 10 ? `0${number}` : number;
}
 

async function fetchPost(){
    const url = "https://standupparo-apis.vercel.app/api/stand-up";
    try {
 
        const response = await fetch(url, {
            method: "POST",
            headers:  {
                "x-api-key": key
            },
            body: JSON.stringify(body)
        });
        
 
        if (!response.ok) {
            throw new Error('Response status: ' + response.status);
        }
 
        const json = await response.json();
        console.log(json);
}
catch (error) {
    console.error(error.message);
    alert("Errore durante il caricamento dei dati.");
}
}

async function terminate(){
    const today = new Date();
}


function salvaNota(){
    let sviluppatore 
}

function mostraStorico(utente, nota){

    
}