import axios, { AxiosInstance} from 'axios';

export class Mailbox {
    static _instance: Mailbox;
    static get instance(): Mailbox {
        if (!Mailbox._instance) {
            Mailbox._instance = new Mailbox();
        }
        return Mailbox._instance;
    }

    public static baseURL: string;
    public static accessKey: string;
    private api: AxiosInstance;
    private token: string;
    private expire_at: number;
    constructor() {
        this.token = '';
        this.expire_at = 0;
        this.api = axios.create({
            baseURL: Mailbox.baseURL,            
        })
        this.api.defaults.headers.post['Content-Type'] = 'application/json';
        //TODO auto refresh
        this.api.interceptors.response.use(response => response, (err) => {
            if (err.response.status >= 500) {
                return Promise.reject(err)
            }
            return Promise.reject({
                code: err.response.data.code, 
                message: err.response.data.message,
            })
        })
    }

    public async health(): Promise<boolean> {
        const rs = await this.api.get("/health")
        return rs.status === 200
    }

    public getToken(): string {
        return this.token
    }

    public async accountExist(): Promise<AccountInfo> {
        const rs = await this.api.get("/api/v1/setup/account/exist")
        return rs.data
    }

    public async dnsrecords(): Promise<DNSSettings> {
        const rs = await this.api.get("/api/v1/setup/dns/settings")        
        return rs.data
    }

    public async setPass(password: string): Promise<boolean> {
        const rs = await this.api.post("/api/v1/setup/account/setpass", 
            {
                password: password,
            })
        return rs.data.success
    }

    public async smtpStatus(): Promise<string> {
        const rs = await this.api.get("/api/v1/service/smtp/status")
        return rs.data.status
    }

    public async smtpStart(): Promise<boolean> {
        const rs = await this.api.get("/api/v1/service/smtp/start")
        return rs.data.status === "started"        
    }

    public async smtpStop(): Promise<boolean> {
        const rs = await this.api.get("/api/v1/service/smtp/stop")
        return rs.data.status === "stopped"        
    }

    public async signIn(address: string, password: string): Promise<boolean> {
        const rs = await this.api.post("/api/v1/auth/signin",
            {
                email: address,
                password: password,
            }
        )       
        this.expire_at = rs.data.expire_at
        this.token = rs.data.token
        this.api.defaults.headers.common['Authorization'] = rs.data.token                
        return true;          
    }

    public async refresh(token?: string): Promise<string> {
        if (token) {
            this.token = token
        }
        const rs = await this.api.post("/api/v1/auth/refresh",
            {
                token: this.token,
            }
        )   
        this.expire_at = rs.data.expire_at
        this.token = rs.data.token     
        this.api.defaults.headers.common['Authorization'] = rs.data.token           
        return rs.data.token
    }

    public async signOut(token?: string): Promise<boolean> {
        if (token) {
            this.token = token
        }
        const rs = await this.api.post("/api/v1/auth/signout",
            {
                token: this.token,                
            }
        )   
        this.expire_at = rs.data.expire_at
        this.token = ""     
        this.api.defaults.headers.common['Authorization'] = rs.data.token           
        return true
    }

    public async aliases(address: string): Promise<string[]> {
        const rs = await this.api.post("/api/v1/mailbox/alias/list",
            {
                address: address
            },
        )
        return rs.data.aliases
    }

    public async aliasCreate(address: string): Promise<string[]> {
        const rs = await this.api.post("/api/v1/mailbox/alias/create",
            {
                address: address
            },
        )
        return rs.data.aliases
    }

    public async aliasRemove(address: string, force: boolean = false): Promise<string[]> {
        const rs = await this.api.post("/api/v1/mailbox/alias/remove",
            {
                address: address,
                force: force,
            },
        )
        return rs.data.aliases
    }

    public async aliasInfo(address: string): Promise<Folder> {
        return this.api.get(`/api/v1/mailbox/alias/${address}`)
    }

    public async aliasFolders(address: string): Promise<Folder[]> {
        const rs = await this.api.post("/api/v1/mailbox/alias/folders",
            {
                address: address
            },
        )
        return rs.data.folders
    }

    public async folderTree(): Promise<FolderNode[]> {
        const rs = await this.api.get(`/api/v1/mailbox/folder/tree`)
        return rs.data.folders
    }

    public async folderList(categories: Category[], regex: string): Promise<Folder[]> {
        const rs = await this.api.post("/api/v1/mailbox/folder/list",
            {
                categories: categories,
                regex: regex,
            },
        )
        return rs.data.folders
    }

