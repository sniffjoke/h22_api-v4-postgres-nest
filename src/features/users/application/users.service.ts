import { Injectable } from '@nestjs/common';
import { EmailConfirmationModel } from '../api/models/input/create-user.dto';
import { SETTINGS } from '../../../core/settings/settings';
import { MailerService } from '@nestjs-modules/mailer';
import { UuidService } from 'nestjs-uuid';
import { add } from 'date-fns';

@Injectable()
export class UsersService {

  constructor(
    private readonly mailService: MailerService,
    private readonly uuidService: UuidService,
  ) {
  }

  // Доменное событие

  public createEmailConfirmation(isConfirm: boolean) {
    const emailConfirmationNotConfirm: EmailConfirmationModel = {
      isConfirm: false,
      confirmationCode: this.uuidService.generate(),
      expirationDate: add(new Date(), {
          hours: 1,
          minutes: 30,
        },
      ).toISOString(),
    };
    const emailConfirmationIsConfirm: EmailConfirmationModel = {
      isConfirm: true,
    };
    return isConfirm ? emailConfirmationIsConfirm : emailConfirmationNotConfirm;
  }

  public async sendActivationEmail(to: string, link: string) {
    await this.mailService.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Активация аккаунта на ' + SETTINGS.PATH.API_URL,
      text: '',
      html:
             `
                 <h1>Thank for your registration</h1>
                 <p>To finish registration please follow the link below:
                     <a href='${link}'>Завершить регистрацию</a>
                 </p>
  
             `,
    });
  }

}
