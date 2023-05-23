test("mockImplimentation", () => {
  const mockFn = jest
    .fn(() => "default")
    .mockImplementation(() => "First Call")
    .mockImplementation(() => "Second Call");

  const res1 = mockFn();
  const res2 = mockFn();

//   console.log(res1)
//   console.log(res2)
});


test("mockImplimentationOnce", () => {
  const mockFn = jest
    .fn(() => "default")
    .mockImplementationOnce(() => "First Call")
    // .mockImplementation(() => "Second Call");

  const res1 = mockFn();
  const res2 = mockFn();

  console.log(res1)
  console.log(res2)
});
