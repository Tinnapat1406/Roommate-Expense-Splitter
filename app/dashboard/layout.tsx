// TODO: Dashboard shell — sidebar + header, requires an authenticated session.
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

// TODO: redirect to /login when there's no Supabase session.
export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />
        {props.children}
      </div>
    </div>
  );
}
