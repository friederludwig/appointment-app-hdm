import { Controller, Get } from '@nestjs/common';
import { BranchService } from './branch.service';

@Controller('branches')
export class BranchController {
  constructor(private readonly BranchService: BranchService) {}

  @Get()
  GetAll() {
    return this.BranchService.getAll();
  }
}
