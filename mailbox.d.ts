export declare class Mailbox {
    static _instance: Mailbox;
    static get instance(): Mailbox;
    static baseURL: string;
    static accessKey: string;
    private api;
    private token;
    private expire_at;
    constructor();
    health(): Promise<boolean>;
    getToken(): string;
    accountExist(): Promise<AccountInfo>;
    dnsrecords(): Promise<DNSSettings>;
    setPass(password: string): Promise<boolean>;
    smtpStatus(): Promise<string>;
    smtpStart(): Promise<boolean>;
    smtpStop(): Promise<boolean>;
    signIn(address: string, password: string): Promise<boolean>;
    refresh(token?: string): Promise<string>;
    signOut(token?: string): Promise<boolean>;
    aliases(address: string): Promise<string[]>;
    aliasCreate(address: string): Promise<string[]>;
    aliasRemove(address: string, force?: boolean): Promise<string[]>;
    aliasInfo(address: string): Promise<Folder>;
    aliasFolders(address: string): Promise<Folder[]>;
    folderTree(): Promise<FolderNode[]>;
    folderList(categories: Category[], regex: string): Promise<Folder[]>;
    folderInfo(id: number): Promise<Folder>;
    folderClean(id: number): Promise<number>;
    folderCreate(name: string, path: string): Promise<number>;
    folderRemove(id: number, force?: boolean): Promise<number>;
    folderRename(id: number, name: string): Promise<number>;
    folderRepath(id: number, path: string): Promise<number>;
    folderMessages(folderId: number, offset: number, limit: number, flags: Flag[], fields: string[]): Promise<FolderMessages>;
    folderThreads(folderId: number, offset: number, limit: number): Promise<FolderThreads>;
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
export interface AccountInfo {
    address: string;
    exist: boolean;
}
export interface DNSRecord {
    domain: string;
    name: string;
    type: string;
    value: string;
    priority?: number;
}
export interface DNSSettings {
    a_records: DNSRecord[];
    mx_records: DNSRecord[];
    txt_records: DNSRecord[];
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
export interface FolderNode {
    id: number;
    parent_id: number;
    name: string;
    path: string;
    category: Category;
    unseen: number;
    total: number;
    children?: FolderNode[];
}
export interface FolderMessages {
    total: number;
    messages: Message[];
}
export interface Message {
    uid: number;
    folder_id: number;
    size?: number;
    md5?: string;
    text?: string;
    html?: string;
    sender_name?: string;
    sender_address?: string;
    recipient_name?: string;
    recipient_address?: string;
    from_name?: string;
    from_address?: string;
    subject?: string;
    message_id?: string;
    flags?: string[];
    inline_count?: number;
    attachment_count?: number;
    date?: string;
    inlines?: string[];
    attachments?: string[];
    json?: string;
}
export interface FolderThreads {
    total: number;
    threads: Thread[];
}
export interface Thread {
    thread_id: number;
    folder_id: number;
    sender_name: string;
    sender_address: string;
    from_name: string;
    from_address: string;
    subject: string;
    message_id?: string;
    date?: string;
    unseen: number;
    has_attachment: boolean;
    total: number;
}
