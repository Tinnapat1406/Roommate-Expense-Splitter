import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";

// TODO: redirect to /login when there's no Supabase session.
export default function DashboardLayout(props: LayoutProps<"/dashboard">) {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-8">
          {props.children}
        </main>
      </div>
    </div>
  );
}
