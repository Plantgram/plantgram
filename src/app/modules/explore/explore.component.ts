import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from '@supabase/supabase-js';
import { NgxMasonryOptions } from 'ngx-masonry';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatabaseService } from 'src/app/core/services/database.service';
import { NewPostComponent } from './new-post/new-post.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.styl'],
})
export class ExploreComponent implements OnInit {
  posts: any; // FIXME: Add posts interface
  user$: Observable<User | null>;

  public myOptions: NgxMasonryOptions = {
    gutter: 20,
  };

  constructor(public dialog: MatDialog, private databaseService: DatabaseService, private authService: AuthService) {
    this.user$ = this.authService.currentUser$;
  }

  async ngOnInit(): Promise<void> {
    this.posts = await this.getPosts();
  }

  onNewPost(): void {
    const dialogRef = this.dialog.open(NewPostComponent, {
      width: '60%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  private async getPosts() {
    const { data, error } = await this.databaseService.getAllPosts();
    return data;
  }
}
