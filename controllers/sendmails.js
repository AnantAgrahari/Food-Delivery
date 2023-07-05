const  transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"anant2113012@akgec.ac.in",
        password:"bhvhgfbb"
    },
})
const mailoptions={
    from:"anant2113012@akgec.ac.in",
    to:"aditya2113090@akgec.ac.in",
    subject:"verify your email",
    html:"your OTP for verification is <b>$</b>.this code will expire in an <b>1 hour</b>",
}