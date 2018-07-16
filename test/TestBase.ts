import { AsyncSetupFixture } from "alsatian";

export class TestBase {
	@AsyncSetupFixture
	public async setupFixtureAsync() {
		return new Promise(async (resolve, reject) => {
			resolve();
		});
	}
}
