import {
    timestamp,
    pgTable,
    text,
    primaryKey,
    integer,
    serial,
    pgEnum,
    uuid,
} from "drizzle-orm/pg-core"
import type { AdapterAccount } from "@auth/core/adapters"


export const roleEnum = pgEnum(
    "role",
    ["gpt", "user"]
);

export const tierEnum = pgEnum(
    "tier",
    ["free", "premium"]
);

export const users = pgTable(
    "user",
    {
        id: text("id").notNull().primaryKey(),
        name: text("name"),
        email: text("email").notNull(),
        emailVerified: timestamp("emailVerified", { mode: "date" }),
        image: text("image"),
        tier: tierEnum("tier").notNull().default("free")
    }
);

export const accounts = pgTable(
    "account",
    {
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: text("type").$type<AdapterAccount["type"]>().notNull(),
        provider: text("provider").notNull(),
        providerAccountId: text("providerAccountId").notNull(),
        refresh_token: text("refresh_token"),
        access_token: text("access_token"),
        expires_at: integer("expires_at"),
        token_type: text("token_type"),
        scope: text("scope"),
        id_token: text("id_token"),
        session_state: text("session_state")
    },
    (account) => ({
        compoundKey: primaryKey(account.provider, account.providerAccountId)
    })
);

export const sessions = pgTable(
    "session",
    {
        sessionToken: text("sessionToken").notNull().primaryKey(),
        userId: text("userId")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        expires: timestamp("expires", { mode: "date" }).notNull()
    }
);

export const verificationTokens = pgTable(
    "verificationToken",
    {
        identifier: text("identifier").notNull(),
        token: text("token").notNull(),
        expires: timestamp("expires", { mode: "date" }).notNull()
    },
    (vt) => ({
        compoundKey: primaryKey(vt.identifier, vt.token)
    })
);

export const documents = pgTable(
    "documents",
    {
        id: uuid("id").defaultRandom().primaryKey().unique().notNull(),
        documentname: text("documentname").notNull(),
        url: text("url").notNull(),
        key: text("key").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
        userid: text("userid").notNull().references(() => users.id)
    }
);

export const messages = pgTable(
    "messages",
    {
        id: serial("id").primaryKey().notNull(),
        documentid: uuid("documentid").notNull().references(() => documents.id),
        content: text("content").notNull(),
        role: roleEnum("role").notNull(),
        created_at: timestamp("created_at").notNull().defaultNow(),
    }
);