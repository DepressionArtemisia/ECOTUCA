import { demoSessionKey, getDefaultDemoUser } from "@/lib/demo/demo-session";
import { demoUsers } from "@/lib/mock-data/ecotuca";
import type { DemoUser } from "@/types/domain";

export function readJsonStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJsonStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDemoUserByEmail(email: string) {
  return demoUsers.find((user) => user.email.toLowerCase() === email.toLowerCase());
}

export function getStoredDemoUser(): DemoUser {
  return readJsonStorage<DemoUser>(demoSessionKey, getDefaultDemoUser());
}

export function setStoredDemoUser(user: DemoUser) {
  writeJsonStorage(demoSessionKey, user);
}

export function clearStoredDemoUser() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(demoSessionKey);
}
