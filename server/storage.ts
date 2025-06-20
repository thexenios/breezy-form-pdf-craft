import { users, formResponses, type User, type InsertUser, type FormResponse, type InsertFormResponse } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Form responses methods
  getFormResponsesByUserId(userId: string): Promise<FormResponse[]>;
  getFormResponseById(id: string): Promise<FormResponse | undefined>;
  createFormResponse(formResponse: InsertFormResponse): Promise<FormResponse>;
  updateFormResponse(id: string, formResponse: Partial<InsertFormResponse>): Promise<FormResponse | undefined>;
  deleteFormResponse(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private formResponses: Map<string, FormResponse>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.formResponses = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getFormResponsesByUserId(userId: string): Promise<FormResponse[]> {
    return Array.from(this.formResponses.values()).filter(
      (response) => response.userId === userId
    ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getFormResponseById(id: string): Promise<FormResponse | undefined> {
    return this.formResponses.get(id);
  }

  async createFormResponse(insertFormResponse: InsertFormResponse): Promise<FormResponse> {
    const id = crypto.randomUUID();
    const now = new Date();
    const formResponse: FormResponse = {
      id,
      ...insertFormResponse,
      title: insertFormResponse.title || "Untitled Form",
      completed: insertFormResponse.completed || false,
      createdAt: now,
      updatedAt: now,
    };
    this.formResponses.set(id, formResponse);
    return formResponse;
  }

  async updateFormResponse(id: string, updates: Partial<InsertFormResponse>): Promise<FormResponse | undefined> {
    const existing = this.formResponses.get(id);
    if (!existing) return undefined;

    const updated: FormResponse = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };
    this.formResponses.set(id, updated);
    return updated;
  }

  async deleteFormResponse(id: string): Promise<boolean> {
    return this.formResponses.delete(id);
  }
}

export const storage = new MemStorage();
