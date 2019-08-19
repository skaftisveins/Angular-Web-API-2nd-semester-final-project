export interface Comment {
    Id?: number;
    PosterId?: string;
    Username?: string;
    CardId?: number;
    Message: string;
    isFlagged?: boolean;
    Visible?: boolean;
    Created?: Date;
    Updated?: Date;

}
