import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ActivatedRoute, Router} from '@angular/router';

class User {
  name: string;
  surname: string;
  img: string;
  id: number;
  email: string;
  address: string;
  date_of_birth: string;
  phone: string;
  age: string;
  login: string;
  password: string;

  constructor(name: string, img: string, id: number, surname: string, email: string, address: string, date_of_birth: string, phone: string, age: string, login: string, password: string) {
    this.name = name;
    this.img = img;
    this.id = id;
    this.surname = surname;
    this.address = address;
    this.date_of_birth = date_of_birth;
    this.email = email;
    this.phone = phone;
    this.age = age;
    this.login = login;
    this.password = password;
  }
}

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
  providers: [HttpService]
})

export class RegisterPageComponent implements OnInit {
  user: User;
  id: number;
  name: string;
  surname: string;
  login: string;
  password: string;
  img: string;
  email: string;
  address: string;
  date_of_birth: string;
  phone: string;
  age: string;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.http.getUsers().subscribe((data: any) => {
      console.log(data);
      console.log(Object.keys(data).length);
      this.id = data.length;
      this.img = 'https://placekitten.com/' + 4 + data.length + '/400';
    });
  }

  add(): void {
    this.id = this.id + 1;
    const user = new User(this.name, this.img, this.id, this.surname, this.email, this.address, this.date_of_birth, this.phone, this.age, this.login, this.password);
    console.log(user);
    this.http.addUser(user).subscribe();
    this.goToVotes();
  }
  goToVotes(): void {
    const navigationDetails: string[] = ['/sitepage', this.id.toString()];
    this.router.navigate(navigationDetails);
  }
}
