import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-toolbar',
  templateUrl: './mobile-toolbar.component.html',
  styleUrls: ['./mobile-toolbar.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileToolbarComponent {
  @Output() menuClicked: EventEmitter<void> = new EventEmitter<void>();
}
