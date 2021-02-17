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
    blockChain.push(newBlock);
    return getBlockChain();
};
console.log(createNewBlock("hahaha"), createNewBlock("good"));
//# sourceMappingURL=index.js.map