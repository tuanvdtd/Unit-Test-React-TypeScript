// ..com cũng tính là false vì có 2 dấu chấm liên tiếp
export const validateEmail = (email: string) => !email.includes('..') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
