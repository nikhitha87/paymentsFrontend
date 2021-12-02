import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import TransactionSummary from "./TransactionSummary";

const PaymentsInterface=()=> {
    const [customer, setCustomer] = useState(
        {
            cust_id: 0,
            cust_name: '',
            balance: 0
        }
    );
    const [reciever, setReciever] = useState(
        {
            ifscCode: '',
            bankName: ''
        }
    );
    const [transaction, setTransaction] = useState({
        transactionDate: undefined,
        cust_id: "",
        amount: 0,
        ifscCode: "",
        beneficiaryName: "",
        beneficiaryAccountNumber: "",
        message: ""
    });
    const [request, setRequest] = useState("false")
    const [submit, setSubmit] = useState("false")
    const [transactionError, setTransactionError] = useState(false)
    const [dateError, setDateError] = useState(null)
    const [cust_idError, setCust_idError] = useState(null)
    const [bicError, setBicError] = useState(null)
    const [nameError, setNameError] = useState(null)
    const [accNoError, setAccNoError] = useState(null)
    const [messageError, setMsgError] = useState(null)
    const [amountError, setAmountError] = useState(null)
    const[nameStatus,setNameStatus]=useState(null)
    const[verifyStatus,setVerifyStatus]=useState(0)

    const getCustomerById = (evt) => {
        console.log("getCustomerById");
            axios.get(`http://localhost:8080/customer/get-customer/${evt.target.value}`)
                .then((response) => {
                    setCustomer(response.data);
                    setCust_idError("");
                }).catch(error => {
                    console.log(error);
                    if(evt.target.value==="")
                        setCust_idError("Please enter Account ID");
                    else
                        setCust_idError("Customer ID not Found. Please enter valid ID");
                });
        evt.preventDefault();
    }

    const getBankByifscCode = (evt) => {
        console.log("getBankByifscCode");
        axios.get(`http://localhost:8080/reciever/get-reciever-bank/${evt.target.value}`)
            .then((response) => {
                setReciever(response.data);
                setBicError("");
            }).catch(error => {
                console.log(error);
                if(evt.target.value==="")
                setBicError("Please enter BIC");
            else
                setBicError("BIC not Found. Please enter valid BIC");
            });
        evt.preventDefault();
    }

    const nameValidation =(evt)=>
    {
        console.log("validating name");
        axios.get(`http://localhost:8080/reciever/name-validator/${transaction.beneficiaryName}`)
        .then((response)=>
        {
            console.log(response.data)
            setNameStatus(response.data)
            setVerifyStatus(1)
            if(response.data)
            {
                setNameError("Go Ahead");
            }
            else{
                setNameError("Cannot initiate Transaction. Beneficiary present in sanction list.")
            }
        }).catch(error=>
            {
                console.log(error);
            })
            evt.preventDefault();
    }
    useEffect(()=>{
        setTransaction({...transaction,reciever})
      },[reciever])
      useEffect(()=>{
        setTransaction({...transaction,customer})
      },[customer])
      useEffect(()=>{
        console.log("request sending")
        axios.post("http://localhost:8080/transaction/add-transaction/", transaction).
        then(response=>{console.log(response.data)
        setTransactionError(false)})
        .catch(error=>
            {console.log(error)
                setTransactionError(true)})
      }
      ,[request])
  
      const addTransaction=(e)=>{
        e.preventDefault()
       
       const valid= formHandle()
       console.log("validating form"+valid)
       if (!valid) return false;
        setRequest("true")
        if(valid===true)
        setSubmit("true")
      }
      const submitHandler=(submit,acntnostatus)=>
      {
        setSubmit(submit)
      }
      
    const formHandle = (evt) => {
       
        let valid = true;
        if (customer.cust_id === '' || customer.cust_id < 14) {
          setCust_idError("enter valid customer id with 14 characters")
          valid = false;
        }
    
        if (reciever.ifscCode === '') {
          setBicError("Bank BIC is required")
          valid = false;
        }
        if (reciever.ifscCode < 11) {
          setBicError("enter valid bic with 11 characters")
          valid = false;
        }
        if (transaction.beneficiaryName === '') {
          setNameError("Name is required")
          valid = false;
        }

        if(verifyStatus==0)
        {
            setNameError("Verifiaction is required")
            valid=false;
        }


        if(!nameStatus)
        {
            setNameError("Enter Valid Name")
            valid=false;
        }

        if(transaction.beneficiaryAccountNumber==="")
        {
            setAccNoError("AccountNumber is required");
            valid=false;
        }
        if (transaction.transactionDate === '') {
          setDateError("Date is required")
          valid = false;
        }
        if (transaction.message === '' || transaction.message === '-select-') {
          setMsgError("Message code is required")
          valid = false;
        }
        if (transaction.amount === 0) {
          setAmountError("please enter the amount")
          valid = false;
        }
    
        return valid;

        evt.preventDefault();

    }
    if (submit==="false")
    return <div>
            <h3>New Transaction</h3>
            <form className="form form-group col-4">
                <div>
                     <label>Enter Date</label>
                    <input type="date" required className="form-control" onChange={e => setTransaction({ ...transaction, transactionDate: e.target.value })} />
                    <label className="formError">{dateError}</label> 

                    <br />

                    <h4>Enter Customer Details</h4>
                    <label>Enter Customer Id</label>
                    <input type="text" required id="cust_id" name="cust_id" className="form-control mb-3"
                        placeholder="Customer Id" pattern="[0-9]{14}"
                        title="Customer id must contain 14 digits"
                        onChange={getCustomerById} />
                    <label className="formError">{cust_idError}</label>

                    <label >Account Holder Name</label>
                    <input className="form-control-plaintext" type="text" id="acc_name"
                        value={customer.cust_name} disabled />

                    <label >Balance</label>
                    <input className="form-control-plaintext" type="number" id="acc_name"
                        value={customer.balance} disabled />

                    <h4>Enter Beneficiary Details</h4>
                    <label>Enter IFSC Code</label>
                    <input type="text" required id="ifscCode" name="ifscCode" className="form-control mb-3"
                        placeholder="ifscCode Code" pattern="[A-Z0-9]{11}"
                        title="BIC code must contain 11 Characters" onChange={getBankByifscCode} />
                    <label className="formError">{bicError}</label>

                    <label >Beneficiary Bank Name</label>
                    <input type="text" className="form-control-plaintext" id="bank_name"
                        value={reciever.bankName} disabled />

                    <label>Enter Name</label>
                    <input type="text" required id="name" name="name" className="form-control mb-3"
                        placeholder="name" onChange={evt=>setTransaction({...transaction,beneficiaryName:evt.target.value})} />

                    <button className="btn btn-primary" type="button" onClick={nameValidation}>Check Beneficiary</button>
                    <label className="formError">{nameError}</label>
                    <br />
                    <br />

                    <label>Enter Account Number</label>
                    <input type="text" required id="ac num" name="ac num" className="form-control mb-3"
                        placeholder="account number" onChange={evt=>setTransaction({...transaction,beneficiaryAccountNumber:evt.target.value})}/>
                    <label className="formError">{accNoError}</label>

                    <label>Enter Amount</label>
                    <input type="number" required id="amount" name="amount" className="form-control mb-3"
                        placeholder="amount" onChange={evt=>setTransaction({...transaction,amount:evt.target.value})}/>
                    <label className="formError">{amountError}</label>

                    <label>Select Message Code</label>
                    <select className="form-select form-select-sm" id="messagecode" aria-label=".form-select-lg example"
                    onChange={evt=>setTransaction({...transaction,message:evt.target.value})}>
                        <option value="select">-select-</option>
                        <option value="beneficiary customer must be paid by cheque only.">CHQB</option>
                        <option value="Paymnent is made in settlement for a trade">CORT</option>
                        <option value="Payment between two companies that belongs to the same group.">INTC</option>
                        <option value="Beneficiary customer or claimant will call upon identification.">HOLD</option>
                        <option value="Please advise the intermediary institution by phone.">PHOB</option>
                        <option value="Please advise the intermediary by phone.">PHOI</option>
                        <option value="Paymnents has a related e-Payments reference">REPA</option>
                        <option value="Payment must be executed with same day value to the">SDVA</option>
                    </select>
                    <label className="formError">{messageError}</label>

                    <br />
                    <br />

                    <button className="btn btn-success" type="submit" onClick={addTransaction}>Submit</button>
                    
                </div>
            </form>
        </div>
    
    if(submit==="true")
    return( <div><TransactionSummary transactionError={transactionError} submitHandler={submitHandler} transaction={transaction}/></div>);

}
export default PaymentsInterface;