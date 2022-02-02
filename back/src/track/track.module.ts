import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationsRepository } from 'src/applications/repositories/applications-repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApplicationsRepository])],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
