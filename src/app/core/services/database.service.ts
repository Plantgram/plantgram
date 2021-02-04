import { SUPABASE_CLIENT } from 'src/app/supabase-client';

import {
    Inject,
    Injectable,
} from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { equal } from 'assert';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(@Inject(SUPABASE_CLIENT) private supabaseClient: SupabaseClient) {}

  //#region GET API
  async getUsers() {
    return await this.supabaseClient.from('user_cred').select('*');
  }

  async getUserProfile(userId: string) {
    return await this.supabaseClient
      .from('users')
      .select('id, first_name, last_name, about, profile_image')
      .eq('id', userId);
  }

  async getAllPosts() {
    return await this.supabaseClient
    .from('posts')
    .select(`id, user_id, title, description, tags, images_path, author:user_id (id, first_name, last_name)`)
    .order('created_at', { ascending: false });
  }

  async getUserPosts(userId: any) {
    return await this.supabaseClient.from('posts').select('*').eq('user_id', userId);
  }

  async getBookmarks() {
    return await this.supabaseClient
    .from('post_bookmarks')
    .select('post_id, user_id');
  }

  async getUserFollowers(id: any) {
    return await this.supabaseClient
    .from('user_subscription')
    .select('subscriber_user_id, subscribed_to_user_id')
    .eq('subscribed_to_user_id', id);
  }

  async getUserFollowing(id: any) {
    return await this.supabaseClient
    .from('user_subscription')
    .select('subscriber_user_id, subscribed_to_user_id')
    .eq('subscriber_user_id', id);
  }

  async getSubscription(subscriberUserId: any, subscribedToUserId: any) {
    return await this.supabaseClient
    .from('user_subscription')
    .select('id, subscriber_user_id, subscribed_to_user_id')
    .match({subscriber_user_id: subscriberUserId, subscribed_to_user_id: subscribedToUserId});
  }
  //#endregion

  //#region POST/INSERT API
  async insertPost(data: any, userId: any) {
    try {
      await this.supabaseClient.from('posts').insert([
        {
          user_id: userId,
          title: data.title,
          description: data.description,
          tags: { tagsList: data.tags },
          images_path: { images: [] },
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

  async unSubscribe(subscriberUserId: any, subscribedToUserId: any) {
    await this.supabaseClient
      .from('user_subscription')
      .delete()
      .match({subscriber_user_id: subscriberUserId, subscribed_to_user_id: subscribedToUserId});
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
