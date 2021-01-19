import { Component, Input } from '@angular/core';
import { mock_data } from "../../../assets/mock_data";

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.styl']
})
export class PostComponent {
  @Input() item: any;
}
