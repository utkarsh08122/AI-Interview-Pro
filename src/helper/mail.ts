import { User } from "@/lib/model/user.Schema";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

export const sendEmail = async ({ email, userId }: any) => {
  try {
    const hashedPassword = uuidv4();

    await User.findByIdAndUpdate(userId, {
      $set: {
        varifytoken: hashedPassword,
        varifyTokenExpiryy: Date.now() + 3600000,
      },
    });
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "1a9712e322aa4f",
        pass: "0502be9c9320d6",
      },
    });

    // async..await is not allowed in global scope, must use a wrapper

    // send mail with defined transport object
    const info = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<b>${process.env.NEXT_PUBLIC_BASE_URL}/varifytoken?token=${hashedPassword}</b>
      
      <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Inline styles */
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      .header img {
        width: 150px;
        height: auto;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #ffffff;
        background-color: #4f46e5; /* Tailwind's indigo-600 */
        border-radius: 5px;
        text-decoration: none;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #6b7280; /* Tailwind's gray-500 */
        padding-top: 20px;
      }
    </style>
  </head>
  <body>
    <div
      style="
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      "
    >
      <div style="text-align: center; padding-bottom: 20px">
        <img
          src="https://example.com/logo.png"
          alt="Company Logo"
          style="width: 150px; height: auto; display: block; margin: 0 auto"
        />
      </div>
      <div style="color: #333; font-size: 16px; line-height: 1.5">
        <p>Hi ${email},</p>
        <p>
          Thank you for registering with us. To complete your registration,
          please verify your email address by clicking the button below:
        </p>
        <a
          href="${process.env.NEXT_PUBLIC_BASE_URL}/varifytoken?token=${hashedPassword}"
          style="
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            color: #ffffff;
            background-color: #4f46e5;
            border-radius: 5px;
            text-decoration: none;
          "
          >Verify Email</a
        >
      </div>
      <div
        style="
          text-align: center;
          font-size: 12px;
          color: #6b7280;
          padding-top: 20px;
        "
      >
      </div>
    </div>
  </body>
</html>      
      `,
    };

    const mailRespons = await transport.sendMail(info);
    return mailRespons;
  } catch (e) {
    console.log(e);
  }
};
