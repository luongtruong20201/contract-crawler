import { Body, Controller, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractBodyReqDto } from './dtos/contract-request.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('contracts')
@ApiTags('Contracts')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() body: CreateContractBodyReqDto) {
    return this.contractService.create(body);
  }
}
