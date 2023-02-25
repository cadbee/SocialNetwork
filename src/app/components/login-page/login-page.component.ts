import {Component, OnInit} from '@angular/core';
import {HttpService} from '../../http.service';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

class User{
  role: string;

  constructor(role: string) {
    this.role = role;
  }

}

class Data{
  id: number;
  pass: string;
  login: string;

  constructor(id: number, pass: string, login: string) {
    this.id = id;
    this.pass = pass;
    this.login = login;
  }

}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [HttpService]
})
export class LoginPageComponent implements OnInit {
  test: Data[];
  user = User;
  env = environment;
  id: number;
  login: string;
  password: string;

  constructor(private http: HttpService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.http.getPass().subscribe((data: any) => {
      this.test = data;
    });
  }

  checkForm(): boolean {
    console.log('here', this.test);
    for (const i of this.test) {
      console.log(i);
      if (i.login == this.login) {
        if (i.pass == this.password) {
          this.id = i.id;
          this.http.getUser(this.id).subscribe((data: any) => {
            console.log(data);
            if (data[0].role == 'Пользователь'){
              this.env.admin = false;
            }
            else{
              this.env.admin = true;
            }
            this.env.logged = true;
            this.env.loggedId = i.id;
          });
          return true;
        }
      }
    }
    alert('USER DOESN`T EXISTS!');
    return false;
  }

  goToVotes(): void {
    const navigationDetails: string[] = ['/sitepage', this.id.toString()];
    this.router.navigate(navigationDetails);
  }
}
