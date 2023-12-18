import express from 'express';

export const checkNIC = (req,res)=>{
    const nic = req.body.nic;
    if(nic)
    {
        const NICstatus = nicValidate(nic);
        if(NICstatus){
            if(nic.length==10){
               return res.status(200).json(oldNIC(nic));
            }
            else{
                return res.status(200).json(newNIC(nic));
            }
        }
        else{
            return res.status(400).json({message:"NIC is not valid!!",length:nic.length,nic,NICstatus});
        }
    }
    else{
        return res.status(400).json({message:"NIC is empty!!"});
    }
}
const nicValidate = (nic)=>{
    const pattern = /^([0-9]{9}[xXvV]|[0-9]{12})$/;
    return pattern.test(nic);
} 

const oldNIC = (nic)=>{
    let year = "19"+nic.substr(0,2);
    let gender = "";
    let nicday ='';
    const month = {
        "January":31,
        "February":60,
        "March":91,
        "April":121,
        "May":152,
        "June":182,
        "July":213,
        "August":244,
        "September":274,
        "October":305,
        "November":335,
        "December":366
    }

    if(parseInt(nic.substr(2,3))<=500){
        gender = "Male";
        nicday = parseInt(nic.substr(2,3));
    }
    else{
        gender = "Female";
        nicday =  parseInt(nic.substr(2,3))-500;
    }

    let previous = '';
    let currentMonth = '';

    for (const [key, value] of Object.entries(month)) {
        if(nicday<value){
            currentMonth = key;
            break;
        }
        previous = value;
    }

    let day = nicday-previous;
    let bday = year+"-"+currentMonth+"-"+day;
   
    
    const data = {Category:"Old NIC",Gender:gender,Birthday:bday}
    return data;
}

const newNIC = (nic)=>{
    let year = nic.substr(0, 4);
    let nicday = "";
    let gender = "";
    const month = {
      January: 31,
      February: 60,
      March: 91,
      April: 121,
      May: 152,
      June: 182,
      July: 213,
      August: 244,
      September: 274,
      October: 305,
      November: 335,
      December: 366,
    };
    if (parseInt(nic.substr(4, 3)) <= 500) {
      gender = "Male";
      nicday = parseInt(nic.substr(4, 3));
    } else {
      gender = "Female";
      nicday = parseInt(nic.substr(4, 3)) - 500;
    }

    let previous = "";
    let currentMonth = "";

    for (const [key, value] of Object.entries(month)) {
      if (nicday < value) {
        currentMonth = key;
        break;
      }
      previous = value;
    }
    let day = nicday - previous;
    let bday = year + "-" + currentMonth + "-" + day;

    const data = {Category:"New NIC",Gender:gender,Birthday:bday}
    return data;
}