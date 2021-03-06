import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NgxMasonryModule } from 'ngx-masonry';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PlantgramLogoComponent } from './components/plantgram-logo/plantgram-logo.component';

const MATERIAL_MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  MatDividerModule,
  MatProgressBarModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule,
  MatDialogModule,
  MatExpansionModule,
  MatChipsModule,
  ReactiveFormsModule,
  NgxDropzoneModule,
  FormsModule,
  NgxMasonryModule,
];

@NgModule({
  declarations: [PlantgramLogoComponent, PageNotFoundComponent],
  imports: [RouterModule, CommonModule, ...MATERIAL_MODULES],
  exports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PlantgramLogoComponent,
    PageNotFoundComponent,
    ...MATERIAL_MODULES,
  ],
})
export class SharedModule {}
