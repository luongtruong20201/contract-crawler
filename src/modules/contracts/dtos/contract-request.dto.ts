import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty, IsString } from 'class-validator';

export class CreateContractBodyReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEthereumAddress()
  address: string;
}
