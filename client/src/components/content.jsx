import React, {useCallback, useEffect, useState} from "react";
import useEth from "../contexts/EthContext/useEth";


function Content(){

    const { state: { upTokenSaleAddress,upTokenContract,upTokenSaleContract, accounts } } = useEth();
    const [tokens,setTokens]=useState(0);
    const [detail,setDetail]=useState({
        tokenAddress:"",
        whiteAddress:""
    });

    const getTokens=useCallback(async()=>{
        if(upTokenContract!==null && upTokenContract!==undefined){
        let myTokens=await upTokenContract.methods.balanceOf(upTokenSaleAddress).call();
        setTokens(myTokens);     
        }
    },[upTokenContract,upTokenSaleAddress]);     
    
    useEffect(()=>{
        getTokens();
    },[getTokens]);


    const setBlank=()=>{
        setDetail({
            tokenAddress:"",
            whiteAddress:""
        });
    }

    
    const handleChange=(event)=>{
        const {name,value}=event.target;
        setDetail(prevValue=>{
            if(name==="tokenAddress"){
                return {
                    tokenAddress:value,
                    whiteAddress:prevValue.whiteAddress
                };
            }else if(name==="whiteAddress"){
                return {
                    tokenAddress:prevValue.tokenAddress,
                    whiteAddress:value
                };
            }
        });
    }

    const handleCheck=async()=>{
        let bal=await upTokenContract.methods.balanceOf(detail.tokenAddress).call({from:accounts[0]});
        alert("You have "+bal+" tokens in your account");
        setBlank();
    }

    const handleWhitelist=async()=>{
        //await kycContract.methods.setKycComlpleted(detail.whiteAddress).send({from:accounts[0]});
        alert("KYC for this: "+detail.whiteAddress+" is completed");
        setBlank();
    }


    return <div className="center">

<div className="input-group mb-3">
<h1>UP Token ICO Sale</h1>
</div>


<div className="input-group mb-3">
<p>Introducing UP Token! Token price is 1 wei.You currently have {tokens} UP tokens</p>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Your Address" aria-label="Recipient's username" aria-describedby="button-addon2"  name="whiteAddress" value={detail.whiteAddress} onChange={handleChange}/>
  <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleWhitelist}>Add to whitelist</button>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Your Address" aria-label="Recipient's username" aria-describedby="button-addon2" name="tokenAddress" value={detail.tokenAddress} onChange={handleChange}/>
  <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleCheck}>Check Your Balance</button>
</div>

<div className="input-group mb-3">
  <p>To buy token send money to this address: {upTokenSaleAddress}</p>
</div>
    </div>;

}

export default Content;