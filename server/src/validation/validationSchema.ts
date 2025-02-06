import Zod from 'zod'

export const resetPasswordSchema = Zod.object({
    username: Zod.string()
      .min(3, 'Username must be at least 3 characters')
      .max(20, 'Username cannot exceed 20 characters').optional(),
    email: Zod.string()
      .email('Invalid email format')
      .max(50, 'Email cannot exceed 50 characters'),
  });