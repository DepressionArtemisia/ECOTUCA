import { demoUsers } from "@/lib/mock-data/ecotuca";

export const demoSessionKey = "ecotuca-demo-user";

export function getDefaultDemoUser() {
  return demoUsers.find((user) => user.email === "aluno@ecotuca.local") ?? demoUsers[0];
}
