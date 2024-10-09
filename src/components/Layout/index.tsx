import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="pt-0 lg:pt-5 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
