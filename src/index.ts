import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string => {
    return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  };
  static validateStructure = (aBlock: Block): boolean => {
    if (
      typeof aBlock.index === "number" &&
      typeof aBlock.hash === "string" &&
      typeof aBlock.previousHash === "string" &&
      typeof aBlock.data === "string" &&
      typeof aBlock.timestamp === "number"
    ) {
      return true;
    } else {
      return false;
    }
  };

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(1, "20210217", "", "hello", 123456);

let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data: string): Block => {
  const previousBlock: Block = getLatestBlock();
  const newIndex: number = previousBlock.index + 1;
  const newTimeStamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimeStamp
  );

  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};
const getHashForBlock = (aBlock:Block):string => {
 return Block.calculateBlockHash(aBlock.index,aBlock.previousHash,aBlock.data,aBlock.timestamp);
}

const isBlockValidation = (
  candidateBlock: Block,
  previousBlock: Block
): boolean => {
  if (
    Block.validateStructure(candidateBlock) && 
    candidateBlock.index === previousBlock.index + 1 &&
    candidateBlock.previousHash === previousBlock.hash &&
    candidateBlock.hash === getHashForBlock(candidateBlock)
  ) {
    return true;
  } else {
    return false;
  }
};
const addBlock = (candidateBlock:Block) =>{
  if(isBlockValidation(candidateBlock,getLatestBlock())){
    blockChain.push(candidateBlock);
  }
}; 

createNewBlock("second");
createNewBlock("third");
createNewBlock("four");
console.log(blockChain);

export {};
