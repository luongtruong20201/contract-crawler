import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContractBodyReqDto } from './dtos/contract-request.dto';
import { ContractRepository } from 'src/repositories/contract.repository';

@Injectable()
export class ContractService {
  constructor(private readonly contractRepository: ContractRepository) {}

  async create(body: CreateContractBodyReqDto) {
    const isExistContract = await this.contractRepository.existsBy({
      address: body.address,
    });

    if (isExistContract) {
      throw new BadRequestException('Contract already exists');
    }

    const contract = this.contractRepository.create({
      address: body.address,
    });

    return this.contractRepository.save(contract);
  }
}
