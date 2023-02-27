import { Module } from '@nestjs/common';
import { FirstController } from './first/first.controller';

@Module({
  controllers: [FirstController]
})
export class PremierModule {}
