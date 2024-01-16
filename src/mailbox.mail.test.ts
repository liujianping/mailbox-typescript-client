import { expect, test} from '@jest/globals';
import { Mailbox } from ".";

beforeAll(async () => {
    console.log("beforeAll")
    Mailbox.baseURL = "http://localhost:8080";
    const rs = await Mailbox.instance.signIn("i@example.com", "hello789122");
    expect(rs).toBe(true);  
});
  
afterAll(() => {
    console.log("afterAll")
});


test('folder list', async () => {
    const rs = await Mailbox.instance.folderList([], "*");
    expect(rs.length).toBeGreaterThanOrEqual(5);  
})
