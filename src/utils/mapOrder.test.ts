import { mapOrder } from "./mapOrder"

describe('Unit Test: mapOrder', () => {
  it('should return [] if original Array is null', () => {
    expect(mapOrder(null as any, ['a', 'b', 'c'], 'key')).toEqual([])
  })

  it('should return [] if order Array is null', () => {
    expect(mapOrder([{ key: 'a' }, { key: 'b' }], null as any, 'key')).toEqual([])
  })

  it('should return [] when key is not found', () => {
    expect(mapOrder([{ key: 'a' }, { key: 'b' }], null as any, '')).toEqual([])
  })

  it('should return ordered Array when correct flow and key is found in order Array', () => {
    const originalArray = [
      {
        id: 1,
        name: 'A'
      },
      {
        id: 3,
        name: 'C'
      },
      {
        id: 2,
        name: 'B'
      }
    ]
    const orderArray = [1, 2, 3]
    expect(mapOrder(originalArray, orderArray, 'id')).toEqual([
      {
        id: 1,
        name: 'A'
      },
      {
        id: 2,
        name: 'B'
      },
      {
        id: 3,
        name: 'C'
      }
    ])
  })

  it('should return ordered Array with element that key is not found in order Array at the end of returned Array', () => {
    const originalArray = 
    [
      {
        name: 'Tuan',
        age: 30
      },
      {
        name: 'Huy',
        age: 20
      },
      {
        name: 'Hoang',
        age: 11
      },
      {
        name: 'Trung',
        age: 22
      }
    ]
    const orderArray = [22,11,30]
    const rs = mapOrder(originalArray, orderArray, 'age')
    expect(rs.map(i => i.age)).toEqual([...orderArray, 20]) // 20 is age of Huy, which is not found in order Array, so it will be placed at the end of returned Array
  })

})
