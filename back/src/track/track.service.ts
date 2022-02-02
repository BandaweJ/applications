import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApplicationsEntity } from 'src/applications/entities/applications.entity';
import { ApplicationsRepository } from 'src/applications/repositories/applications-repository';
import { EntityRepository, Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(ApplicationsRepository)
    private readonly trackRepository: ApplicationsRepository,
  ) {}

  async trackApplication(id: string): Promise<ApplicationsEntity> {
    const application = await this.trackRepository.findOne(id);

    if (!application) {
      throw new NotFoundException(`Application with ID ${id} was not found`);
    }

    return application;
  }
}
