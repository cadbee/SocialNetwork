import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const PORT = 3333;

@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {
  }

  addFriend(id, body): any {
    return this.http.post('http://localhost:' + PORT + '/site/' + id + '/addfriends', body);
  }

  delFriend(id, body): any {
    return this.http.post('http://localhost:' + PORT + '/site/' + id + '/delfriends', body);
  }

  addUser(body): any {
    return this.http.put('http://localhost:' + PORT + '/site', body);
  }

  changeFIO(id, body): any {
    return this.http.post('http://localhost:' + PORT + '/site/' + id, body);
  }

  getUsers(): any {
    return this.http.get('http://localhost:' + PORT + '/site');
  }

  getPass(): any {
    return this.http.get('http://localhost:' + PORT + '/login');
  }

  getUser(id): any {
    return this.http.get('http://localhost:' + PORT + '/site/' + id);
  }

  getUserinf(id): any {
    return this.http.get('http://localhost:' + PORT + '/site/' + id + '/inf');
  }

  getUsersinf(id): any {
    return this.http.get('http://localhost:' + PORT + '/site/' + id + '/friendsnews');
  }

  setupLabels(): any {
    return this.http.get('http://localhost:' + PORT + '/');
  }

}
