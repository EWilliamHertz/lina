import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Neon requires a direct (non-pooled) connection for schema pushes
    url: env("DIRECT_URL") || env("DATABASE_URL"),
  },
});