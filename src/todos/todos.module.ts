import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [UsersModule],
  exports: [TodosService],
})
export class TodosModule {}
