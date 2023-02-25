import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
import {NgZone} from '@angular/core';
import {ChatService} from '../../services/socket.service';


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

@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.css'],
  providers: [HttpService]
})
export class FriendsPageComponent implements OnInit {
  zone: NgZone;
  user: User;
  users: User[];
  friends: number[];
  id: string;
  name: string;
  surname: string;
  env = environment;
  editPos: boolean;
  constructor(private http: HttpService, private route: ActivatedRoute, private chatService: ChatService) {
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
      this.editPos = (this.env.loggedId === this.user.id);
      this.friends = Array.from(new Set(data[0].friends));
      console.log(Array.from(new Set(data[0].friends)));
    });
  }

  logOut(): void {
    console.log(this.env.loggedId);
    this.env.admin = false;
    this.env.loggedId = 0;
    this.env.logged = false;
    console.log(this.env.loggedId);
  }

  delFriend(fid: number): void {
    let na = [];
    for (const item of this.friends) {
      if (item != fid) {
        na.push(item);
      }
    }
    this.friends = na;
    this.http.delFriend(this.id, {
      id: fid
    }).subscribe();
  }
  playAudio(): void {
    const audio = new Audio('../../../assets/vknotif.wav');
    audio.play();
  }
  initListeners(): void {
    this.chatService.socket.on('broad-message', (data) => {
      this.zone.run(() => {
        this.playAudio();
        this.users[data.id - 1].img = data.img;
      });
    });
  }
  join(roomId: string): void {
    this.chatService.joinRoom({roomID: roomId});
  }
}
