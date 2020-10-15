const socket =io()

let name;
let textarea=document.querySelector("#textarea")
let messageArea=document.querySelector(".message_area")
const submitBtn = document.querySelector('#submitBtn')
do{
    name =prompt("please enter your name:")
}while(!name)
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    let message = textarea.value
    if(!message) {
        return
    }
    sendMessage(message)
})
function sendMessage(message){
    let msg={
        user:name,
        message:message.trim()
    }
    //Append
    appendMessage(msg,"outgoing")
    textarea.value=""
    scrollToBottom()
    //send to server
    socket.emit("message",msg)
}
function appendMessage(msg,type){
    let mainDiv=document.createElement("div")
    let className= type
    mainDiv.classList.add(className,"message")

    let markup=`<h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML=markup
    messageArea.appendChild(mainDiv)

}
///recieve message
socket.on("message",(msg)=>{
    appendMessage(msg,"incoming")
    scrollToBottom()
});
 
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight
};
