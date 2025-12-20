import { boolean, date, pgTable, text } from "drizzle-orm/pg-core";

export const blogTable = pgTable("blog", {
  path: text().primaryKey().unique(),
  title: text().notNull(),
  blurb: text().notNull(),
  body: text().notNull(),
  publishedAt: date().notNull().defaultNow(),
  published: boolean().notNull().default(true)
});
