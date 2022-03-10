import { menuIcon } from '@/presentation/view'

describe('MenuIcon', () => {
  it('should add correct className when it is passed', () => {
    const sut = menuIcon('any-class')

    expect(sut.querySelector('ignem-wrapper')?.className).toBe('any-class')
  })

  it('should not add correct class when it is not passed', () => {
    const sut = menuIcon()

    expect(sut.querySelector('ignem-wrapper')?.className).toBe('')
  })
})
