import { Inngest } from "inngest";
import User from "../models/user.js";

// Create Inngest client
export const inngest = new Inngest({ id: "social-app" });

/* ----------------------------------
   CREATE USER (clerk/user.created)
----------------------------------- */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      // ✅ Correct Clerk field
      const email = email_addresses[0]?.email_address;

      if (!email) {
        throw new Error("Email not found in Clerk event");
      }

      let username = email.split("@")[0];

      // Check username availability
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        username = `${username}${Math.floor(Math.random() * 1000)}`;
      }

      await User.create({
        _id: id, // Clerk user ID
        email,
        full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
        username,
        profile_picture: image_url || "",
      });

      console.log("✅ User created:", id);
    } catch (error) {
      console.error("❌ User creation failed:", error.message);
    }
  }
);

/* ----------------------------------
   UPDATE USER (clerk/user.updated)
----------------------------------- */
const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const {
        id,
        first_name,
        last_name,
        email_addresses,
        image_url,
      } = event.data;

      const email = email_addresses[0]?.email_address;

      await User.findByIdAndUpdate(
        id,
        {
          email,
          full_name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
          profile_picture: image_url || "",
        },
        { new: true }
      );

      console.log("✅ User updated:", id);
    } catch (error) {
      console.error("❌ User update failed:", error.message);
    }
  }
);

/* ----------------------------------
   DELETE USER (clerk/user.deleted)
----------------------------------- */
const syncUserDelete = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;

      await User.findByIdAndDelete(id);

      console.log("✅ User deleted:", id);
    } catch (error) {
      console.error("❌ User delete failed:", error.message);
    }
  }
);

// Export all functions
export const functions = [
  syncUserCreation,
  syncUserUpdate,
  syncUserDelete,
];
