import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { Routing } from "./components/Routing";
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

export const App = () => {
  return (
    <div className="siteWrapper">
      <div className="container siteContent">
        <SiteHeader />
        <Routing />
        <SiteFooter />
      </div>
    </div>
  );
}

