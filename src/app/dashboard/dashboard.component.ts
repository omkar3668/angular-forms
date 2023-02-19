import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   Data:Array<any>=[];

  constructor(private apiService: ApiService) { 
    this.apiService.getAllPersons().subscribe(
      (res)=>{
        this.Data = res;
      }
    )
  }

  ngOnInit(): void {
  }
  
  logout(){
    localStorage.clear()
  }
}
