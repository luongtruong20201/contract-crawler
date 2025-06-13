import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WEB3_INSTANCE } from 'src/constants/web3.constant';
import { EEnv } from 'src/enums/env.enum';
import { Web3 } from 'web3';
import { ERC721ContractFactory } from './erc721-contract';
import { Web3Service } from './web3.service';

@Global()
@Module({
  providers: [
    {
      provide: WEB3_INSTANCE,
      useFactory: (configService: ConfigService) => {
        return new Web3(configService.get<string>(EEnv.RPC_URL));
      },
      inject: [ConfigService],
    },
    ERC721ContractFactory,
    Web3Service,
  ],
  exports: [ERC721ContractFactory, Web3Service],
})
export class Web3Module {}
