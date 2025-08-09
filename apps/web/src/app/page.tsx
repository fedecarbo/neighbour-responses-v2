import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to dashboard with a sample application ID for testing
  redirect("/dashboard/APP-2024-001")
}
