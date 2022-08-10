export const config = () => ({
  port: Number(process.env.PORT),
  user: process.env.MONGO_USERNAME,
  password: process.env.MONGO_PASSWORD,
  cluster: process.env.MONGO_CLUSTERNAME,
  db_name: process.env.MONGO_DBNAME,

  get uri() {
    return `mongodb+srv://${this.user}:${this.password}@e-hiring.5labgq2.mongodb.net/TalentPool?retryWrites=true&w=majority`;
  },
});
