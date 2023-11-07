exports.customerror = (statuscode,message) => {
    console.log("is it called");
    console.log(message);
    let  error = {status:null,message:'',success:false};
    error.status = statuscode;
    error.message = message.toString();
    console.log(error);
    return error;
}