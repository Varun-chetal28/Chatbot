var apiKey = 'f82f467ad2d5938845bd652ead21280f';
var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
let input = document.querySelector(".input")
// city = ""
let weatherselect = document.querySelector('.weatherbtn')
let timeselect = document.querySelector('.timebtn')
let botmsg = document.querySelector('.automsg')
var buttonclicked1 = false;
var buttonclicked2 = false;
weatherselect.addEventListener('click' , () =>{
    displayMessage("Bot : which city's weather are you looking for?")
    weatherselect.style.display = "none";
    timeselect.style.display = "none";
    buttonclicked1 = true;
    input.disabled = false
    input.focus();

})

timeselect.addEventListener('click' , () =>{
    displayMessage("Bot : which city's time are you looking for?")
    weatherselect.style.display = "none";
    timeselect.style.display = "none";
    buttonclicked2 = true;
    input.disabled = false
    input.focus();
})


function getWeather(city) {
    const url = apiUrl + `${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const temp = data.main.temp;
            const weather = data.weather[0].description;
            console.log(weather);
            const message = `Bot : The current temperature in ${city} is ${temp}°C and the weather type is ${weather}.`;
            displayMessage(message);
            displayMessage("Bot : Do you want to know any other's city data?");
            askQuestionYes()
            askQuestionNo()
            buttonclicked1 = false;
            buttonclicked2 = false;
            input.disabled = true
            // displayMessage("Enter the city who's temperature you're looking for?");

          })
          .catch(error => console.log(error));
}
function getTime(city){
    // city = "perth"
    fetch(`https://api.api-ninjas.com/v1/timezone?city=${city}`, { headers: { "X-Api-Key": "JIr6no3LlAL1YKa61krISqTfoF7EOFkdrp2W7Ggj" },contentType: "application/json",})
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            var time = new Date().toLocaleString("en-US", { timeZone: data.timezone, 
                timeStyle: "medium",
                hourCycle: "h12", });
                console.log(time);
                const message = `Bot : The current time in ${city} is ${time}`;
                // console.log(time);
                // console.log(city);
                displayMessage(message);
                displayMessage("Bot : Do you want to know any other's city data?");
                askQuestionYes()
                askQuestionNo()
                buttonclicked1 = false;
                buttonclicked2 = false;
                input.disabled = true
        })
    }
function displayMessage(message) {
    const chatWindow = document.querySelector('.messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add = "chatmsg"
    messageElement.innerHTML = message;
    chatWindow.appendChild(messageElement);
    let chatheight = document.querySelector('.chat-window')
    chatheight.scrollTo(0, chatheight.scrollHeight - 355);
}

function askQuestionYes(){
    const msg = document.querySelector('.messages');
    const displayQuestion = document.createElement('p')
    displayQuestion.classList.add ("yesBtn");
    displayQuestion.innerHTML = "Yes"
    msg.appendChild(displayQuestion);
    displayQuestion.addEventListener("click" , ()=>{
        msg.innerHTML = "";
        weatherselect.style.display = "inline"
        timeselect.style.display = "inline"
    })
    

}
function askQuestionNo(){
    const msg = document.querySelector('.messages');
    const displayQuestion = document.createElement('p')
    displayQuestion.classList.add ("noBtn");
    displayQuestion.innerHTML = "No"
    msg.appendChild(displayQuestion);
    displayQuestion.addEventListener("click" , ()=>{
        let automsg = document.querySelector(".automsg");
        automsg.innerHTML = "";
        msg.innerHTML = "";
        msg.innerHTML += "Thankyou , Have a nice day"
    })
    
    
}


const form = document.querySelector('form');
form.addEventListener('submit', event => {
    event.preventDefault();
    const input = event.target.querySelector('input');
    const message = input.value;
    console.log(message)
    input.value = '';
    displayMessage(message);
    // const city = message
        // console.log(city);
        // getWeather(city);

    if(buttonclicked1 == true){
        console.log("true")
        // const city = message.split("temperature in ")[1];
        const city = message
        console.log(city);
        getWeather(city);
    } 
    else if (buttonclicked2== true) {
        console.log("true")
        const city = message
        // city = "Delhi"
        console.log(city);
        getTime(city);
    }
    else 
    {
        displayMessage("Please enter a valid question");
    }
    // else if (message.toLowerCase().includes('hello') || message.toLowerCase() == 'hi' || message.toLowerCase().includes('hey')) {
    //     displayMessage('Hi there!');
    // }
    // else if (message.toLowerCase().includes('how are you') || message.toLowerCase().includes('whats up')) {
    //     displayMessage('I am good , How are you?');
    // }
    // else if (message.toLowerCase().includes('name') || message.toLowerCase().includes('who are you')) {
    //     displayMessage('My name is alexa');
    // }
    // else if (message.toLowerCase().includes('age') || message.toLowerCase().includes('old')) {
    //     displayMessage('I was born last night');
    // }
    // else if (message.toLowerCase().includes('movie') || message.toLowerCase().includes('favourite movie')) {
    //     displayMessage('Rockstar');
    // }
    // else if (message.toLowerCase().includes('song') || message.toLowerCase().includes('singer')) {
    //     displayMessage('295 by sidhu moosewala');
    // }
    // else if(message.toLowerCase().includes('joke') || message.toLowerCase().includes('funny')) {
    //     displayMessage('“Debugging” is like being the detective in a crime drama where you are also the murderer.');
    // }
    
    // // else if (message.toLowerCase().includes('temperature') || message.toLowerCase().includes('climate') || message.toLowerCase().includes('weather'))  {
    // //     const city = message.split(' ').pop();
    // //     getWeather(city);
    // // }

});

const btnresfresh = document.querySelector(".refBtn");
btnresfresh.addEventListener("click" , ()=>{
    document.querySelector('.messages').innerHTML = "";
    document.querySelector('.botmsg').innerHTML = "";
    weatherselect.style.display = "inline";
    timeselect.style.display = "inline";
})
const chatbot = document.querySelector('.botbody')
const startchat = document.querySelector('.start');
startchat.addEventListener('click' , ()=>{
    chatbot.classList.toggle("show");
    console.log(startchat.innerHTML);
    if (startchat.innerHTML.toLowerCase().includes("start")){
        startchat.innerHTML = "close chat"
    } 
    else if(startchat.innerHTML.toLowerCase().includes("close")){
        startchat.innerHTML = "start chat"
    }
})

// console.log(weatherselect)





