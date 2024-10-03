import Footer from "./Footer";
import Header from "./Header";
import Socials from "./Socials";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Header />
      <main className="pt-10 lg:pt-8">
        <div className="container mx-auto">{children}</div>
      </main>
      <Socials />
      <Footer />
    </div>
  );
};

export default Layout;
