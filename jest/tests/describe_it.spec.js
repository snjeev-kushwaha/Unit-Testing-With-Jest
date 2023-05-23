beforeAll(() => {
    console.log("BeforeAll")
})

afterAll(() => {
    console.log("After all")
})

beforeEach(() => {
    console.log("Before Each")
})

afterEach(() => {
    console.log("After Each")
})

describe('Auth', () => {
    it('test1', () => { });
    it('test2', () => { });
})

describe('Products', () => {
    it('test1', () => { });
    it('test2', () => { });
})