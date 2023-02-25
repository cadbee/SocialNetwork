import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

class User {
  name: string;
  surname: string;
  img: string;
  id: number;
  email: string;
  address: string;
  date_of_birth: string;
  phone: string;

  constructor(name: string, img: string, id: number, surname: string, email: string, address: string, date_of_birth: string, phone: string) {
    this.name = name;
    this.img = img;
    this.id = id;
    this.surname = surname;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.email = email;
    this.phone = phone;
  }
}


@Component({
  selector: 'app-addfriends-page',
  templateUrl: './addfriends-page.component.html',
  styleUrls: ['./addfriends-page.component.css'],
  providers: [HttpService]

})
export class AddfriendsPageComponent implements OnInit {
  users: User[];
  id: string;
  name: string;
  img: string;
  searchStr: string;
  people: User[];
  user: User;
  friends: number[];
  env = environment;


  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.http.getUsers().subscribe((data: any) => {
      this.users = data;
    });
    this.http.getUser(this.id).subscribe((data: any) => {
      console.log(data);
      this.user = data[0];
      this.friends = data[0].friends;
    });
  }

  searchPeople(): void{
    const data = [];
    console.log(data.length);
    const arr = this.searchStr.split(' ');
    if (arr.length === 1){
      for (const i of this.users){
        if ((i.name === arr[0] || i.surname === arr[0]) && i.id !== this.user.id){
          data.push(i);
        }
      }
    }
    else if (arr.length === 2){
      for (const i of this.users){
        if (((i.name === arr[0] && i.surname === arr[1]) || (i.name === arr[1] && i.surname === arr[0])) && i.id !== this.user.id){
          data.push(i);
        }
      }
    }
    this.people = data;
  }
  logOut(): void {
    console.log(this.env.loggedId);
    this.env.admin = false;
    this.env.loggedId = 0;
    this.env.logged = false;
    console.log(this.env.loggedId);
  }
  addFriend(fid: number): void{
    this.http.addFriend(this.id, {
      id: fid
    }).subscribe();
  }
}
