import {
  InquiryStatus,
  ProfileRole,
  SubscriberStatus,
  type ContactInquiry,
  type Profile,
  type Subscriber
} from "@prisma/client";
import { appEnv, isDatabaseConfigured, isDemoMode } from "@/lib/env";
import { getPrisma } from "@/lib/prisma";
import { normalizeEmail } from "@/lib/utils";

type CreateSubscriberInput = {
  email: string;
  source: string;
};

type CreateInquiryInput = {
  name: string;
  email: string;
  company?: string;
  budgetRange?: string;
  message: string;
};

type DemoStore = {
  profiles: Profile[];
  subscribers: Subscriber[];
  inquiries: ContactInquiry[];
};

declare global {
  var __AI_BLOG_DEMO_STORE__: DemoStore | undefined;
}

function createDemoStore(): DemoStore {
  return {
    profiles: [
      {
        id: crypto.randomUUID(),
        email: appEnv.adminEmail,
        fullName: appEnv.adminFullName,
        role: ProfileRole.ADMIN,
        createdAt: new Date()
      }
    ],
    subscribers: [
      {
        id: crypto.randomUUID(),
        email: "studio@northline.dev",
        status: SubscriberStatus.ACTIVE,
        source: "seed",
        createdAt: new Date("2025-11-18"),
        updatedAt: new Date("2025-11-18")
      }
    ],
    inquiries: [
      {
        id: crypto.randomUUID(),
        name: "Mira Patel",
        email: "mira@field-notes.studio",
        company: "Field Notes Studio",
        budgetRange: "$5k - $10k",
        message:
          "Need a technical content hub with editorial polish, subscriber capture, and a minimal admin area.",
        status: InquiryStatus.NEW,
        createdAt: new Date("2025-12-04"),
        updatedAt: new Date("2025-12-04")
      }
    ]
  };
}

function getDemoStore() {
  if (!globalThis.__AI_BLOG_DEMO_STORE__) {
    globalThis.__AI_BLOG_DEMO_STORE__ = createDemoStore();
  }

  return globalThis.__AI_BLOG_DEMO_STORE__;
}

function ensureDatabaseConfigured() {
  if (!isDatabaseConfigured()) {
    throw new Error(
      "DATABASE_URL is not configured. Set it for live Postgres persistence or enable AI_BLOG_DEMO_MODE=1 for a local preview."
    );
  }
}

export async function getProfileByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);

  if (isDemoMode()) {
    return getDemoStore().profiles.find((profile) => profile.email === normalizedEmail) ?? null;
  }

  ensureDatabaseConfigured();
  return getPrisma().profile.findUnique({
    where: {
      email: normalizedEmail
    }
  });
}

export async function listSubscribers() {
  if (isDemoMode()) {
    return [...getDemoStore().subscribers].sort(
      (left, right) => right.createdAt.getTime() - left.createdAt.getTime()
    );
  }

  ensureDatabaseConfigured();
  return getPrisma().subscriber.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function createOrUpdateSubscriber(input: CreateSubscriberInput) {
  const email = normalizeEmail(input.email);
  const source = input.source.trim();

  if (isDemoMode()) {
    const store = getDemoStore();
    const existing = store.subscribers.find((subscriber) => subscriber.email === email);

    if (existing) {
      if (existing.status === SubscriberStatus.ACTIVE) {
        return {
          subscriber: existing,
          duplicate: true,
          reactivated: false
        };
      }

      existing.status = SubscriberStatus.ACTIVE;
      existing.source = source;
      existing.updatedAt = new Date();

      return {
        subscriber: existing,
        duplicate: false,
        reactivated: true
      };
    }

    const subscriber: Subscriber = {
      id: crypto.randomUUID(),
      email,
      status: SubscriberStatus.ACTIVE,
      source,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    store.subscribers.unshift(subscriber);

    return {
      subscriber,
      duplicate: false,
      reactivated: false
    };
  }

  ensureDatabaseConfigured();
  const prisma = getPrisma();
  const existing = await prisma.subscriber.findUnique({
    where: {
      email
    }
  });

  if (existing?.status === SubscriberStatus.ACTIVE) {
    return {
      subscriber: existing,
      duplicate: true,
      reactivated: false
    };
  }

  const subscriber = existing
    ? await prisma.subscriber.update({
        where: {
          email
        },
        data: {
          status: SubscriberStatus.ACTIVE,
          source
        }
      })
    : await prisma.subscriber.create({
        data: {
          email,
          source,
          status: SubscriberStatus.ACTIVE
        }
      });

  return {
    subscriber,
    duplicate: false,
    reactivated: Boolean(existing)
  };
}

export async function listContactInquiries() {
  if (isDemoMode()) {
    return [...getDemoStore().inquiries].sort(
      (left, right) => right.createdAt.getTime() - left.createdAt.getTime()
    );
  }

  ensureDatabaseConfigured();
  return getPrisma().contactInquiry.findMany({
    orderBy: {
      createdAt: "desc"
    }
  });
}

export async function createContactInquiry(input: CreateInquiryInput) {
  if (isDemoMode()) {
    const inquiry: ContactInquiry = {
      id: crypto.randomUUID(),
      name: input.name,
      email: normalizeEmail(input.email),
      company: input.company ?? null,
      budgetRange: input.budgetRange ?? null,
      message: input.message,
      status: InquiryStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    getDemoStore().inquiries.unshift(inquiry);
    return inquiry;
  }

  ensureDatabaseConfigured();
  return getPrisma().contactInquiry.create({
    data: {
      name: input.name,
      email: normalizeEmail(input.email),
      company: input.company,
      budgetRange: input.budgetRange,
      message: input.message,
      status: InquiryStatus.NEW
    }
  });
}
