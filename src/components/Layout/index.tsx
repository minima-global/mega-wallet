import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col lg:h-screen">
      <Header />
      <main className="pt-0 lg:pt-4 flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
