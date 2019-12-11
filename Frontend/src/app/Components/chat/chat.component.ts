import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/user';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { ConversationService } from 'src/app/services/conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ChatBind: Subject<any> = new BehaviorSubject({});
  Conversations: Subject<any> = new BehaviorSubject({});
  Users: Subject<Array<User>> = new BehaviorSubject([]);
  Chat: any = {};
  Messages: Subject<Array<any>> = new BehaviorSubject([]);
  LoadingMessage: Subject<boolean> = new BehaviorSubject(false);
  showChat: Subject<boolean> = new BehaviorSubject(false);
  Suscriptions: Array<Subscription> = [];
  User: User;

  constructor(private ChatService: ChatService,
    private auth: AuthService,
    private conversation: ConversationService,
    private userService: UserService
  ) {
    this.User = this.auth.getStorage();
  }

  ngOnInit() {
    this.Suscriptions.push(this.userService.getUsersChat().subscribe(res => {
      (res as any) = (res as any).filter(item => item._id !== this.User._id);
      this.Users.next((res as any));
      this.pushSubs();
      this.getConversations();
    }));
    this.isTyping();
    this.HandlerMessage();
  }

  getConversations() {
    this.Suscriptions.push(this.conversation.getConversations(this.User._id).subscribe(conve => {
      this.ChatService.JoinRooms(conve);
      this.Conversations.next(conve);
    }));
  }

  StartConversation(Id: string) {
    this.Conversations.subscribe(conversation => {
      let conver = conversation.filter(item =>
        item.members.filter(item => item._id !== this.User._id)[0]._id === Id
      );
      if (conver.length >= 1) {
        this.conversation.getConversationOne(Id, this.User._id).subscribe(one => {
          this.ChatBind.next(one);
          this.showChat.next(true);
        });
      } else {
        this.conversation.createConversation({ members: [this.User._id, Id] }, this.User._id).subscribe(conversation => {
          this.ChatBind.next(conversation);
          this.showChat.next(true);
        });
      }
    });
  }

  pushSubs() {
    this.Suscriptions.push(this.ChatBind.subscribe(chat => {
      if (JSON.stringify(chat) !== '{}') {
        chat.members = chat.members.filter(item => item._id !== this.User._id);
        this.Chat = Object.assign({ 'image': chat.members[0].image, 'DisplayName': chat.members[0].name }, chat);
        this.Messages.next(chat.messages);
        setTimeout(() => {
          document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
        }, 500);
      }
    }));
  }

  OnChange(text) {
    if (text.target.value === '')
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
  }

  onKeyPress(event) {
    if (event.which === 13 && !event.shiftKey)
      this.PushMessage();
    else
      this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: this.User.name })
  }

  HandlerMessage() {
    this.Suscriptions.push(this.ChatService.Listener('Chat:Message').subscribe(data => {
      console.log(data);
      if (JSON.stringify(this.Chat) !== '{}' && data.Room === this.Chat._id) {
        this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
        this.Messages.subscribe(messages => {
          messages.push(data.Message);
        }).unsubscribe()
      }
    }));
  }

  PushMessage() {
    this.LoadingMessage.next(true);
    this.conversation.createMessage({
      'message': (document.getElementById('Message') as any).value,
      'user': this.User._id
    }, this.Chat._id, this.User._id).subscribe(message => {
      this.SendMessageSocket(message);
    });
  }

  SendMessageSocket(message: any) {
    this.ChatService.Emit('Chat:Message', {
      'Room': this.Chat._id,
      'Message': message.messages[message.messages.length - 1],
      'Member': {
        'DisplayName': this.Chat.DisplayName,
        'image': this.Chat.image,
        'Message': message.messages[message.messages.length - 1].message
      }
    });
    this.Messages.subscribe(messages => {
      messages.push(message.messages[message.messages.length - 1]);
    }).unsubscribe();
    this.ChatService.Emit('Chat:Typing', { Room: this.Chat._id, Username: 'is not typing' });
    (document.getElementById('Message') as any).value = '';
    this.LoadingMessage.next(false);
    setTimeout(() => {
      document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
    }, 100);
  }

  ngOnDestroy(): void {
    this.Suscriptions.forEach(element => {
      element.unsubscribe();
    });
  }

  isTyping() {
    this.Suscriptions.push(this.ChatService.Listener('Chat:Typing').subscribe(data => {
      if (JSON.stringify(this.Chat) !== '{}') {
        document.getElementById('typing').innerHTML = data.Room ===
          this.Chat._id && data.Username !== 'is not typing' ?
          `<h6 class="animated fadeIn" style="font-size: 11px;">${data.Username} Esta Escribiendo...</h6>` : '';
        document.getElementById('scroll').scrollTop = document.getElementById('scroll').scrollHeight;
      }
    }));
  }

}
