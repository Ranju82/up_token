import React, {useCallback, useEffect, useState} from "react";
import useEth from "../contexts/EthContext/useEth";


function Content(){

    const { state: { contract, accounts } } = useEth();
    const [address,setAddress]=useState("");
    const [tokens,setTokens]=useState(0);

    const getTokens=useCallback(async()=>{
        if(contract!==null && contract!==undefined){
        let myTokens=await contract.methods.balanceOf(accounts[0]).call();
        setTokens(myTokens);     
        }
    },[contract,accounts]);     
    
    useEffect(()=>{
        getTokens();
    },[getTokens]);

    
    const handleChange=(event)=>{
        const value=event.target.value;
        setAddress(value);
    }

    const handleClick=async()=>{
        await contract.methods.transfer(address,1).send({from:accounts[0]});
    }

    return <div className="center">

<div className="input-group mb-3">
<h1>UP Token ICO Sale</h1>
</div>


<div className="input-group mb-3">
<p>Introducing UP Token! Token price is 1 wei.You currently have {tokens} UP tokens</p>
</div>

<div className="input-group mb-3">
  <input type="text" className="form-control" placeholder="Your Address" aria-label="Recipient's username" aria-describedby="button-addon2" name="addressToSend" value={address} onChange={handleChange}/>
  <button className="btn btn-primary" type="button" id="button-addon2" onClick={handleClick}>Buy Tokens</button>
</div>
    </div>;
}

export default Content;