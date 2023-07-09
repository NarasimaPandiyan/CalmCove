import { Component, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
const { Configuration, OpenAIApi } = require("openai");

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule],

})



export class HomePage {
  messages: { role: string; content: string; }[] = []
  constructor() {}
  addMessage(isUser = true, message: string){
    this.messages.push({role: isUser ?"user":"Assistant", content: message})
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      let chat = document.createElement('div');
      chat.classList.add('rounded-t-xl', 'round-b-xl', 'm-3', 'p-3', 'font-Quilon');
      if(isUser){
      chat.classList.add('bg-emerald-600', 'rounded-l-xl','self-end');
      } else {
        chat.classList.add('bg-red-500', 'rounded-r-xl','self-start','w-3/4');
        }
      chat.innerText = message;
        chatElement.appendChild(chat);
        this.scrollBot();
    }
} 
sendMessage(){
  let message = document.getElementById('chat-input') as HTMLInputElement;
  
  this.addMessage(true,message.value);
  this.getReply().then((reply) => {
    this.addMessage(false,reply);
  });
  message.value =""
}
async getReply(): Promise<string> {
  const url = `https://calmcove-api.vercel.app/v1/${JSON.stringify(this.messages)}`.replace('?', '');

  try {
    const response = await fetch(url, { mode: 'no-cors' });
    const data = await response.json();

    return data.reply;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

  scrollBot(){
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }
  
}
