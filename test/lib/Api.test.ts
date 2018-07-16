import {TestFixture, AsyncTest, Expect} from "alsatian";

@TestFixture("REST API")
export class ApiTest {
	@AsyncTest("test template")
	public async asyncTest() {
		Expect(1).toBe(1);
	}
}
