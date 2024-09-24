const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  ounces: 12,
  flavor: 'grapefruit',
};

describe('toEqual', () => {
  test('have all the same properties with different sort', () => {
    expect(can1).toEqual(can2);
  });
  test('are not equal with different property', () => {
    expect(can1).not.toEqual({ ...can2, differentProperty: 1 });
  });
  test('are not the exact same can', () => {
    expect(can1).not.toBe(can2);
  });

  const part = { ounces: 12 };
  test('have part of the same properties', () => {
    expect(can1).toEqual(expect.objectContaining(part));
  });
});

describe('toContainEqual', () => {
  test('compares with different sort', () => {
    expect([{ a: 'A', b: 'B' }]).toContainEqual({ b: 'B', a: 'A' });
  });

  test('are not the exact when some property missing', () => {
    expect([{ a: 'A', b: 'B' }]).not.toContainEqual({ b: 'B' });
  });
});

describe('arrayContaining', () => {
  it('matches even if expected has only part of elements', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(
      expect.arrayContaining(['Alice', 'Bob'])
    );
  });
  it('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(
      expect.arrayContaining(['Alice', 'Bob'])
    );
  });
});

/*
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn<void, [boolean]>();
  mock(false); //but not null and undefined
  expect(mock).toHaveBeenCalledWith(expect.anything());
  expect(mock).toHaveBeenCalledWith(expect.any(Boolean));
  expect(mock).not.toHaveBeenCalledWith(expect.any(Number));
});
test('map calls its argument with a non-null argument', () => {
  const mock = jest.fn<void, [boolean, number]>();
  mock(false, 123); //but not null and undefined
  expect(mock).toHaveBeenCalledWith(expect.any(Boolean), expect.any(Number));
});
*/
