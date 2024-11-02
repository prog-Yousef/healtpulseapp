import { Phone } from "lucide-react";
import { z } from "zod";
//for validation


 export const UserFormValidation = z.object({
    name: z.string()
    .min(2, "name must be at least 2 characters.",)
    .max(50,"name must be at most 50 characters.",),
    email: z.string().email("Invalid email address"),
    phone: z.string().refine((phone) => /^\+?[1-9]\d{1,14}$/.test(phone), 'Invalid phone number')
        
    
    
  })