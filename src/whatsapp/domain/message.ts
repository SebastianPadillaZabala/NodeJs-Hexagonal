export class Message {
    from: string;
    to: string;
    content: string;
    timestamp: Date;

    constructor(from: string, to: string, content: string, timestamp: Date = new Date()) {
        this.from = from;
        this.to = to;
        this.content = content;
        this.timestamp = timestamp;
    }
}
