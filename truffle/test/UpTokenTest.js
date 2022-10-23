const UpToken = artifacts.require("UpToken");

const chai=require("./ChaiSetUp.js");
const BN=web3.utils.BN;
const expect=chai.expect;

contract("UpToken Test",async(accounts)=>{

    it("all tokens should be in my accounts",async()=>{
        let instance=await UpToken.deployed();
        let totalSupply=await instance.totalSupply();
        await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
      });

      it("is possible to transfer to another accounts",async()=>{
        let instance=await UpToken.deployed();
        let totalSupply=await instance.totalSupply();
        await expect(instance.transfer(accounts[1],1)).to.eventually.be.fulfilled;
        await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(1)));
      });

    
});