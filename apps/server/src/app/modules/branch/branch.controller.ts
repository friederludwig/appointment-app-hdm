import {
  Get,
  Post,
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { BranchService } from './branch.service';
import { Appointment, Branch } from '@appointment-app-hdm/api-interfaces';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('branches')
export class BranchController {
  constructor(private readonly BranchService: BranchService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll() {
    return this.BranchService.getAll();
  }

  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.BranchService.getById(id);
  }

  @Post()
  async createBranch(
    @Body() body: { branch: Partial<Branch> }
  ): Promise<Branch> {
    const branchData = body.branch;
    console.log(branchData);
    return this.BranchService.create(branchData);
  }

  @Patch('id')
  async PatchById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedBranch: Partial<Branch>
  ) {
    return this.BranchService.updateById(id, updatedBranch);
  }

  @Delete('id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.BranchService.delete(id);
  }
}
