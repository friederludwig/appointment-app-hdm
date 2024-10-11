import { Branch } from '@appointment-app-hdm/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BranchEntity } from '../../entities/branch.entity';
import { NotFoundException } from '@nestjs/common';

// export const openingHoursPerBranch: OpeningHoursPerBranch = {
//   Berlin: {
//     openingHoursStart: '08:00',
//     openingHoursEnd: '16:00',
//   },
//   Dortmund: {
//     openingHoursStart: '07:00',
//     openingHoursEnd: '20:00',
//   },
// };

@Injectable()
export class BranchService {
  constructor(
    @Inject('BRANCH_REPOSITORY')
    private branchRepository: Repository<BranchEntity>
  ) {}

  getAll(): Promise<Branch[]> {
    return this.branchRepository.find();
  }

  getById(id: number): Promise<Branch[]> {
    const branch = this.branchRepository.find({ where: { id } });
    return branch.then((result) => {
      if (result.length > 1) {
        console.log(`Mehr als ein Object mit id ${id}`);
      }
      return result;
    });
  }

  async updateById(id: number, branch: Partial<Branch>): Promise<Branch> {
    const oldBranch = await this.branchRepository.findOne({ where: { id } });

    if (!oldBranch) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
    const patchedBranch: Branch = { ...oldBranch, ...branch };
    return this.branchRepository.save(patchedBranch);
  }

  async delete(id: number): Promise<void> {
    const result = await this.branchRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Branch with ID ${id} not found`);
    }
  }

  async create(createData: Partial<Branch>): Promise<Branch> {
    const candidate = this.branchRepository.create(createData);
    return this.branchRepository.save(candidate);
  }
}
