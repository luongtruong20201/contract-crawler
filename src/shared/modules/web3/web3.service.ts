import { Inject, Injectable } from '@nestjs/common';
import { WEB3_INSTANCE } from 'src/constants/web3.constant';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  constructor(@Inject(WEB3_INSTANCE) private readonly web3: Web3) {}

  getPastLogs(fromBlock: number, toBlock?: number) {
    return this.web3.eth.getPastLogs({ fromBlock, toBlock });
  }
}
