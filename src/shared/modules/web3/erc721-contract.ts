import { Inject, Injectable } from '@nestjs/common';
import Web3, { Contract } from 'web3';
import { erc721ContractAbi } from './abis/erc721-contract';
import { WEB3_INSTANCE } from 'src/constants/web3.constant';

@Injectable()
export class ERC721ContractFactory {
  constructor(@Inject(WEB3_INSTANCE) private readonly web3: Web3) {}

  getContract(address: string): ERC721Contract {
    return new ERC721Contract(address, this.web3);
  }
}

class ERC721Contract {
  private readonly contract: Contract<any>;

  constructor(_address: string, _web3: Web3) {
    this.contract = new _web3.eth.Contract(erc721ContractAbi, _address);
  }

  getPastEvents(fromBlock: number, toBlock?: number, eventName = 'allEvents') {
    return this.contract.getPastEvents(eventName, {
      fromBlock,
      toBlock: toBlock ?? 'latest',
    });
  }
}
