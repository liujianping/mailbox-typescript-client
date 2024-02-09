import { expect, test} from '@jest/globals';
import { Mailbox } from ".";

beforeAll(() => {
    console.log("beforeAll")
    Mailbox.baseURL = "http://localhost:8080";
});
  
afterAll(() => {
    console.log("afterAll")
});


test('health', () => {
    expect(Mailbox.instance.health()).resolves.toBe(true);
})

test('set pass', async () => {   
    const rs1 = await Mailbox.instance.accountExist();
    if (rs1.exist === false) {
        const rs2 = await Mailbox.instance.setPass("abcd123456");  
        expect(rs2).toBe(true); 
    } else {
        expect(rs1.exist).toBe(true); 
    }           
})

test('dns settings', async () => {
    const rs = await Mailbox.instance.dnsrecords();
    expect(rs.a_records.length).toBeGreaterThanOrEqual(1);
    expect(rs.mx_records.length).toBeGreaterThanOrEqual(1);
    expect(rs.txt_records.length).toBeGreaterThanOrEqual(1);  
})

test('sign in', async () => {
    const rs = await Mailbox.instance.signIn("i@example.com", "abcd123456");
    expect(rs).toBe(true);  
    const tk = Mailbox.instance.getToken();
    expect(tk).not.toBeNull();      
})

test('refresh', async () => {   
    const rs = await Mailbox.instance.refresh();      
    expect(rs).not.toBeNull();    
})

test('smtp ctrl', async () => {   
    const rs = await Mailbox.instance.smtpStatus();  
    if (rs === "started") {
        const rs1 = await Mailbox.instance.smtpStop();
        expect(rs1).toBe(true);    
    } else {
        const rs2 = await Mailbox.instance.smtpStart();
        expect(rs2).toBe(true);    
    } 
})

test('folder list', async () => {
    const rs = await Mailbox.instance.folderList([], "*");
    expect(rs.length).toBeGreaterThanOrEqual(5);  
})

test('folder tree', async () => {
    const rs = await Mailbox.instance.folderTree();
    expect(rs.length).toBeGreaterThanOrEqual(5);  
})
