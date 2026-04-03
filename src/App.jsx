import { useState, useEffect } from "react";

// =============================================
// 📦 SAMPLE DATA
// =============================================
const sampleProducts = [
  { id: 1, name: "Wireless Headphones", price: 1999, category: "Electronics" },
  { id: 2, name: "Running Shoes",       price: 1299, category: "Footwear"    },
  { id: 3, name: "Leather Wallet",      price: 599,  category: "Accessories" },
  { id: 4, name: "Desk Lamp",           price: 749,  category: "Home"        },
  { id: 5, name: "Casual T-Shirt",      price: 399,  category: "Clothing"    },
];

const sampleUsers = [
  { id: 1, name: "Arjun Sharma", email: "arjun@email.com", role: "Admin",  status: "Active"   },
  { id: 2, name: "Priya Mehta",  email: "priya@email.com", role: "Editor", status: "Active"   },
  { id: 3, name: "Rahul Verma",  email: "rahul@email.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Sneha Patel",  email: "sneha@email.com", role: "Editor", status: "Active"   },
  { id: 5, name: "Karan Singh",  email: "karan@email.com", role: "Viewer", status: "Active"   },
];

// =============================================
// 🔐 LOGIN
// =============================================
function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    if (username === "admin" && password === "1234") {
      onLogin();
    } else {
      setError("❌ Invalid credentials. Try admin / 1234");
    }
  }

  return (
    <div style={s.loginWrapper}>
      <div style={s.loginBox}>
        <div style={{ fontSize: 40, textAlign: "center", marginBottom: 8 }}>⚙️</div>
        <h2 style={s.loginTitle}>Admin Login</h2>
        <p style={s.loginHint}>Username: <strong>admin</strong> | Password: <strong>1234</strong></p>
        <label style={s.label}>Username</label>
        <input style={s.input} placeholder="admin" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label style={s.label}>Password</label>
        <input style={s.input} placeholder="••••" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
        {error && <p style={s.error}>{error}</p>}
        <button style={{ ...s.primaryBtn, width: "100%", padding: 12 }} onClick={handleLogin}>Login →</button>
      </div>
    </div>
  );
}

