import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <div className="flex flex-col min-h-screen h-full">
        <Header />
        <main className="flex-1 flex">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
