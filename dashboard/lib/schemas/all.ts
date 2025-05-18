import { z } from 'zod';

export const userSchema = z.object({
  id: z.string().cuid(),
  username: z.string(),
  name: z.string().optional(),
  image: z.string().optional(),
  active: z.boolean().default(true),
  email: z.string().email().optional(),
  role: z.enum(['root', 'admin', 'journalist']),
  phone: z
    .string()
    .regex(/^\d{10,11}$/)
    .optional(),
});

export const doctorSchema = z.object({
  id: z.number(),
  name: z.string(),
  specialty: z.string(),
  state: z.string(),
  crm: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
  visibility: z.boolean(),
  createdAt: z.date(),
  schedules: z.array(
    z.object({
      dayOfWeek: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    })
  ),
});

export const articleSchema = z.object({
  id: z.number(),
  title: z.string(),
  slug: z.string(),
  status: z.enum(['published', 'draft', 'archived']),
  content: z.string().optional(),
  user: z.object({
    name: z.string().optional(),
    username: z.string(),
    role: z.enum(['root', 'admin', 'journalist']),
    image: z.string().optional(),
    createdAt: z.date(),
  }),
});
