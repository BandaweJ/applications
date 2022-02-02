import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get('/:id')
  trackApplication(@Param('id') id: string) {
    console.log(id);
    return this.trackService.trackApplication(id);
  }
}
