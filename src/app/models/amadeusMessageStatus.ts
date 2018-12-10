export interface AmadeusMessageStatus {
    amadeusId: string;
    fromPhoneNumber: string;
    phone_num_clean: string;
    status: string;
    textMessageBody: string;
    timestamp: number;
    toPhoneNumber: string;
}