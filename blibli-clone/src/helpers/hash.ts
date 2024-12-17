import bcrypt from "bcryptjs";
const hashPassword = (password: string) => {
  return bcrypt.hashSync(password);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPassword, comparePassword };
