import { Branch } from '@appointment-app-hdm/api-interfaces';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BranchService } from './branch.service';
import { AuthService } from '../auth/auth.service';

@Controller('branches')
export class BranchController {
  constructor(
    private readonly branchService: BranchService,
    private readonly authService: AuthService
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  GetAll() {
    return this.branchService.getAll();
  }

  @Get(':id')
  GetById(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.getById(id);
  }

  @Post()
  async createBranch(
    @Body() body: { branch: Partial<Branch> }
  ): Promise<Branch> {
    const branchData = body.branch;
    return this.branchService.create(branchData);
  }

  @Patch(':id')
  async PatchById(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBranch: Partial<Branch>
  ) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    await this.authService.validateTokenAndOwnership(token, id, 'branch');

    return this.branchService.updateById(id, updateBranch);
  }

  @Delete(':id')
  DeleteById(@Param('id', ParseIntPipe) id: number) {
    return this.branchService.delete(id);
  }
}
