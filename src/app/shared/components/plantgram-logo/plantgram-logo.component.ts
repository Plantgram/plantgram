import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-plantgram-logo',
  templateUrl: './plantgram-logo.component.html',
  styleUrls: ['./plantgram-logo.component.styl']
})
export class PlantgramLogoComponent {
  @Input() size = 24;
}
