import { Client, LocalAuth, MessageMedia, Message as WAMessage } from 'whatsapp-web.js';
import { IWhatsAppClient } from '../domain/interfaces/whatsapp.interface';
import qrcode from 'qrcode-terminal';
import { InternalServerErrorException } from '../../common/exceptions';

export class WhatsAppClient implements IWhatsAppClient {
    private static instance: WhatsAppClient;
    private client: Client;
    private clientReady: boolean = false;

    private constructor() {
        this.client = new Client({
            puppeteer: {
                headless: true
            },
            authStrategy: new LocalAuth({
                dataPath: 'SebastianTigo'
            }),
        });

        this.client.on('qr', (qr) => {
            qrcode.generate(qr, { small: true });
        });

        this.client.on('ready', () => {
            console.log('WhatsApp Web client is ready!');
            this.clientReady = true;
        });

        this.client.on('authenticated', () => {
            console.log('WhatsApp Web client authenticated!');
        });

        this.client.on('auth_failure', (message) => {
            console.error('Authentication failure:', message);
        });

        this.client.on('disconnected', (reason) => {
            console.log('WhatsApp Web client disconnected:', reason);
            this.clientReady = false;
            this.client.initialize();
        });

        this.client.initialize();
    }

    public static getInstance(): WhatsAppClient {
        if (!WhatsAppClient.instance) {
            WhatsAppClient.instance = new WhatsAppClient();
        }
        return WhatsAppClient.instance;
    }

    private async ensureClientReady(): Promise<void> {
        while (!this.clientReady) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }
    }

    public async sendMessage(to: string, message: string): Promise<any> {
        try {
            await this.ensureClientReady();
            const chatId = `591${to}@c.us`;
            console.log(`Sending message to: ${chatId}`);
            
            await this.client.sendMessage(chatId, message);

            console.log('Message sent successfully');
            return 'Message sent successfully';
        } catch (error) {
            console.error('Error sending message:', error);
            throw new InternalServerErrorException('Error sending message');
        }
    }

    public async sendMessageWithImage(to: string, message: string, image: string): Promise<any> {
        try {
            await this.ensureClientReady();
            const chatId = `591${to}@c.us`;
            console.log(`Sending message with image to: ${chatId}`);

            const media = MessageMedia.fromFilePath(image);

            await this.client.sendMessage(chatId, media, { caption: message });
            console.log('Message with image sent successfully');
            return 'Message with image sent successfully';
        } catch (error) {
            console.error('Error sending message with image:', error);
            throw new InternalServerErrorException('Error sending message with image');
        }
    }
}
