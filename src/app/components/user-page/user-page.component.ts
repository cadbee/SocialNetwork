import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {Observable} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';
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
  role: string;
  status: string;
  age: string;

  constructor(name: string, img: string, id: number, surname: string, email: string, address: string, date_of_birth: string, phone: string, role: string, status: string, age: string) {
    this.name = name;
    this.img = img;
    this.id = id;
    this.surname = surname;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.email = email;
    this.phone = phone;
    this.role = role;
    this.status = status;
    this.age = age;
  }
}

class Userinf {
  public roomId = '1';
  public messageText: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray = [];

  public showScreen = false;
  public phone: string;
  public currentUser;
  public selectedUser;

  joke: string;
  about: string;

  constructor(joke: string, about: string) {
    this.joke = joke;
    this.about = about;
  }
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: [HttpService]
})
export class UserPageComponent implements OnInit {
  env = environment;
  editmode: false;
  user: User;
  userinf: Userinf;
  id: number;
  name: string;
  surname: string;
  img: string;
  x: any;
  editPos: boolean;
  private storageArray = [];
  editImgPos: boolean;

  constructor(private http: HttpService, private route: ActivatedRoute, private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.editImgPos = false;
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);
    this.http.getUser(this.id).subscribe((data: any) => {
      console.log(data);
      this.user = data[0];
      this.img = data[0].img;
      this.editPos = (this.env.loggedId === this.user.id);
    });
    this.http.getUserinf(this.id).subscribe((data: any) => {
      this.userinf = data[0];
    });
    console.log(this.user);
    console.log(this.userinf);
    this.x = document.getElementById('ct1');
  }

  changeFIO(): void {
    this.http.changeFIO(this.id, {
      name: this.user.name,
      surname: this.user.surname,
      role: this.user.role,
      status: this.user.status
    }).subscribe();
  }

  changeUserData(): void {
    this.http.changeFIO(this.id, {
      age: this.user.age,
      date_of_birth: this.user.date_of_birth,
      address: this.user.address,
      phone: this.user.phone
    }).subscribe();
  }

  saveChanges(): void {
    this.userinf.joke = document.getElementById('ct1').innerText;
    this.userinf.about = document.getElementById('ct2').innerText;
    if (this.editImgPos) {
      this.user.img = document.getElementById('ct0').innerText;
    }
    this.http.changeFIO(this.id, {
      joke: this.userinf.joke,
      about: this.userinf.about,
      img: this.user.img
    }).subscribe();
    this.sendMessage();
    this.editImgPos = false;
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

  sendMessage(): void {
    this.chatService.sendMessage({id: this.id, joke: this.userinf.joke, img: this.user.img});
  }

  editImg(): void {
  }
}
