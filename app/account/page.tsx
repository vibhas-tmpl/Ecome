
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase-server";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  return (
    <main className="global-container min-h-[60vh] py-12">
      <h1 className="font-heading text-4xl font-bold">
        My Account
      </h1>

      <p className="mt-4 text-gray-600">
        Welcome to your SHOP.CO account.
      </p>

      <p className="mt-4">
        <span className="font-medium">Email:</span>{" "}
        {user.email}
      </p>
    </main>
  );
}
