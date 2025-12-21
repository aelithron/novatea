import { boolean, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blog", {
  path: text().primaryKey(),
  title: text().notNull(),
  blurb: text().notNull(),
  body: text().notNull(),
  publishedAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  published: boolean().notNull().default(true)
});
export const projectTable = pgTable("projects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  description: text().notNull(),
  spotlighted: boolean().notNull(),
  code: text().notNull(),
  link: text()
});