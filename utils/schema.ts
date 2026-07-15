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
export const guestbookTable = pgTable("guestbook", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text(),
  url: text(),
  body: text().notNull(),
  createdAt: timestamp({ mode: "date" }).notNull().defaultNow(),
  visible: boolean().notNull().default(false)
});