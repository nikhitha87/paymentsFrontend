import React, {useEffect,useState} from 'react'
    import {useNavigate} from 'react-router-dom'
const TransactionSummary=(props)=>
{
    
      console.log(props.transactionError)
      const [balance,setBalance]=useState(props.transaction.customer.balance-props.transaction.amount-props.transaction.amount*0.0025)
      const overdraft= props.transaction.customer.overdraft
        console.log(props.terror)
      console.log(props.transaction)
     
    
       const message = <div className="col-6 " style={{margin:"auto"}}>
           <table className="table table-Light table-borderless">
      <thead>
        <tr>
          <th scope="col"><h2 style={{color:'green'}}>TRANSACTION SUCCESSFULL!!!</h2></th>
          <th scope="col"></th>
         
         
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Debited From</th>
          <td>{props.transaction.customer.cust_name}</td>
         
      
        </tr><tr>
          <th scope="row"></th>
          <td>{`ID : ${props.transaction.customer.cust_id}`}</td>
      
        </tr>
        <tr>
          <th scope="row">Credited To</th>
          <td>{props.transaction.beneficiaryName}</td>
        </tr>
        <tr>
          <th scope="row"></th>
          <td>{` A/c - ${props.transaction.beneficiaryAccountNumber}`}</td>
       
        </tr> <tr>
          <th scope="row"></th>
          <td>{` BIC - ${props.transaction.reciever.ifscCode}`}</td>
       
        </tr>
     
        <tr>
          <th scope="row">Amount Transfered</th>
          <td colspan="2">{props.transaction.amount}</td>
          </tr>
       
    <tr>
          <th scope="row">Balance Amount</th>
          <td colspan="2">{balance}</td>
       
        </tr>
        
    
      </tbody>
    </table>
    <div style={{marginLeft:10,marginTop:60}}><button type="button" class="btn btn-danger" onClick={()=>{props.submitHandler("false",0,0)}}>Go Back</button></div>
           
       </div>
        if (props.transactionError===false)
        return <div>{message}</div>
      
        if (props.transactionError===true  && balance<0){
          return <div><h3 style={{color:'red',textAlign:'center'}}>Transaction failed due to insufficient funds</h3></div>
        }
        return <div></div>
          }
export default TransactionSummary;

