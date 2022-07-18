import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import EmailDto from './dtos/email.dto';
import { EmailService } from './email.service';

@Controller('email')
@ApiTags('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  @ApiResponse({
    status: 201,
    description: 'Email send',
    type: EmailDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Error send email',
  })
  async sendEmail(@Body() emailDto: EmailDto) {
    return this.emailService.sendEmail(emailDto);
  }

  //   @Get('/recoverPassword:id')
  //   async recoverPassword(
  //     @Param('id') emailDto: EmailDto,
  //   ) {
  //     return this.emailService.recoverPassword(emailDto);
  //   }
}
