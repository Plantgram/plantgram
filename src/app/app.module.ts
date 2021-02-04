import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './core/layout/layout.module';
import { AuthModule } from './modules/auth/auth.module';
import { ExploreModule } from './modules/explore/explore.module';
import { NewPostComponent } from './modules/new-post/new-post.component';
import { SettingsModule } from './modules/settings/settings.module';
import { UserModule } from './modules/user/user.module';
import { SharedModule } from './shared/shared.module';
import { supabaseClient, SUPABASE_CLIENT } from './supabase-client';

@NgModule({
  declarations: [AppComponent, NewPostComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    AuthModule,
    ExploreModule,
    UserModule,
    SettingsModule,
    SharedModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
    {
      provide: SUPABASE_CLIENT,
      useValue: supabaseClient,
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
