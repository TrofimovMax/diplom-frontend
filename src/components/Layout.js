import Header from "@/components/templates/Header/Header";
import Footer from "@/components/templates/Footer/Footer";

const Layout = ({children}) => (
  <>
    <Header/>
    {children}
    <Footer/>
  </>
);
export default Layout;