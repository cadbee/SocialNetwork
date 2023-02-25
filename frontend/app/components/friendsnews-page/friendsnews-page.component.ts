import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ActivatedRoute} from '@angular/router';
import {ChatService} from '../../services/socket.service';
import {NgZone} from '@angular/core';
import {environment} from '../../../environments/environment';

class User {
  name: string;
  surname: string;
  img: string;
  id: number;
  email: string;
  address: string;
  date_of_birth: string;
  phone: string;
  friends: [];

  constructor(name: string, img: string, id: number, surname: string, email: string, address: string, date_of_birth: string, phone: string, friends: []) {
    this.name = name;
    this.img = img;
    this.id = id;
    this.surname = surname;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.email = email;
    this.phone = phone;
    this.friends = friends;
  }
}

class Userinf {
  joke: string;
  about: string;

  constructor(joke: string, about: string) {
    this.joke = joke;
    this.about = about;
  }
}


@Component({
  selector: 'app-friendsnews-page',
  templateUrl: './friendsnews-page.component.html',
  styleUrls: ['./friendsnews-page.component.css'],
  providers: [HttpService]

})
export class FriendsnewsPageComponent implements OnInit{
  zone: NgZone;
  user: User;
  users: User[];
  usersinf: Userinf[];
  id: string;
  roomId = 2;
  joke: string;
  env = environment;

  constructor(private http: HttpService, private route: ActivatedRoute, private chatService: ChatService
  ) {
    this.zone = new NgZone({enableLongStackTrace: false});
    this.initListeners();
  }

  ngOnInit(): void {
    this.join('1');
    this.id = this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.http.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
    this.http.getUser(this.id).subscribe((data: any) => {
      console.log(data);
      this.user = data[0];
    });
    this.http.getUsersinf(this.id).subscribe((data: any) => {
      console.log(data);
      this.usersinf = data;
      this.joke = data[10].joke;
    });
  }


  playAudio(): void {
    const audio = new Audio('../../../assets/vknotif.wav');
    audio.play();
  }

  initListeners(): void {
    this.chatService.socket.on('broad-message', (data) => {
      this.zone.run(() => {
        console.log(data);
        this.playAudio();
        this.users[data.id - 1].img = data.img;
        this.usersinf[data.id - 1].joke = data.joke;
        console.log('Updated joke', this.user[data.id - 1].img);
      });
    });
  }

  logOut(): void {
    console.log(this.env.loggedId);
    this.env.admin = false;
    this.env.loggedId = 0;
    this.env.logged = false;
    console.log(this.env.loggedId);
  }

  join(roomId: string): void {
    this.chatService.joinRoom({roomID: roomId});
  }

}
