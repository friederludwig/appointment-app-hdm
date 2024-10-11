import { Module } from '@nestjs/common';
import { BranchController } from './branch.controller';
import { BranchService } from './branch.service';
import { DatabaseModule } from '../db/database.module';
import { branchProvider } from './branch.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [BranchController],
  providers: [BranchService, ...branchProvider],
})
export class BranchModule {}
