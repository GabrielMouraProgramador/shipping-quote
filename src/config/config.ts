import "dotenv/config";

export const $config = {
  port: process.env.PORT || "3000",
  databaseUrl: process.env.DATABASE_URL || "",
  secretKey: process.env.SECRET_KEY || "",

  // SSW
  SSWcod: process.env.SSWcod,
  SSWuser: process.env.SSWuser,
  SSWpassword: process.env.SSWpassword,
  SSWcnpj: process.env.SSWcnpj,
};
