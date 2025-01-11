import { Client, Databases, Account, Storage } from "node-appwrite";

// Type definitions for the return values
interface AdminClient {
  account: Account;
  databases: Databases;
  storage: Storage;
}

interface SessionClient {
  account: Account;
  databases: Databases;
}

// Admin client
const createAdminClient = async (): Promise<AdminClient> => {
  const adminClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "")
    .setKey(process.env.NEXT_APPWRITE_KEY || "");

  return {
    get account() {
      return new Account(adminClient);
    },
    get databases() {
      return new Databases(adminClient);
    },
    get storage() {
      return new Storage(adminClient);
    },
  };
};

// Session client
const createSessionClient = async (session: string | undefined): Promise<SessionClient> => {
  const sessionClient = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "") // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "");

  if (session) {
    sessionClient.setSession(session);
  }

  return {
    get account() {
      return new Account(sessionClient);
    },
    get databases() {
      return new Databases(sessionClient);
    },
  };
};

export { createAdminClient, createSessionClient };
