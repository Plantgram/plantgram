import { NgxMasonryOptions } from 'ngx-masonry';

import {
    Component,
    Inject,
    OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { new_mock } from '../../../assets/new_mock';
import { NewPostComponent } from '../new-post/new-post.component';
import { DatabaseService } from 'src/app/core/services/database.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl'],
})
export class ExploreComponent implements OnInit {
  posts = new_mock;
  dbPosts: any;

  public myOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(public dialog: MatDialog, private db: DatabaseService ) {}
  async ngOnInit(): Promise<void> {
    this.dbPosts = await this.getPosts();
  }

  openNewPostDialog(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '30%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  async getPosts() {
    const { data, error } = await this.db.getAllPosts();
    console.log(data);
    return data;
  }
}
