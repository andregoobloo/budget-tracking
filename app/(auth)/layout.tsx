import Logo from "@/app/components/Logo";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto my-auto flex h-screen flex-col items-center justify-center gap-10">
      <Logo />
      {children}
    </div>
  );
}
