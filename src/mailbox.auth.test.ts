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

// test('set pass', async () => {   
//     const rs1 = await Mailbox.instance.accountExist();
//     expect(rs1).toBe(false); 
//     const rs2 = await Mailbox.instance.setPass("hello789122");  
//     expect(rs2).toBe(true);    
// })

test('account exist', async () => {
    const rs = await Mailbox.instance.accountExist();
    expect(rs).toBe(true);    
})

test('sign in', async () => {
    const rs = await Mailbox.instance.signIn("i@example.com", "hello789122");
    expect(rs).toBe(true);  
    const tk = Mailbox.instance.getToken();
    expect(tk).not.toBeNull();      
})

test('refresh', async () => {   
    const rs = await Mailbox.instance.refresh();  
    expect(rs).toBe(true);    
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