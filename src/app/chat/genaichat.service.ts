import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { API_CONST } from '../constants/api.constant';
import { v4 as uuidv4 } from 'uuid';

interface IMessage {
  timestamp: string;
  sessionId?: string | null | undefined;
  role?: string | null | undefined;
  message?: string | null | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class GenAIPersonaService {
  http = inject(HttpClient);
  constructor() {}

  sendMessage(body: {
    message: string;
    sessionId: string;
  }): Observable<IMessage> {
    return this.http.post<IMessage>(
      `${environment.baseUrl}${API_CONST.GEN_AI_CHAT}`,
      body
    );
  }

  getMessages(sessionId: string): Observable<{
    messages: IMessage[];
  }> {
    return this.http.get<{
      messages: IMessage[];
    }>(`${environment.baseUrl}${API_CONST.GEN_AI_CHAT}/${sessionId}`);
  }

  getSessionId(): string {
    let sessionId = localStorage.getItem('chat-session-id');
    if (!sessionId) {
      sessionId = uuidv4();
      localStorage.setItem('chat-session-id', sessionId);
    }
    return sessionId;
  }
}
