import { useEffect,useState } from "react";
import React from "react";
import axios from "axios";

const Dashboard=()=>
{
    const [transactionsList,setTransactionsList]=useState([])

    useEffect(()=>{
        axios.get(`http://localhost:8080/transaction/get-all-transactions/`)
        .then((response)=>setTransactionsList(response.data))
        .catch((error)=>
        {
            console.log(error.data)
        })
    },[transactionsList])

    const getTransactionsList=()=>
    {
        const transactionTable=<table class="table table-light table-striped table-hover">
        <thead>
        
          <tr>
            <th scope="col" class="col-4 col-lg-2" >ID </th>
            <th scope="col" class="col-4 col-lg-2">DATE</th>
            <th scope="col"  class="col-4 col-lg-2" >CUSTOMER ID</th>
            <th scope="col"  class="col-4 col-lg-2"  >RECIEVER BIC</th>
            <th scope="col" class="col-4 col-lg-2"> RECIEVER NAME</th>
            <th scope="col" class="col-4 col-lg-2"> RECIEVER A/C</th>
            <th  scope="col" class="col-4 col-lg-2" >AMOUNT</th>
            <th  scope="col" class="col-4 col-lg-2" >MESSAGE</th>
          </tr>
          
        </thead>
        <tbody>
            {
                transactionsList.map(transaction=>
                    {
                        return <tr>
                            <td>{transaction.transaction_id}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.customer.cust_id}</td>
                            <td>{transaction.reciever.ifscCode}</td>
                            <td>{transaction.beneficiaryName}</td>
                            <td>{transaction.beneficiaryAccountNumber}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.message}</td>
                        </tr>
                    })
            }
        </tbody>
        </table>

        return transactionTable
    }
    if(transactionsList.length!==0)
    return <div>{getTransactionsList()}</div>
    else return <div>No Transactions are performed yet</div>
}
export default Dashboard;