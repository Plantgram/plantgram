import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [ExploreComponent, PostComponent, NewPostComponent],
  imports: [ExploreRoutingModule, SharedModule],
})
export class ExploreModule {}
