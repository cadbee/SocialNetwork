import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../http.service';

class Broker {
  name: string;
  address: string;
  id: number;

  constructor(name: string, address: string, id: number) {
    this.name = name;
    this.address = address;
    this.id = id;
  }
}

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.css'],
  providers: [HttpService]
})
export class StartPageComponent implements OnInit {
  brokers: Broker[];
  id: number;
  name: string;
  address: string;
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getUsers().subscribe((data: any) => {
      this.brokers = data;
    });
  }
  setup(): void{
    this.http.setupLabels().subscribe();
  }
}
