import nodemailer from "nodemailer";
import path from "path";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "templates"),
};

transport.use("compile", hbs(handlebarOption));

export const mailTemplateOptions = (
  to: string | undefined,
  subject: string,
  template: string,
  context: any
) => {
  return {
    from: "no-repply@meubairro.com.br",
    to,
    subject,
    template,
    context,
  };
};
