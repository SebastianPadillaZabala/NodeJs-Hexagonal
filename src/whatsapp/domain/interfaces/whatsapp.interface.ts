export interface IWhatsAppClient {
    sendMessage(to: string, message: string): Promise<any>;
    sendMessageWithImage(to: string, message: string, image: string): Promise<any>;
}
