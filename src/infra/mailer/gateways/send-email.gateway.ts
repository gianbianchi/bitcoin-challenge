import { MailerSend, Recipient, EmailParams } from 'mailersend';
import {
  MAILER_EMAIL_FROM,
  MAILER_KEY,
  MAILER_NAME_FROM,
} from '../../../shared/constants/constants';

type InputDto = {
  email: string;
  name?: string;
  subject: string;
  text: string;
};
export const sendEmail = async (input: InputDto) => {
  const mailersend = new MailerSend({
    apiKey: MAILER_KEY,
  });

  const recipients = [new Recipient(input.email, input.name)];

  const emailParams = new EmailParams()
    .setFrom({ email: MAILER_EMAIL_FROM, name: MAILER_NAME_FROM })
    .setTo(recipients)
    .setSubject(input.subject)
    .setText(input.text);

  await mailersend.email.send(emailParams);
};
