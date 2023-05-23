test('additon of two numbers', () => {
    expect(2 + 2).toBe(4)
})

test('null', () => {
    const i = null;

    expect.assertions(2)

    expect(i).toBeNull()
    expect(i).toBeDefined()
})

const animals = ["cat", "dog"]

test("Animal array", () => {
    expect(animals).toContain("cat")
    expect(animals).toContain("dog")
})

function getData() {
    throw new Error("not found")
}
test("getData", () => {
    expect(() => getData()).toThrow("not found")
})