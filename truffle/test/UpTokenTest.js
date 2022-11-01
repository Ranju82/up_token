const UpToken = artifacts.require("UpToken");

const chai=require("./ChaiSetUp.js");
const BN=web3.utils.BN;
const expect=chai.expect;

contract("UpToken Test",async(accounts)=>{

    it("all tokens should be in my accounts",async()=>{
        let instance=await UpToken.deployed();
        let totalSupply=await instance.totalSupply();
        return await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply);
      });

      it("is possible to transfer to another accounts",async()=>{
        let instance=await UpToken.deployed();
        let totalSupply=await instance.totalSupply();
        await expect(instance.transfer(accounts[1],1)).to.eventually.be.fulfilled;
        return await expect(instance.balanceOf(accounts[0])).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(1)));
      });

      it("approves token for delegate transfer",async()=>{
        let instance=await UpToken.deployed();
        await expect(instance.approve(accounts[1],100)).to.eventually.be.fulfilled;
        return await expect(instance.allowance(accounts[0],accounts[1])).to.eventually.be.a.bignumber.equal(new BN(100));
      });
    
      it("approves token for delegate transfer",async()=>{
        let instance=await UpToken.deployed();
        let fromAccount=accounts[2];
        let toAccount=accounts[3];
        let spendingAccount=accounts[4];
        await expect(instance.transfer(fromAccount,100)).to.eventually.be.fulfilled;
        await expect(instance.approve(spendingAccount,50,{from:fromAccount})).to.eventually.be.fulfilled;
        return await expect(instance.transferFrom(fromAccount,toAccount,50,{from:spendingAccount})).to.eventually.be.fulfilled;
      });
});