import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WEB3_INSTANCE } from 'src/constants/web3.constant';
import { EEnv } from 'src/enums/env.enum';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  constructor(
    @Inject(WEB3_INSTANCE) private readonly web3: Web3,
    private readonly configService: ConfigService,
  ) {}

  getPastLogs(fromBlock: number, toBlock?: number) {
    return this.web3.eth.getPastLogs({ fromBlock, toBlock });
  }

  async getBlockNumber(): Promise<bigint> {
    const latestblock = await this.web3.eth.getBlockNumber();
    const safeBlock = this.configService.get<number>(EEnv.SAFE_BLOCK)!;

    return latestblock - BigInt(safeBlock);
  }
}
