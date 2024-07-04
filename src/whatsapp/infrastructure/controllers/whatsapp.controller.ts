import { Body, Controller, Example, Get, Post, Route, Tags } from 'tsoa';
import { IResponseMessage } from '../../../common/response.message.interface';
import { WhatsAppClient } from '../whatsapp.client';
import { WhatsAppService } from '../../application/whatsaap.service';
import { RequestBody, RequestBodyImage, exampleRequestBody, exampleRequestBodyImage } from '../../domain/interfaces/request-body.interface';

@Route('/api/whatsapp')
@Tags('WhatsApp')
export class WhatsAppController extends Controller {
  private whatsappService: WhatsAppService;

  constructor() {
    super();
    const whatsappClient = WhatsAppClient.getInstance();
    this.whatsappService = new WhatsAppService(whatsappClient);
  }

  @Post('send-message')
  @Example<RequestBody>(exampleRequestBody)
  public async sendMessage(
    @Body() requestBody: RequestBody
  ): Promise<IResponseMessage> {
    const { to, message } = requestBody;
    return {
      statusCode: 200,
      message: await this.whatsappService.sendMessage(to, message),
    };
  }

  @Post('send-message-with-image')
  @Example<RequestBody>(exampleRequestBodyImage)
  public async sendMessageWithImage(
    @Body() requestBody: RequestBodyImage
  ): Promise<IResponseMessage> {
    const { image, message, to } = requestBody;
    return {
      statusCode: 200,
      message: await this.whatsappService.sendMessageWithImage(to, message, image),
    };
  }
}
