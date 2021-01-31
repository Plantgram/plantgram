import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';

import { DatabaseService } from '../../core/services/database.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.styl'],
})
export class NewPostComponent {
  @Input() size = '24px';

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  tags: Tag[] = [];
  files: File[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl(this.tags),
    images: new FormControl(this.files),
  });

  constructor(private dbService: DatabaseService) {}

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
      this.tags.push({ name: value.trim() });
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tags: Tag): void {
    const index = this.tags.indexOf(tags);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemoveImage(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onFormSubmit() {
    console.log(this.postForm);
    this.dbService.insertPost(this.postForm.value, this.dbService.currentUser!.id); // FIXME: pass userid
  }
}
