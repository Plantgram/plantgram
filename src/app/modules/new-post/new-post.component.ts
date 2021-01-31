import { Component, Input, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { DatabaseService } from '../../api/database.service';

export interface Tag {
  name: string;
}

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.styl'],
})
export class NewPostComponent implements OnInit {
  service: any;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  tags: Tag[] = [];
  files: File[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() size = '24px';

  constructor(private dbService: DatabaseService) {
    this.service = dbService;
  }

  ngOnInit(): void {}

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
    this.service.insertPost(this.postForm.value);
  }

  postForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    tags: new FormControl(this.tags),
    images: new FormControl(this.files),
  });
}
