import { date, json, pgTable, text } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blog", {
  path: text().primaryKey().unique(),
  title: text().notNull(),
  blurb: text().notNull(),
  body: text().notNull(),
  tags: json().$type<string[]>(),
  publishedAt: date().notNull().defaultNow(),
  editedAt: date()
});
