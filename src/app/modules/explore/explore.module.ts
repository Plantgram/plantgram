import { SharedModule } from 'src/app/shared/shared.module';

import { NgModule } from '@angular/core';

import { ExploreRoutingModule } from './explore-routing.module';
import { ExploreComponent } from './explore.component';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [ExploreComponent, PostComponent],
  imports: [
    ExploreRoutingModule,
    SharedModule,
  ]
})
export class ExploreModule { }
