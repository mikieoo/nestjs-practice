import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';

@Module({
  controllers: [PostsController], // 클래스로 넣는 이유 ? 자동으로 IoC가 인스턴스화 하길 원하기 때문에 클래스로 넣음
  providers: [PostsService], // 등록을 해야 의존성 주입을 해줌 & Injectable도 넣어줘야함
})
export class PostsModule {}
