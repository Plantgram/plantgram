import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { mock_data } from "../../../assets/mock_data";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl']
})
export class UserComponent implements OnInit {

  id: any;
  request: any;
  user: any;
 
  constructor(
    private _Activatedroute:ActivatedRoute,
    private _router:Router
    ) { }

  ngOnInit(): void {
    this.request=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id');
      this.user = mock_data.find(opt => opt.id == this.id);
   });
  }
}
