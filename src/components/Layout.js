import Header from "@/components/organisms/Header/Header";
import Footer from "@/components/organisms/Footer/Footer";

const Layout = ({children}) => (
  <>
    <Header/>
    {children}
    <Footer/>
  </>
);
export default Layout;