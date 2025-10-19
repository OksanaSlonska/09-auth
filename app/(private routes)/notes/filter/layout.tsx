export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: "180px",
          backgroundColor: "#f8f8f8",
          padding: "16px",
          border: "1px solid red",
        }}
      >
        {sidebar}
      </aside>

      <main style={{ flex: 1, position: "relative" }}>{children}</main>
    </div>
  );
}
