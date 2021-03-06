const Mailgen = require("mailgen");
const sgMail = require("@sendgrid/mail");
const config = require("../config/email.json");

require("dotenv").config();

class EmailService {
  #sender = sgMail;
  #GenerateTemplate = Mailgen;
  constructor(env) {
    switch (env) {
      case "development":
        this.link = config.dev;
        break;
      case "stage":
        this.link = config.stage;
        break;
      case "production":
        this.link = config.prod;
        break;
      default:
        this.link = config.dev;
        break;
    }
  }
  #createTemplate(verificationToken) {
    const mailGenerator = new this.#GenerateTemplate({
      theme: "neopolitan",
      product: {
        name: "Contacts",
        link: this.link,
      },
    });
    const template = {
      body: {
        intro: "Welcome to Contacts!",
        action: {
          instructions: "To get started with Contacts, please click here",
          button: {
            color: "#22BC66", // Optional action button color
            text: "Confirm your account",
            link: `${this.link}/api/users/auth/verify/${verificationToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(template);
  }
  async sendEmail(verificationToken, email) {
    const emailBody = this.#createTemplate(verificationToken);
    this.#sender.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: "elena.panasyuk@gmail.com", // Use the email address or domain you verified above
      subject: "Confirmation of the process of registration",
      html: emailBody,
    };
    //ES6
    await this.#sender.send(msg);
  }
}

module.exports = EmailService;
