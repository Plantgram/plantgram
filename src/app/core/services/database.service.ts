import { SUPABASE_CLIENT } from 'src/app/supabase-client';

import {
    Inject,
    Injectable,
} from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(@Inject(SUPABASE_CLIENT) private supabaseClient: SupabaseClient) {}

  //#region GET API
  async getUsers() {
    return await this.supabaseClient.from('user_cred').select('*');
  }

  async getUserProfile(id: any) {
    return await this.supabaseClient
      .from('user_profile')
      .select('first_name, last_name, about, user_image_path')
      .eq('user_id', id);
  }

  async getAllPosts() {
    return await this.supabaseClient.from('posts').select('*');
  }

  async getUserPosts(userID: any) {
    return await this.supabaseClient.from('posts').select('*').eq('user_id', userID);
  }
  //#endregion
  getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return reader.result?.toString().split(',')[1];
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //#region POST/INSERT API
  async insertPost(data: any, userID: any) {
    let reader = new FileReader();
    let helperArray: (string | ArrayBuffer | null)[] = [];
    try {
      for (let i = 0; i < data.images.length; i++) {
        reader.readAsDataURL(data.images[i]);
        reader.onload = function () {
          helperArray.push(reader.result);
        };
      }
      console.log(helperArray);
      await this.supabaseClient.from('posts').insert([
        {
          user_id: userID,
          title: data.title,
          description: data.description,
          tags: { tagsList: data.tags },
          images_path: { images: helperArray },
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async subscribe(subscriberID: any, subscribedToID: any) {
    try {
      await this.supabaseClient.from('user_subscription').insert([
        {
          subscriber_user_id: subscriberID,
          subscribed_to_user_id: subscribedToID,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }

  async bookmark(postID: any, subscriberID: any) {
    try {
      await this.supabaseClient.from('user_subscription').insert([
        {
          post_id: postID,
          user_id: subscriberID,
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion

  //#region PUT/UPDATE API

  //#endregion

  //#region POST/DELETE API
  async deletePost(postID: any, userID: any) {
    try {
      await this.supabaseClient.from('posts').delete().eq('id', postID).eq('user_id', userID);
    } catch (error) {
      console.log(error);
    }
  }

  async unSubscribe(subscriberID: any, subscribedToID: any) {
    try {
      await this.supabaseClient
        .from('user_subscription')
        .delete()
        .eq('subscriber_user_id', subscriberID)
        .eq('subscribed_to_user_id', subscribedToID);
    } catch (error) {
      console.log(error);
    }
  }

  async removeBookmark(postID: any, subscriberID: any) {
    try {
      await this.supabaseClient.from('user_subscription').delete().eq('post_id', postID).eq('user_id', subscriberID);
    } catch (error) {
      console.log(error);
    }
  }
  //#endregion
}
