import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { AuthService } from 'src/app/core/services/auth.service';
import { DatabaseService } from 'src/app/core/services/database.service';

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

  tagList: string[] = [];
  files: File[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public postForm: FormGroup;

  constructor(private databaseService: DatabaseService, private authService: AuthService, public fb: FormBuilder) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      tags: new FormControl([]),
    });
  }

  get tags() {
    return this.postForm.get('tags');
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if (this.tags && (value || '').trim()) {
      this.tags.value.push(value);
      this.tags.updateValueAndValidity();
    }
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.tagList.indexOf(tag);
    if (index >= 0) {
      this.tagList.splice(index, 1);
    }
  }

  onSelectImage(event: any) {
    this.files.push(...event.addedFiles);
  }

  onRemoveImage(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  async onFormSubmit() {
    const result = await this.databaseService.insertPost(this.postForm.value, this.authService.currentUser?.id);
    console.log('result', result);
  }
}
