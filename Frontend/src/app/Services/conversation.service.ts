import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {

    constructor(private Http: HttpClient) { }

    getConversations(_id: string): Observable<Array<any>> {
        return this.Http.get<Array<any>>(environment.urlConversation, { headers: this.Headers(_id) });
    }

    getConversationOne(Id: String, _id: string): Observable<any> {
        return this.Http.get<any>(environment.urlConversation + Id, { headers: this.Headers(_id) });
    }

    createConversation(Conversation: any, _id: string): Observable<any> {
        return this.Http.post<any>(environment.urlConversation, Conversation, { headers: this.Headers(_id) });
    }

    createMessage(Message: any, Id: String, _id: string): Observable<any> {
        return this.Http.put<any>(environment.urlConversation + Id, Message, { headers: this.Headers(_id) });
    }

    Headers(_id: string): any {
        return {
            'Content-Type': 'application/json',
            'Accept-Type': 'application/json',
            '_id': _id
        };
    }
}
