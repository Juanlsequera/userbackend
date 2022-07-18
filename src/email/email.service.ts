import { BadRequestException, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import EmailDto from './dtos/email.dto';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(emailDto: EmailDto) {
    try {
      const { email } = emailDto;
      const url = `http://localhost:8080/email/recoverPassword/${email}`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Recovered Password',
        html: `
        <p>Hi, Please click below to recovered password</p>
        <p>
        <a href='${url}'>Recovered Password</a>
        </p>
        <p>If you did not request this email you can safely ignore it.</p>`,
      });
      return 'OK';
    } catch (e) {
      throw new BadRequestException(JSON.stringify(e));
    }
  }

  //   async recoverPassword(recoveredPasswordDto: RecoveredPasswordDto) {
  //     return recoveredPasswordDto;
  //   }
}
