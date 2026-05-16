export const USERS = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
  locked: { username: 'locked_out_user', password: 'secret_sauce' },
  problem: { username: 'problem_user', password: 'secret_sauce' },
  performance: { username: 'performance_glitch_user', password: 'secret_sauce' },
} as const;

export const URLS = {
  inventory: /.*inventory\.html/,
  cart: /.*cart\.html/,
  checkoutStep1: /.*checkout-step-one\.html/,
  checkoutStep2: /.*checkout-step-two\.html/,
  checkoutComplete: /.*checkout-complete\.html/,
} as const;

export const SHIPPING = {
  valid: { firstName: 'John', lastName: 'Doe', postalCode: '10001' },
} as const;

export const SORT_OPTIONS = {
  nameAZ: 'az',
  nameZA: 'za',
  priceLowHigh: 'lohi',
  priceHighLow: 'hilo',
} as const;
