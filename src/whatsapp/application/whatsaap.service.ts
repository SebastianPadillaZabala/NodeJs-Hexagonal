import { IWhatsAppClient } from '../domain/interfaces/whatsapp.interface';
import { handleError } from '../../common/handle.error';
import { Logger } from 'tslog';

const logger = new Logger();

export class WhatsAppService {
  private whatsappClient: IWhatsAppClient;

  constructor(whatsappClient: IWhatsAppClient) {
    this.whatsappClient = whatsappClient;
  }

  public async sendMessage(to: string, message: string): Promise<any> {
    try {
      return await this.whatsappClient.sendMessage(to, message);
    } catch (error) {
      handleError(error, logger);
    }
  }

  public async sendMessageWithImage(to: string, message: string, image: string): Promise<any> {
    try {
      return await this.whatsappClient.sendMessageWithImage(to, message, image);
    } catch (error) {
      handleError(error, logger);
    }
  }
}
