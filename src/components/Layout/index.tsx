import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-10 lg:pt-8">
        <div className="container mx-auto">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
