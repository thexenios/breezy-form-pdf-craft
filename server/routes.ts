import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertFormResponseSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Form responses routes
  
  // Get all form responses for a user
  app.get("/api/form-responses/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const formResponses = await storage.getFormResponsesByUserId(userId);
      res.json(formResponses);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form responses" });
    }
  });

  // Get a specific form response
  app.get("/api/form-responses/single/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const formResponse = await storage.getFormResponseById(id);
      if (!formResponse) {
        return res.status(404).json({ error: "Form response not found" });
      }
      res.json(formResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch form response" });
    }
  });

  // Create a new form response
  app.post("/api/form-responses", async (req, res) => {
    try {
      const validatedData = insertFormResponseSchema.parse(req.body);
      const formResponse = await storage.createFormResponse(validatedData);
      res.status(201).json(formResponse);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid form data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to create form response" });
    }
  });

  // Update a form response
  app.put("/api/form-responses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const formResponse = await storage.updateFormResponse(id, updates);
      if (!formResponse) {
        return res.status(404).json({ error: "Form response not found" });
      }
      res.json(formResponse);
    } catch (error) {
      res.status(500).json({ error: "Failed to update form response" });
    }
  });

  // Delete a form response
  app.delete("/api/form-responses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await storage.deleteFormResponse(id);
      if (!deleted) {
        return res.status(404).json({ error: "Form response not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete form response" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