    public async folderInfo(id: number): Promise<Folder> {
        return this.api.get(`/api/v1/mailbox/folder/${id}`)
    }

    public async folderClean(id: number): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/folder/clean",
            {
                id: id,
            },
        )
        return rs.data.effected
    }

    public async folderCreate(name: string, path: string): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/folder/create",
            {
                name: name,
                path: path,
            },
        )
        return rs.data.effected
    }

    public async folderRemove(id: number, force: boolean = false): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/folder/remove",
            {
                id: id,
                force: force,
            },
        )
        return rs.data.effected
    }

    public async folderRename(id: number, name: string): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/folder/rename",
            {
                id: id,
                name: name,
            },
        )
        return rs.data.effected
    }
    
    public async folderRepath(id: number, path: string): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/folder/repath",
            {
                id: id,
                repath: path,
            },
        )
        return rs.data.effected
    }

    public async folderMessages(folderId: number, offset: number, limit: number, flags: Flag[], fields: string[]) {
        const rs = await this.api.post("/api/v1/mailbox/folder/messages",
            {
                folder_id: folderId,
                offset: offset,
                limit: limit,
                flags: flags,
                fields: fields,
            },
        )
        return rs.data
    }

    public async folderThreads(folderId: number, offset: number, limit: number) {
        const rs = await this.api.post("/api/v1/mailbox/folder/messages",
            {
                folder_id: folderId,
                offset: offset,
                limit: limit,
            },
        )
        return rs.data
    }

    public async flagSet(uid: number, flags: [Flag]): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/flag/set",
            {
                uid: uid,
                flags: flags,
            },
        )
        return rs.data.effected
    }

    public async flagAppend(uid: number, flags: [Flag]): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/flag/append",
            {
                uid: uid,
                flags: flags,
            },
        )
        return rs.data.effected
    }

    public async flagRemove(uid: number, flags: [Flag]): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/flag/remove",
            {
                uid: uid,
                flags: flags,
            },
        )
        return rs.data.effected
    }

    public async MessageInfo(uid: number) {
        return this.api.get(`/api/v1/mailbox/message/${uid}`)
    }
    
    public async MessageSection(uid: number, section: string) {
        return this.api.get(`/api/v1/mailbox/message/${uid}/${section}`)
    }

    public async MessageRemove(uid: number): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/message/remove",
            {
                uid: uid,
            },
        )
        return rs.data.effected
    }

    public async MessageMove(uid: number, folder_id: number): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/message/move",
            {
                uid: uid,
                folder_id: folder_id,
            },
        )
        return rs.data.effected
    }

    public async MessageSend(uid: number): Promise<number> {
        const rs = await this.api.post("/api/v1/mailbox/message/send",
            {
                uid: uid,
            },
        )
        return rs.data.effected
    }

    //TODO
    public async MessageAppend(): Promise<number> {
        return 1
    }

    public async threadMessages(folderId: number, offset: number, limit: number) {
        const rs = await this.api.post("/api/v1/mailbox/thread/messages",
            {
                folder_id: folderId,
                offset: offset,
                limit: limit,
            },
        )
        return rs.data
    }
}

export interface AccountInfo {
    address: string;
    exist: boolean;
}


// type DNSRecord struct {
// 	Domain   string `json:"domain,omitempty"`
// 	Name     string `json:"name"`
// 	Type     string `json:"type"`
// 	Value    string `json:"value"`
// 	Priority int    `json:"priority,omitempty"`
// }
export interface DNSRecord {
    domain: string;
    name: string;
    type: string;
    value: string;
    priority?: number;
}

export interface DNSSettings {
    a_records: DNSRecord[];
    // AAAA: DNSRecord[];
    // CNAME: DNSRecord[];
    mx_records: DNSRecord[];
    txt_records: DNSRecord[];
    // SRV: DNSRecord[];
}

export const enum Category {
    AliasFolder = "alias",
    InboxFolder = "inbox",
    DraftsFolder = "drafts",
    SentFolder = "sent",
    TrashFolder = "trash",
    SpamFolder = "spam",
    CustomFolder = "folder",
}

export const enum Flag {
    Recent = "\\Recent",
    Seen = "\\Seen",
    Answered = "\\Answered",
    Flagged = "\\Flagged",
    Deleted = "\\Deleted",
    Draft = "\\Draft",
    Sent = "\\Sent",
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