import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@supabase/supabase-js';

@Component({
  selector: 'app-mobile-toolbar',
  templateUrl: './mobile-toolbar.component.html',
  styleUrls: ['./mobile-toolbar.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileToolbarComponent {
  @Input() user: User | null = null;

  @Output() menuClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() logoutClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() profileClicked: EventEmitter<void> = new EventEmitter<void>();
}
