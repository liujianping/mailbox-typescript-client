export declare class Mailbox {
    static _instance: Mailbox;
    static get instance(): Mailbox;
    static baseURL: string;
    static accessKey: string;
    private api;
    private token;
    private expire_at;
    constructor();
    signIn(address: string, password: string): Promise<boolean>;
    refresh(): Promise<boolean>;
    aliases(address: string): Promise<string[]>;
    aliasCreate(address: string): Promise<string[]>;
    aliasRemove(address: string, force?: boolean): Promise<string[]>;
    aliasInfo(address: string): Promise<Folder>;
    aliasFolders(address: string): Promise<Folder[]>;
    folderList(categories: Category[], regex: string): Promise<Folder[]>;
    folderInfo(id: number): Promise<Folder>;
    folderClean(id: number): Promise<number>;
    folderCreate(name: string, path: string): Promise<number>;
    folderRemove(id: number, force?: boolean): Promise<number>;
    folderRename(id: number, name: string): Promise<number>;
    folderRepath(id: number, path: string): Promise<number>;
    folderMessages(folderId: number, offset: number, limit: number, flags: Flag[], fields: string[]): Promise<any>;
    folderThreads(folderId: number, offset: number, limit: number): Promise<any>;
    flagSet(uid: number, flags: [Flag]): Promise<number>;
    flagAppend(uid: number, flags: [Flag]): Promise<number>;
    flagRemove(uid: number, flags: [Flag]): Promise<number>;
    MessageInfo(uid: number): Promise<import("axios").AxiosResponse<any, any>>;
    MessageSection(uid: number, section: string): Promise<import("axios").AxiosResponse<any, any>>;
    MessageRemove(uid: number): Promise<number>;
    MessageMove(uid: number, folder_id: number): Promise<number>;
    MessageSend(uid: number): Promise<number>;
    MessageAppend(): Promise<number>;
    threadMessages(folderId: number, offset: number, limit: number): Promise<any>;
}
export declare const enum Category {
    AliasFolder = "alias",
    InboxFolder = "inbox",
    DraftsFolder = "drafts",
    SentFolder = "sent",
    TrashFolder = "trash",
    SpamFolder = "spam",
    CustomFolder = "folder"
}
export declare const enum Flag {
    Recent = "\\Recent",
    Seen = "\\Seen",
    Answered = "\\Answered",
    Flagged = "\\Flagged",
    Deleted = "\\Deleted",
    Draft = "\\Draft",
    Sent = "\\Sent"
}
export interface Folder {
    id: number;
    name: string;
    path: string;
    category: Category;
    unseen: number;
    total: number;
}
export interface Message {
    uid: number;
    size?: number;
    sender_name?: string;
    sender_address?: string;
    recipient_address?: string;
    subject?: string;
    flags?: Flag[];
    date?: string;
}