// =============================================
// 🧩 CONFIRM DELETE DIALOG
// Replaces window.confirm() which doesn't work in preview
// =============================================
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={s.backdrop} onClick={onCancel}>
      <div style={{ ...s.modal, width: 300, textAlign: "center" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🗑️</div>
        <p style={{ fontSize: 15, marginBottom: 20, color: "#333" }}>{message}</p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          <button style={s.deleteConfirmBtn} onClick={onConfirm}>Yes, Delete</button>
          <button style={s.secondaryBtn} onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// 🧩 PRODUCT MODAL (Add / Edit)
// =============================================
function ProductModal({ existing, onSave, onClose }) {
  const [name,     setName]     = useState(existing?.name     || "");
  const [price,    setPrice]    = useState(existing?.price    || "");
  const [category, setCategory] = useState(existing?.category || "");
  const [error,    setError]    = useState("");
  const categories = ["Electronics", "Footwear", "Accessories", "Home", "Clothing"];

  function handleSave() {
    if (!name.trim() || !price || !category) { setError("All fields are required."); return; }
    if (isNaN(price) || Number(price) <= 0)  { setError("Price must be a positive number."); return; }
    onSave({ name: name.trim(), price: Number(price), category });
  }

  return (
    <div style={s.backdrop} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: 16 }}>{existing ? "✏️ Edit Product" : "➕ Add Product"}</h3>
        <label style={s.label}>Product Name</label>
        <input style={s.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Wireless Mouse" />
        <label style={s.label}>Price (₹)</label>
        <input style={s.input} value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 999" type="number" />
        <label style={s.label}>Category</label>
        <select style={s.input} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">-- Select --</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        {error && <p style={s.error}>{error}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button style={s.primaryBtn} onClick={handleSave}>{existing ? "Update" : "Add Product"}</button>
          <button style={s.secondaryBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// 🧩 USER MODAL (Add / Edit)
// =============================================
function UserModal({ existing, onSave, onClose }) {
  const [name,   setName]   = useState(existing?.name   || "");
  const [email,  setEmail]  = useState(existing?.email  || "");
  const [role,   setRole]   = useState(existing?.role   || "");
  const [status, setStatus] = useState(existing?.status || "Active");
  const [error,  setError]  = useState("");

  function handleSave() {
    if (!name.trim() || !email.trim() || !role) { setError("All fields are required."); return; }
    onSave({ name: name.trim(), email: email.trim(), role, status });
  }

  return (
    <div style={s.backdrop} onClick={onClose}>
      <div style={s.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ marginBottom: 16 }}>{existing ? "✏️ Edit User" : "➕ Add User"}</h3>
        <label style={s.label}>Full Name</label>
        <input style={s.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. John Doe" />
        <label style={s.label}>Email</label>
        <input style={s.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g. john@email.com" />
        <label style={s.label}>Role</label>
        <select style={s.input} value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">-- Select --</option>
          {["Admin","Editor","Viewer"].map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
        <label style={s.label}>Status</label>
        <select style={s.input} value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        {error && <p style={s.error}>{error}</p>}
        <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
          <button style={s.primaryBtn} onClick={handleSave}>{existing ? "Update" : "Add User"}</button>
          <button style={s.secondaryBtn} onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// =============================================
// 📦 PRODUCTS PAGE
// =============================================
function ProductsPage({ products, setProducts }) {
  const [search,    setSearch]    = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [editItem,  setEditItem]  = useState(null);
  const [deleteId,  setDeleteId]  = useState(null);

  const catColor = { Electronics:"#1565c0", Footwear:"#6a1b9a", Accessories:"#e65100", Home:"#2e7d32", Clothing:"#c62828" };
  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterCat === "All" || p.category === filterCat)
  );

  function addProduct(data)    { setProducts([...products, { id: Date.now(), ...data }]); setShowModal(false); }
  function updateProduct(data) { setProducts(products.map((p) => p.id === editItem.id ? { ...p, ...data } : p)); setEditItem(null); setShowModal(false); }
  function confirmDelete()     { setProducts(products.filter((p) => p.id !== deleteId)); setDeleteId(null); }

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.pageTitle}>📦 Products</h1>
        <button style={s.primaryBtn} onClick={() => { setEditItem(null); setShowModal(true); }}>+ Add Product</button>
      </div>

      <div style={s.statsRow}>
        {[
          { num: products.length,                                              label: "Total Products" },
          { num: `₹${products.reduce((t,p)=>t+p.price,0).toLocaleString()}`,  label: "Total Value"    },
          { num: new Set(products.map(p=>p.category)).size,                    label: "Categories"     },
          { num: filtered.length,                                              label: "Showing"        },
        ].map((c,i) => (
          <div key={i} style={s.statCard}><p style={s.statNum}>{c.num}</p><p style={s.statLabel}>{c.label}</p></div>
        ))}
      </div>

      <div style={s.toolbar}>
        <input style={{ ...s.input, flex:1, marginBottom:0 }} placeholder="🔍 Search products..." value={search} onChange={(e)=>setSearch(e.target.value)} />
        <select style={{ ...s.input, width:160, marginBottom:0 }} value={filterCat} onChange={(e)=>setFilterCat(e.target.value)}>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div style={s.tableWrapper}>
        {filtered.length === 0
          ? <p style={s.emptyMsg}>😕 No products found.</p>
          : <table style={s.table}>
              <thead><tr style={{ background:"#f8f8f8" }}>
                <th style={s.th}>#</th><th style={s.th}>Name</th><th style={s.th}>Price</th><th style={s.th}>Category</th><th style={s.th}>Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map((p,i) => (
                  <tr key={p.id}>
                    <td style={s.td}>{i+1}</td>
                    <td style={s.td}><strong>{p.name}</strong></td>
                    <td style={s.td}>₹{p.price}</td>
                    <td style={s.td}><span style={{ ...s.badge, background: catColor[p.category]||"#555" }}>{p.category}</span></td>
                    <td style={s.td}>
                      <button style={s.editBtn}   onClick={() => { setEditItem(p); setShowModal(true); }}>✏️ Edit</button>
                      <button style={s.deleteBtn} onClick={() => setDeleteId(p.id)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
      </div>

      {showModal  && <ProductModal existing={editItem} onSave={editItem ? updateProduct : addProduct} onClose={() => { setShowModal(false); setEditItem(null); }} />}
      {deleteId   && <ConfirmDialog message="Delete this product?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}

// =============================================
// 👥 USERS PAGE
// =============================================
function UsersPage({ users, setUsers }) {
  const [search,    setSearch]    = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editItem,  setEditItem]  = useState(null);
  const [deleteId,  setDeleteId]  = useState(null);

  const roleColor = { Admin:"#1565c0", Editor:"#e65100", Viewer:"#2e7d32" };
  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  function addUser(data)    { setUsers([...users, { id: Date.now(), ...data }]); setShowModal(false); }
  function updateUser(data) { setUsers(users.map((u) => u.id === editItem.id ? { ...u, ...data } : u)); setEditItem(null); setShowModal(false); }
  function confirmDelete()  { setUsers(users.filter((u) => u.id !== deleteId)); setDeleteId(null); }

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.pageTitle}>👥 Users</h1>
        <button style={s.primaryBtn} onClick={() => { setEditItem(null); setShowModal(true); }}>+ Add User</button>
      </div>

      <div style={s.statsRow}>
        {[
          { num: users.length,                                  label: "Total Users" },
          { num: users.filter(u=>u.status==="Active").length,   label: "Active"      },
          { num: users.filter(u=>u.status==="Inactive").length, label: "Inactive"    },
          { num: users.filter(u=>u.role==="Admin").length,      label: "Admins"      },
        ].map((c,i) => (
          <div key={i} style={s.statCard}><p style={s.statNum}>{c.num}</p><p style={s.statLabel}>{c.label}</p></div>
        ))}
      </div>

      <div style={s.toolbar}>
        <input style={{ ...s.input, flex:1, marginBottom:0 }} placeholder="🔍 Search users..." value={search} onChange={(e)=>setSearch(e.target.value)} />
      </div>

      <div style={s.tableWrapper}>
        {filtered.length === 0
          ? <p style={s.emptyMsg}>😕 No users found.</p>
          : <table style={s.table}>
              <thead><tr style={{ background:"#f8f8f8" }}>
                <th style={s.th}>#</th><th style={s.th}>Name</th><th style={s.th}>Email</th><th style={s.th}>Role</th><th style={s.th}>Status</th><th style={s.th}>Actions</th>
              </tr></thead>
              <tbody>
                {filtered.map((u,i) => (
                  <tr key={u.id}>
                    <td style={s.td}>{i+1}</td>
                    <td style={s.td}><strong>{u.name}</strong></td>
                    <td style={s.td}>{u.email}</td>
                    <td style={s.td}><span style={{ ...s.badge, background: roleColor[u.role]||"#555" }}>{u.role}</span></td>
                    <td style={s.td}><span style={{ ...s.badge, background: u.status==="Active"?"#2e7d32":"#888" }}>{u.status}</span></td>
                    <td style={s.td}>
                      <button style={s.editBtn}   onClick={() => { setEditItem(u); setShowModal(true); }}>✏️ Edit</button>
                      <button style={s.deleteBtn} onClick={() => setDeleteId(u.id)}>🗑️ Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
        }
      </div>

      {showModal && <UserModal existing={editItem} onSave={editItem ? updateUser : addUser} onClose={() => { setShowModal(false); setEditItem(null); }} />}
      {deleteId  && <ConfirmDialog message="Delete this user?" onConfirm={confirmDelete} onCancel={() => setDeleteId(null)} />}
    </div>
  );
}

// =============================================
// 📊 ANALYTICS PAGE
// =============================================
function AnalyticsPage({ products, users }) {
  const catColor = { Electronics:"#1565c0", Footwear:"#6a1b9a", Accessories:"#e65100", Home:"#2e7d32", Clothing:"#c62828" };

  const catCounts  = products.reduce((acc,p) => { acc[p.category]=(acc[p.category]||0)+1; return acc; }, {});
  const roleCounts = users.reduce((acc,u)    => { acc[u.role]=(acc[u.role]||0)+1;          return acc; }, {});
  const maxCat     = Math.max(...Object.values(catCounts), 1);

  return (
    <div>
      <h1 style={s.pageTitle}>📊 Analytics</h1>

      <div style={s.statsRow}>
        {[
          { num: products.length,                                              label: "Total Products" },
          { num: users.length,                                                 label: "Total Users"    },
          { num: `₹${products.reduce((t,p)=>t+p.price,0).toLocaleString()}`,  label: "Products Value" },
          { num: users.filter(u=>u.status==="Active").length,                  label: "Active Users"   },
        ].map((c,i) => (
          <div key={i} style={s.statCard}><p style={s.statNum}>{c.num}</p><p style={s.statLabel}>{c.label}</p></div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Products by Category */}
        <div style={s.chartCard}>
          <h3 style={s.chartTitle}>📦 Products by Category</h3>
          {Object.entries(catCounts).map(([cat, count]) => (
            <div key={cat} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                <span>{cat}</span><strong>{count}</strong>
              </div>
              <div style={{ background:"#eee", borderRadius:6, height:10 }}>
                <div style={{ width:`${(count/maxCat)*100}%`, background:catColor[cat]||"#555", height:10, borderRadius:6 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Users by Role */}
        <div style={s.chartCard}>
          <h3 style={s.chartTitle}>👥 Users by Role</h3>
          {Object.entries(roleCounts).map(([role, count]) => (
            <div key={role} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderBottom:"1px solid #f0f0f0" }}>
              <span style={{ fontSize:14 }}>{role}</span>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ display:"flex", gap:4 }}>
                  {Array.from({length:count}).map((_,i)=>(
                    <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:{Admin:"#1565c0",Editor:"#e65100",Viewer:"#2e7d32"}[role] }} />
                  ))}
                </div>
                <strong>{count}</strong>
              </div>
            </div>
          ))}

          <h3 style={{ ...s.chartTitle, marginTop:20 }}>Active vs Inactive</h3>
          {["Active","Inactive"].map((st) => {
            const cnt = users.filter(u=>u.status===st).length;
            return (
              <div key={st} style={{ marginBottom:12 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:4 }}>
                  <span>{st}</span><strong>{cnt}</strong>
                </div>
                <div style={{ background:"#eee", borderRadius:6, height:10 }}>
                  <div style={{ width:`${users.length ? (cnt/users.length)*100 : 0}%`, background:st==="Active"?"#2e7d32":"#888", height:10, borderRadius:6 }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Products */}
        <div style={{ ...s.chartCard, gridColumn:"1 / -1" }}>
          <h3 style={s.chartTitle}>🏆 Top 5 Most Expensive Products</h3>
          <table style={s.table}>
            <thead><tr style={{ background:"#f8f8f8" }}>
              <th style={s.th}>Rank</th><th style={s.th}>Product</th><th style={s.th}>Category</th><th style={s.th}>Price</th>
            </tr></thead>
            <tbody>
              {[...products].sort((a,b)=>b.price-a.price).slice(0,5).map((p,i) => (
                <tr key={p.id}>
                  <td style={s.td}>#{i+1}</td>
                  <td style={s.td}><strong>{p.name}</strong></td>
                  <td style={s.td}><span style={{ ...s.badge, background:catColor[p.category]||"#555" }}>{p.category}</span></td>
                  <td style={s.td}><strong style={{ color:"#2e7d32" }}>₹{p.price}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// =============================================
// ⚙️ SETTINGS PAGE
// =============================================
function SettingsPage() {
  const [siteName,      setSiteName]      = useState("AdminPanel");
  const [email,         setEmail]         = useState("admin@company.com");
  const [language,      setLanguage]      = useState("English");
  const [notifications, setNotifications] = useState(true);
  const [darkMode,      setDarkMode]      = useState(false);
  const [saved,         setSaved]         = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2500); }

  return (
    <div>
      <h1 style={s.pageTitle}>⚙️ Settings</h1>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* General */}
        <div style={s.chartCard}>
          <h3 style={s.chartTitle}>General</h3>
          <label style={s.label}>Site Name</label>
          <input style={s.input} value={siteName} onChange={(e)=>setSiteName(e.target.value)} />
          <label style={s.label}>Admin Email</label>
          <input style={s.input} value={email} onChange={(e)=>setEmail(e.target.value)} />
          <label style={s.label}>Language</label>
          <select style={s.input} value={language} onChange={(e)=>setLanguage(e.target.value)}>
            {["English","Hindi","Spanish","French"].map(l=><option key={l}>{l}</option>)}
          </select>
        </div>

        {/* Preferences */}
        <div style={s.chartCard}>
          <h3 style={s.chartTitle}>Preferences</h3>
          {[
            { label:"Email Notifications", desc:"Get alerts for new activity", val:notifications, set:setNotifications },
            { label:"Dark Mode",           desc:"Switch to dark theme",         val:darkMode,      set:setDarkMode      },
          ].map((item) => (
            <div key={item.label} style={{ ...s.toggleRow, marginBottom:16 }}>
              <div>
                <p style={{ margin:"0 0 2px", fontWeight:"bold", fontSize:14 }}>{item.label}</p>
                <p style={{ margin:0, fontSize:12, color:"#888" }}>{item.desc}</p>
              </div>
              <div style={{ ...s.toggle, background:item.val?"#1976d2":"#ccc" }} onClick={()=>item.set(!item.val)}>
                <div style={{ ...s.toggleKnob, left:item.val?22:2 }} />
              </div>
            </div>
          ))}

          <div style={{ padding:14, background:"#f8f9fa", borderRadius:8, border:"1px solid #eee", marginTop:8 }}>
            <p style={{ margin:"0 0 6px", fontWeight:"bold", fontSize:13 }}>Current Config</p>
            {[`Site: ${siteName}`, `Email: ${email}`, `Language: ${language}`, `Notifications: ${notifications?"On":"Off"}`].map(line=>(
              <p key={line} style={{ margin:0, fontSize:12, color:"#555" }}>{line}</p>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div style={{ ...s.chartCard, gridColumn:"1/-1", border:"1px solid #ffcdd2" }}>
          <h3 style={{ ...s.chartTitle, color:"#c62828" }}>⚠️ Danger Zone</h3>
          <div style={{ display:"flex", gap:12 }}>
            <button style={{ ...s.deleteBtn, padding:"10px 20px", fontSize:14 }}>🗑️ Clear All Products</button>
            <button style={{ ...s.deleteBtn, padding:"10px 20px", fontSize:14 }}>👥 Clear All Users</button>
            <button style={{ ...s.deleteBtn, padding:"10px 20px", fontSize:14 }}>🔄 Reset to Defaults</button>
          </div>
        </div>
      </div>

      <div style={{ marginTop:20, display:"flex", alignItems:"center", gap:12 }}>
        <button style={{ ...s.primaryBtn, padding:"12px 32px" }} onClick={handleSave}>💾 Save Settings</button>
        {saved && <span style={{ color:"#2e7d32", fontWeight:"bold", fontSize:14 }}>✅ Settings saved!</span>}
      </div>
    </div>
  );
}

// =============================================
// 🏠 MAIN APP
// =============================================
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("products");

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("admin_products");
    return saved ? JSON.parse(saved) : sampleProducts;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("admin_users");
    return saved ? JSON.parse(saved) : sampleUsers;
  });

  useEffect(() => { localStorage.setItem("admin_products", JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem("admin_users",    JSON.stringify(users));    }, [users]);

  if (!isLoggedIn) return <Login onLogin={() => setIsLoggedIn(true)} />;

  const navItems = [
    { id:"products",  label:"📦 Products"  },
    { id:"users",     label:"👥 Users"     },
    { id:"analytics", label:"📊 Analytics" },
    { id:"settings",  label:"⚙️ Settings"  },
  ];

  return (
    <div style={s.appWrapper}>
      {/* SIDEBAR */}
      <div style={s.sidebar}>
        <h2 style={s.logo}>⚙️ AdminPanel</h2>
        <nav>
          {navItems.map((item) => (
            <p key={item.id} onClick={() => setActivePage(item.id)} style={{
              ...s.navItem,
              background: activePage===item.id ? "rgba(167,139,250,0.15)" : "transparent",
              color:      activePage===item.id ? "#a78bfa" : "#ccc",
              fontWeight: activePage===item.id ? "bold" : "normal",
            }}>
              {item.label}
            </p>
          ))}
        </nav>
        <button style={s.logoutBtn} onClick={() => setIsLoggedIn(false)}>🚪 Logout</button>
      </div>

      {/* MAIN CONTENT */}
      <div style={s.main}>
        {activePage === "products"  && <ProductsPage  products={products} setProducts={setProducts} />}
        {activePage === "users"     && <UsersPage     users={users}       setUsers={setUsers}       />}
        {activePage === "analytics" && <AnalyticsPage products={products} users={users}             />}
        {activePage === "settings"  && <SettingsPage />}
      </div>
    </div>
  );
}

// =============================================
// 🎨 STYLES
// =============================================
const s = {
  appWrapper:       { display:"flex", minHeight:"100vh", fontFamily:"sans-serif", background:"#f4f6f8" },
  sidebar:          { width:200, background:"#1e1e2e", color:"white", padding:"24px 16px", display:"flex", flexDirection:"column", flexShrink:0 },
  logo:             { fontSize:18, marginBottom:32, color:"#a78bfa" },
  navItem:          { padding:"10px 12px", borderRadius:6, cursor:"pointer", marginBottom:4, fontSize:14 },
  logoutBtn:        { marginTop:"auto", padding:10, background:"#c62828", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontSize:14 },
  main:             { flex:1, padding:28, overflowY:"auto", minWidth:0 },
  header:           { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 },
  pageTitle:        { fontSize:22, fontWeight:"bold", margin:"0 0 24px" },
  statsRow:         { display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 },
  statCard:         { background:"white", border:"1px solid #ddd", borderRadius:8, padding:"16px 20px", textAlign:"center" },
  statNum:          { fontSize:22, fontWeight:"bold", color:"#1976d2", margin:"0 0 4px" },
  statLabel:        { fontSize:12, color:"#888", margin:0 },
  toolbar:          { display:"flex", gap:12, marginBottom:16 },
  tableWrapper:     { background:"white", borderRadius:8, border:"1px solid #ddd", overflow:"hidden" },
  table:            { width:"100%", borderCollapse:"collapse" },
  th:               { padding:"12px 16px", textAlign:"left", fontSize:13, fontWeight:"bold", color:"#555", borderBottom:"1px solid #ddd" },
  td:               { padding:"12px 16px", fontSize:14, borderBottom:"1px solid #f0f0f0" },
  badge:            { padding:"3px 10px", borderRadius:12, color:"white", fontSize:12, fontWeight:"bold" },
  editBtn:          { padding:"5px 12px", marginRight:8, background:"#fff8e1", border:"1px solid #f9a825", color:"#f57f17", borderRadius:5, cursor:"pointer", fontSize:12 },
  deleteBtn:        { padding:"5px 12px", background:"#fce4ec", border:"1px solid #e57373", color:"#c62828", borderRadius:5, cursor:"pointer", fontSize:12 },
  deleteConfirmBtn: { padding:"10px 20px", background:"#c62828", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontSize:14 },
  emptyMsg:         { textAlign:"center", padding:40, color:"#888" },
  backdrop:         { position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000 },
  modal:            { background:"white", borderRadius:10, padding:28, width:380, boxShadow:"0 8px 32px rgba(0,0,0,0.2)" },
  label:            { display:"block", fontSize:13, fontWeight:"bold", marginBottom:4, color:"#555" },
  input:            { display:"block", width:"100%", padding:"9px 12px", fontSize:14, border:"1px solid #ccc", borderRadius:6, marginBottom:14, boxSizing:"border-box" },
  error:            { color:"#c62828", fontSize:13, marginTop:-8, marginBottom:8 },
  primaryBtn:       { padding:"10px 20px", background:"#1976d2", color:"white", border:"none", borderRadius:6, cursor:"pointer", fontSize:14, fontWeight:"bold" },
  secondaryBtn:     { padding:"10px 20px", background:"#eee", color:"#333", border:"none", borderRadius:6, cursor:"pointer", fontSize:14 },
  chartCard:        { background:"white", border:"1px solid #ddd", borderRadius:8, padding:20 },
  chartTitle:       { fontSize:15, fontWeight:"bold", marginBottom:16, marginTop:0 },
  toggleRow:        { display:"flex", justifyContent:"space-between", alignItems:"center" },
  toggle:           { width:46, height:24, borderRadius:12, position:"relative", cursor:"pointer", transition:"background 0.2s", flexShrink:0 },
  toggleKnob:       { position:"absolute", top:3, width:18, height:18, borderRadius:"50%", background:"white", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" },
  loginWrapper:     { minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"#f4f6f8", fontFamily:"sans-serif" },
  loginBox:         { background:"white", padding:40, borderRadius:10, width:360, boxShadow:"0 4px 20px rgba(0,0,0,0.1)" },
  loginTitle:       { fontSize:22, marginBottom:8, textAlign:"center" },
  loginHint:        { fontSize:13, color:"#888", textAlign:"center", marginBottom:24 },
};