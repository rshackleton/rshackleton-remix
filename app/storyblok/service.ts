import type { StoryblokClient, StoryData, StoryParams } from '@storyblok/js';
import { apiPlugin, storyblokInit } from '@storyblok/js';
import { AxiosError } from 'axios';
import type { StoryblokComponent } from 'storyblok-js-client';
import invariant from 'tiny-invariant';

type StoryType = StoryblokComponent<string> & { [index: string]: any };

class StoryblokService {
  private api: StoryblokClient;
  private verbose: boolean;

  constructor() {
    const { storyblokApi } = storyblokInit({
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      bridge: true,
      use: [apiPlugin],
    });

    invariant(storyblokApi, `Could not create StoryblokClient instance.`);

    this.api = storyblokApi;
    this.verbose = process.env.LOG_VERBOSE === 'true';
  }

  async get<T>(slug: string, params: any = {}): Promise<T> {
    try {
      const result = await this.api.get(slug, {
        version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
        ...params,
      });

      this.log(JSON.stringify(result, null, 2));

      return result.data as T;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Response('Not Found', { status: 404 });
      }

      throw new Response('Error', { status: 500 });
    }
  }

  async getStory<T extends StoryType>(
    slug: string,
    params: StoryParams = {},
  ): Promise<T> {
    try {
      const result = await this.api.getStory(slug, {
        version: process.env.NODE_ENV === 'development' ? 'draft' : 'published',
        ...params,
      });

      this.log(JSON.stringify(result, null, 2));

      const story = result.data.story as StoryData<T>;
      return story.content;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        throw new Response('Not Found', { status: 404 });
      }

      throw new Response('Error', { status: 500 });
    }
  }

  private log(...args: any[]) {
    if (this.verbose) {
      console.log(args);
    }
  }
}

const storyblokService = new StoryblokService();

export default storyblokService;
