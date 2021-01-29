import { new_mock } from '../../../assets/new_mock';
import { AccountService } from '../../core/services/account.service';
import { DatabaseService } from '../../api/database.service';

import {
    Component,
    OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface User {
  first_name: string;
  last_name: string;
  about: string;
  user_image_path: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.styl'],
})
export class UserComponent implements OnInit {
  id: any;
  request: any;
  user: any;
  user_posts: any;

  constructor(private _Activatedroute: ActivatedRoute, private _accountService: AccountService, private _dbService: DatabaseService) {  }

  ngOnInit(): void {
    this.request = this._Activatedroute.paramMap.subscribe(async () => {          
      this.id = this._accountService.currentUser?.id;
      this.user = await this.getUserProfile();    
    });
  }

  async getUserProfile() {
    let req = await this._dbService.getUserProfile(this.id);   
    return <User>req.body![0];
  }
  
}
