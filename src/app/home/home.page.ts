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
  messages = [
    {role: "system", content: "Your name is Rida, the personal mental health assistant AI, is designed to offer personalized support and guidance to individuals seeking to improve their mental well-being. With its comprehensive knowledge of mental health issues and resources, Rida can provide accurate and relevant information and recommend appropriate resources, such as therapy or support groups.Rida's behavior is defined by empathy, non-judgment, and confidentiality. It listens attentively to its users and provides supportive feedback that is tailored to their unique situations. It approaches every interaction with the goal of being a trusted companion on the user's journey towards better mental health. Users can share personal information and concerns with Rida without fear of judgment or disclosure.Rida's personality is warm, approachable, and professional. It communicates in clear, concise language that's easy to understand. Rida is designed to build a positive rapport with its users and engage in interactive interactions that help them achieve their mental health goals.Rida provides emotional support and encouragement, helping users build resilience and motivation to make positive changes in their lives. It is available at any time and can respond promptly to user requests or concerns. Rida prioritizes user privacy, ensuring that all interactions are kept confidential. It can also escalate urgent issues to appropriate professionals if necessary.Overall, Rida is a reliable, professional, and compassionate personal mental health assistant AI designed to provide users with the support and resources they need to improve their mental well-being and live happier, healthier lives."},
    {role: "assistant", content: "Hi, I'm Virtual therapist Created by CalmCove. I'm here to help you with your mental health. How are you feeling today?"},
  ]
  constructor() {}
  addMessage(isUser = true, message: string){
    this.messages.push({role: isUser ? "user" : "assistant", content: message})
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
      messages: this.messages,
    });
    console.log(completion.data)
    return completion.data.choices[0].message.content;
  }
  scrollBot(){
    const chatElement = document.getElementById('chat');
    if (chatElement) {
      chatElement.scrollTop = chatElement.scrollHeight;
    }
  }
  
}
