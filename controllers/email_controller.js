require("dotenv").config()
var nodemailer = require("nodemailer")

const createTransporter = () => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      //   TODO connect Kristen's gmail
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  })

  transporter.verify((err, success) => {
    err ? console.log(err) : console.log(`=== Server is ready to take messages: ${success} ===`)
  })

  return transporter
}

const constructEmailForOwner = (data, isForClient) => {
  let constructedHTML = `${isForClient ? `` : `<h1>You have a new class inquiry!</h1>`}
    <b>Class:</b> ${data.nameOfRequestedClass}<br>
    <b>Name:</b> ${data.firstName} ${data.lastName}<br>
    <b>Email:</b> ${data.email}<br>
    <b>Phone Number:</b> ${data.phoneNumber} (${data.phoneNumberType})<br>
    <b>Number of participants:</b> ${data.participants}<br>
    <b>Class Type:</b> ${data.classType}<br>
    <b>Date/Time (1st choice):</b> ${data.requestedDate} at ${data.requestedTime} ${
    isForClient
      ? ``
      : `${
          data.timezone != "-05:00"
            ? `(in their timezone, that's ${data.localDate} at ${data.localTime})`
            : `(same timezone)`
        }`
  }
    ${
      data.dateTimeFallbackOptions
        ? `${
            data.dateTimeFallbackOptions.secondChoice
              ? `<br><b>Date/Time (2nd choice):</b> ${
                  data.dateTimeFallbackOptions.secondChoice.requestedDate
                } at ${data.dateTimeFallbackOptions.secondChoice.requestedTime} ${
                  isForClient
                    ? ``
                    : `${
                        data.timezone != "-05:00"
                          ? `(in their timezone, that's ${data.dateTimeFallbackOptions.secondChoice.localDate} at ${data.dateTimeFallbackOptions.secondChoice.localTime})`
                          : `(same timezone)`
                      }`
                }`
              : ``
          }
          ${
            data.dateTimeFallbackOptions.thirdChoice
              ? `<br><b>Date/Time (3rd choice):</b> ${
                  data.dateTimeFallbackOptions.thirdChoice.requestedDate
                } at ${data.dateTimeFallbackOptions.thirdChoice.requestedTime} ${
                  isForClient
                    ? ``
                    : `${
                        data.timezone != "-05:00"
                          ? `(in their timezone, that's ${data.dateTimeFallbackOptions.thirdChoice.localDate} at ${data.dateTimeFallbackOptions.thirdChoice.localTime})`
                          : `(same timezone)`
                      }`
                }`
              : ``
          }`
        : ``
    }<br>
    <b>Age Group:</b> ${data.ageGroup}<br>
    <b>Location:</b> ${data.location.locationType}${
    data.location.locationType == "Host Venue" ? `: ${data.location.hostAddress}` : ``
  }<br>
    <b>Is this class a gift?:</b> ${data.giftOption ? "Yes" : "No"}<br>
    ${data.comments != "" ? `<h2>Additional Comments</h2> ${data.comments}` : ``}<br>`

  return constructedHTML
}

const constructEmailForClient = data => {
  // TODO make is better
  // let constructedHTML = `Thank you for your intrest in ${data.nameOfRequestedClass}. <br>
  // We will reach out to you at this email address in the next few business days.`

  let constructedHTML = `Hello ${data.firstName} ${data.lastName},<br> 
  <br>
  Thank you for requesting ${data.nameOfRequestedClass}. Here is the information you submitted:
  <br><br>
  ${constructEmailForOwner(data, true)}
  <br>
  We are reaching out to our teachers to check their availability. You should expect to hear from us within the next 1-2 business days.
  <br><br>
  In the meantime, if you have any questions or additional comments, or any of the above information needs to be updated, you can email us at kristen@theeclecticchicboutique.com, of call/text us at 862-221-0644 during normal business hours.
  <br><br>
  <b>Kristen Zachares</b><br>
  Owner<br>
  862-221-0644<br>
  Kristen@TheEclecticChicBoutique.com<br>
  <br>
  <b>The Eclectic Chic Boutique</b><br>
  547 Bloomfield Ave<br>
  Montclair, NJ, 07042`

  return constructedHTML
}

const emailConfirmationToClient = (req, res) => {
  let transporter = createTransporter()

  let mailOptions = {
    from: "kristen@theeclecticchicboutique.com",
    to: req.body.email,
    // TODO work with kristen on what she'd like the response to look like
    subject: "🤩 Thank you for submitting a class Request",
    html: constructEmailForClient(req.body),
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json("Error " + err)
    } else {
      res.json("Email sent successfully")
    }
  })
}

const emailInquiryToOwner = (req, res) => {
  // res.json(constructEmailForOwner(req.body))
  let transporter = createTransporter()

  let mailOptions = {
    from: process.env.EMAIL,
    // TODO send this to kristen's email
    to: "kristen@theeclecticchicboutique.com",
    subject: "New Class Request",
    html: constructEmailForOwner(req.body, false),
  }

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json("Error " + err)
    } else {
      res.json("Email sent successfully")
    }
  })
}

module.exports = {
  emailConfirmationToClient,
  emailInquiryToOwner,
}
