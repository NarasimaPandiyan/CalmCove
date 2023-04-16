import { Component } from '@angular/core';
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
  constructor() {}
  addMessage(isUser = true, message: string){
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
    }
} 
sendMessage(){
  let message = document.getElementById('chat-input') as HTMLInputElement;
  
  this.addMessage(true,message.value);
  this.getReply(message.value).then((reply) => {
    this.addMessage(false,reply);
  });
  message.value =""
}
  async getReply(message: string){
    const configuration = new Configuration({
      apiKey: environment.OpenAI_ApiKey,
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}],
    });
    return completion.data.choices[0].message.content;
  }
  
}
