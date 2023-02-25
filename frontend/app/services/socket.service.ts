import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public socket: Socket;
  private url = 'http://localhost:3333'; // your server local path

  constructor() {
    this.socket = io(this.url);
    this.socket.emit('join', '1');
  }

  joinRoom(data): void {
    this.socket.emit('join', data);
  }

  sendMessage(data): void {
    this.socket.emit('message', data);
    console.log('socket', data);
  }
  listenMessage(joke: string): void {
    this.socket.on('broad-message', (data) => {
      joke = data;
      console.log('get', data);
    });
  }
  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }
  getInf(): Observable<any> {
    return new Observable<{roomID: string, userID: number, joke: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
    });
  }
}
