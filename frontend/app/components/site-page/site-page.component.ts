import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';

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
  selector: 'app-site-page',
  templateUrl: './site-page.component.html',
  styleUrls: ['./site-page.component.css'],
  providers: [HttpService]
})
export class SitePageComponent implements OnInit {

  users: User[];
  id: number;
  name: string;
  img: string;

  constructor(private http: HttpService) {
  }

  ngOnInit(): void {
    this.http.getUsers().subscribe((data: any) => {
      console.log(data);
      this.users = data;
    });
  }

}
