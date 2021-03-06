import { containsData } from '../containsData'

describe('containsData', () => {
  it('returns false for an empty object', () => {
    const x = {}
    expect(containsData(x)).toEqual(false)
  })

  it('returns false for an empty list', () => {
    const x = []
    expect(containsData(x)).toEqual(false)
  })

  it('returns false for an empty string', () => {
    const x = ''
    expect(containsData(x)).toEqual(false)
  })

  it('returns false for an object with empty things in it', () => {
    const x = {
      a: { aa: '', aaa: {} },
      b: '',
      c: ['', {}, { a: [] }],
    }
    expect(containsData(x)).toEqual(false)
  })

  it('returns true for a non-empty string', () => {
    const x = 'hi'
    expect(containsData(x)).toEqual(true)
  })

  it('returns true for numbers', () => {
    expect(containsData(3.4)).toEqual(true)
    expect(containsData(0)).toEqual(true)
  })

  it('returns true for boolean', () => {
    expect(containsData(true)).toEqual(true)
    expect(containsData(false)).toEqual(true)
  })

  it('returns true for a list that contains things that are non-empty', () => {
    const x = ['a', {}]
    expect(containsData(x)).toEqual(true)
  })

  it('returns true for an object that contains things that are non-empty', () => {
    const x = { a: 'hi', b: '' }
    expect(containsData(x)).toEqual(true)
  })
})
