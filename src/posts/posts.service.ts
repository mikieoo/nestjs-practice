import { Injectable, NotFoundException } from '@nestjs/common';
import { PostsModel } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

let posts : PostsModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content:'화장 고치고 있는 민지',
    likeCount: 1000000,
    commentCount: 99999
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '뉴진스 해린',
    content:'노래 연습하고 있는 해린',
    likeCount: 1000000,
    commentCount: 99999
  },
  {
    id: 3,
    author: 'blackpink_official',
    title: '블랙핑크 로제',
    content:'종합운동장에서 공연하는 로제',
    likeCount: 1000000,
    commentCount: 99999
  }
]

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>
  ){}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({ // 리포지토리를 사용하는 모든 함수는 비동기 함수임 
                                                      // 즉 await을 써줘야 밑의 예외처리 가능
      where: { // 필터할 조건을 적어줌
        id,
      }
    });

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // 1) create -> 저장할 객체를 생성한다.
    // 2) save -> 객체를 저장한다. (create 메서드에서 생성한 객체로)
    const post = this.postsRepository.create({
      author,
      title, 
      content,
      likeCount: 0,
      commentCount: 0
    });
    
    const newPost = await this.postsRepository.save(post);

    return newPost;
  }

  async updatePost(postId: number, author?: string, title?: string, content?: string) {
    // save의 기능
    // 1) 만약에 데이터가 존재하지 않는다면 (id 기준으로) 새로 생성한다.
    // 2) 만약에 데이터가 존재한다면 (같은 id의 값이 존재한다면) 존재하던 값을 업데이트한다.
    const post = await this.postsRepository.findOne({
      where: {
        id: postId,
      }
    });

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author
    }

    if (title) {
      post.title = title
    }
    
    if (content) {
      post.content = content
    }
    const newPost = await this.postsRepository.save(post); // 이미 존재하는 객체라면 생성이 아닌 업데이트를 함

    return newPost;
  }

  deletePost(postId: number) {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
    throw new NotFoundException;
    }
    
    posts = posts.filter(post => post.id !== postId);

    return postId;
  }
}
