// chat.component.ts
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewChecked,
  inject,
  signal,
  Signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { GenAIPersonaService } from './genaichat.service';

interface IMessage {
  _id: string;
  timestamp: string;
  sessionId?: string | null | undefined;
  role?: string | null | undefined;
  message?: string | null | undefined;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  @ViewChild('messageInput') private messageInput!: ElementRef;
  destroy$ = new Subject();
  genAiService = inject(GenAIPersonaService);

  isChatOpen = false;
  newMessage = '';
  isTyping = false;
  showScrollTop = false;
  showGlobalScrollTop = false;
  private shouldScrollToBottom = false;

  messages: any = signal([
    {
      _id: '1',
      message: "Hello! I'm your chat assistant. How can I help you today?",
      role: 'bot',
      timestamp: new Date().toISOString(),
    },
  ]);

  ngOnInit() {
    this.getMessages()
    // Listen for global scroll events
    window.addEventListener('scroll', this.onGlobalScroll.bind(this));
  }

  
  getMessages(): void {
    const sessionId = this.genAiService.getSessionId();
    this.genAiService
      .getMessages(sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.messages.set(data.messages);
        },
        error: (err: any) => {
          alert(err.error);
          this.messages.set([]);
        },
      });
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      setTimeout(() => {
        this.messageInput?.nativeElement?.focus();
      }, 300);
    }
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;
    const message = this.newMessage.trim();
    this.messages.update((messages: any) => [
      ...messages,
      {
        timestamp: new Date().toISOString(),
        sessionId: this.genAiService.getSessionId(),
        role: 'user',
        message,
      },
    ]);
    this.newMessage = '';
    this.shouldScrollToBottom = true;
    // Simulate bot typing
    this.isTyping = true;
    this.genAiService
      .sendMessage({
        message,
        sessionId: this.genAiService.getSessionId(),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any) => {
          this.isTyping = false;
          this.messages.update((messages: any) => [...messages, data]);
          this.shouldScrollToBottom = true;
        },
        error: (err: any) => {
          this.isTyping = false;
          alert(err.error);
        },
      });
  }

  onInputChange() {
    // You can add typing indicators or other real-time features here
  }

  onScroll(event: any) {
    const element = event.target;
    const threshold = 50;
    const position = element.scrollTop + element.offsetHeight;
    const height = element.scrollHeight;

    // Show scroll to top button when user scrolls up
    this.showScrollTop = element.scrollTop > threshold;
  }

  onGlobalScroll() {
    // Show global scroll to top button when page is scrolled down
    this.showGlobalScrollTop = window.pageYOffset > 300;
  }

  scrollToTop() {
    this.messagesContainer.nativeElement.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  scrollToGlobalTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop =
        this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }

  formatTime(date: string): string {
    return new Date(date).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.onGlobalScroll.bind(this));
    this.destroy$.next('');
    this.destroy$.complete();
  }
}
