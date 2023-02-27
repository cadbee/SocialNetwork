import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const PORT = 3333;
const URL = 'https://social-network-1oi4.onrender.com';
@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  addFriend(id, body): any {
    return this.http.post(URL + '/site/' + id + '/addfriends', body);
  }

  delFriend(id, body): any {
    return this.http.post(URL + '/site/' + id + '/delfriends', body);
  }

  addUser(body): any {
    return this.http.put(URL + '/site', body);
  }

  changeFIO(id, body): any {
    return this.http.post(URL + '/site/' + id, body);
  }

  getUsers(): any {
    return this.http.get(URL + '/site');
  }

  getPass(): any {
    return this.http.get(URL + '/login');
  }

  getUser(id): any {
    return this.http.get(URL + '/site/' + id);
  }

  getUserinf(id): any {
    return this.http.get(URL + '/site/' + id + '/inf');
  }

  getUsersinf(id): any {
    return this.http.get(URL + '/site/' + id + '/friendsnews');
  }

  setupLabels(): any {
    return this.http.get(URL + '/');
  }

}
