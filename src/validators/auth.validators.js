const  {z} = required("zod");

const registerSchema = z.object({
    name: z
    .string()
    .min(2,"Name must be at least 2 character")
    .max(25, "Name cannot exceed 50 character")
    .trim(),

    email: z
    .string()
    .email("Please provide a valid email")
    .trim()
    .tolowerCase(),

    password: z
    .string()
    .min(8,"Password must be 8 characters long")

});

module.export ={

    registerSchema,
};