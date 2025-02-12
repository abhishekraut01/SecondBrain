import Zod from 'zod';

export const requestResetPasswordSchema = Zod.object({
  username: Zod.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .optional(),
  email: Zod.string()
    .email('Invalid email format')
    .max(50, 'Email cannot exceed 50 characters'),
});

export const ResetPasswordSchema = Zod.object({
  password: Zod.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
});

export const signUpvalidationSchema = Zod.object({
  username: Zod.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters'),
  email: Zod.string()
    .email('Invalid email format')
    .max(50, 'Email cannot exceed 50 characters'),
  password: Zod.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
});

export const loginValidationSchema = Zod.object({
  email: Zod.string()
    .email('Invalid email format')
    .max(50, 'Email cannot exceed 50 characters'),
  password: Zod.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters'),
});

export const createContentSchema = Zod.object({
  link: Zod.string()
    .url("Invalid URL format")
    .trim(),
    
  title: Zod.string()
    .min(3, "Title should be more than three characters long")
    .max(100, "Title should not exceed 100 characters")
    .trim(),

  type: Zod.enum(["article", "video", "blog", "other"], {
    errorMap: () => ({ message: "Type must be one of: article, video, blog, other" }),
  }),

  description: Zod.string()
    .max(500, "Description should not exceed 500 characters")
    .trim()
    .optional(),

  tags: Zod.array(Zod.string().trim()).optional(), // Expecting an array of tag strings
});

export const updateContentSchema = createContentSchema.partial();

export const createTagSchema = Zod.object({
  title: Zod.string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 20 characters')
});


export const updateUserProfileSchema = Zod.object({
  username: Zod.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .optional(),
  email: Zod.string()
    .email('Invalid email format')
    .max(50, 'Email cannot exceed 50 characters')
    .optional()
});