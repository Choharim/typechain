"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CryptoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calculateBlockHash = function (index, previousHash, data, timestamp) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validateStructure = function (aBlock) {
        if (typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.data === "string" &&
            typeof aBlock.timestamp === "number") {
            return true;
        }
        else {
            return false;
        }
    };
    return Block;
}());
var genesisBlock = new Block(1, "20210217", "", "hello", 123456);
var blockChain = [genesisBlock];
var getBlockChain = function () { return blockChain; };
var getLatestBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTimeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previousBlock = getLatestBlock();
    var newIndex = previousBlock.index + 1;
    var newTimeStamp = getNewTimeStamp();
    var newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, data, newTimeStamp);
    var newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    return newBlock;
};
var getHashForBlock = function (aBlock) {
    return Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.data, aBlock.timestamp);
};
var isBlockValidation = function (candidateBlock, previousBlock) {
    if (Block.validateStructure(candidateBlock) &&
        candidateBlock.index === previousBlock.index + 1 &&
        candidateBlock.previousHash === previousBlock.hash &&
        candidateBlock.hash === getHashForBlock(candidateBlock)) {
        return true;
    }
    else {
        return false;
    }
};
var addBlock = function (candidateBlock) {
    if (isBlockValidation(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
console.log(createNewBlock("hi"));
//# sourceMappingURL=index.js.map