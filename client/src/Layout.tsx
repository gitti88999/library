// Layout.tsx
import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <nav style={{ padding: 10, background: "#ccc" }}>
        <Link to="/app/library" style={{ marginRight: 10 }}>Library</Link>
        <Link to="/app/search">Search</Link>
      </nav>

      <div style={{ padding: 20 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;