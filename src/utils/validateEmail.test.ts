import { validateEmail } from "./validateEmail";

describe("validateEmail", () => {
  const cases : any[] = [
    ['tuanvdtd@gmail.com', true],
    ['tuanvdtd@gmail', false],
    ['tuanvdtd', false],
    ['tuanvdtd@', false],
    ['@gmail.com', false],
    ['tuanvdtd@gmail..com', false],
  ]

  it.each(cases)('%p ===> %p', (email, expected) => {
    expect(validateEmail(email)).toBe(expected)
  })

})