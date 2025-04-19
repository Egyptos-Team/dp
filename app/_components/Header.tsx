"use client";
import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Collapse,
  CssBaseline,
  useScrollTrigger,
  Slide,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Search as SearchIcon,
  ShoppingBasket as ShoppingBasketIcon,
  Menu as MenuIcon,
  ArrowDropDown as ArrowDropDownIcon,
} from "@mui/icons-material";
import DropdownMenu from "./DropdownMenu";

import Fab from "@mui/material/Fab";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Fade from "@mui/material/Fade";
import { useRouter } from "next/navigation";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: React.ReactElement<unknown>;
}
const pages = [
  "home",
  "explore",
  "services",
  "trips",
  "about us",
  "contact",
  "more",
];
const subPages = {
  trips: [
    "Historical & Cultural Trips",
    "Desert & Adventure Trips",
    "Red Sea & Diving Trips",
    "Religious & Spiritual Trips",
    "Eco & Nature Trips",
    "Beach & Relaxation Trips",
    "Safari & Wildlife Trips",
  ],
  services: ["Tour Guide", "Hotel", "Transportion"],
  explore: [
    "Historic",
    "Archaeological Sites",
    "Sunken",
    "Artifacts",
    "Museum",
  ],
  more: ["Legends", "News", "FAQs"],
};

function HideOnScroll({ children }: { children: React.ReactElement }) {
  const trigger = useScrollTrigger();

  return (
    <Slide
      appear={false}
      direction="down"
      in={!trigger}
      timeout={{ enter: 300, exit: 200 }}
    >
      <Box sx={{ width: "100%", position: "fixed", top: 0, zIndex: 1100 }}>
        {children}
      </Box>
    </Slide>
  );
}

function ScrollTop(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100, // يظهر الزر بعد 100 بكسل من التمرير
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 1100,
        }}
      >
        {children}
      </Box>
    </Fade>
  );
}

function Header(props: Props) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [openSubMenu, setOpenSubMenu] = React.useState<string | null>(null); // ✅ للتحكم في القوائم الفرعية داخل البرجر

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    setOpenSubMenu(null); // ✅ إغلاق القوائم الفرعية عند إغلاق البرجر
  };

  const toggleSubMenu = (page: string) => {
    setOpenSubMenu(openSubMenu === page ? null : page); // ✅ فتح القائمة الفرعية عند الضغط على اللينك الرئيسي
  };

  // profile

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [user, setUser] = React.useState(null);
  const [profileImage, setProfileImage] = React.useState<string | null>(null);
  const [token, setToken] = React.useState<string | null>(null);

  // console.log(tokens);

  // React.useEffect(() => {
  //   const storedToken = JSON.parse(localStorage.getItem("User") || "{}");
  //   const tokens = storedToken.tokens;

  //   if (tokens) {
  //     setToken(tokens);

  //     // كلم الـ API باستخدام التوكن
  //     fetch("https://egyptos.runasp.net/api/Account/Profile", {
  //       headers: {
  //         Authorization: `Bearer ${tokens}`,
  //       },
  //     })
  //       .then((res) => res.json())

  //       .then((data) => {
  //         if (data) {
  //           setUser(data);
  //           setProfileImage(data.imageUrl); // عدّل حسب شكل الداتا
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error fetching user profile:", err);
  //         setToken(null);
  //       });
  //   }
  // }, []);

  React.useEffect(() => {
    const getUserFromStorage = () => {
      const storedToken = JSON.parse(localStorage.getItem("User") || "{}");
      const tokens = storedToken.tokens;
  
      if (tokens) {
        setToken(tokens);
  
        fetch("https://egyptos.runasp.net/api/Account/Profile", {
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data) {
              setUser(data);
              setProfileImage(data.imageUrl);
            }
          })
          .catch((err) => {
            console.error("Error fetching user profile:", err);
            setToken(null);
          });
      }
    };
  
    getUserFromStorage();
  
    // ✅ هنا نسمع الحدث لما يحصل تسجيل دخول
    window.addEventListener("userLoggedIn", getUserFromStorage);
  
    return () => {
      window.removeEventListener("userLoggedIn", getUserFromStorage);
    };
  }, []);
  

  const router = useRouter();

  const goToDashboard = () => {
    const roles = user?.role || [];

    if (roles.includes("Admin")) {
      router.push("/dashboard/admin");
    } else if (roles.includes("User")) {
      router.push("/dashboard/user");
    }else if (roles.includes("SuperAdmin")) {
      router.push("/dashboard/guide");
    }
     else {
      alert("🙈 مفيش داشبورد لهذا المستخدم");
    }
  };

  return (
    <header className="min-h-[100px] bg-bgBlueColor">
      <Box id="back-to-top-anchor" />

      <CssBaseline />
      {/* ✅ الشريط العلوي */}
      <HideOnScroll>
        <Box>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "#020032",
              height: "45px",
            }}
          >
            <Container maxWidth="xl">
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 0,
                }}
              >
                {/* ✅ أيقونات السوشيال ميديا */}
                <Box sx={{ display: "flex", gap: 2 }}>
                  {[
                    FacebookIcon,
                    TwitterIcon,
                    InstagramIcon,
                    LinkedInIcon,
                    YouTubeIcon,
                  ].map((Icon, index) => (
                    <Link
                      key={index}
                      href="#"
                      className="text-[#EBD778] hover:text-white"
                    >
                      <Icon sx={{ fontSize: 20 }} />
                    </Link>
                  ))}
                </Box>

                {/* ✅ البريد والهاتف */}
                <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 20 }}>
                  {[
                    { icon: EmailIcon, text: "Example@company.com" },
                    { icon: PhoneIcon, text: "01114169496" },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        color: "#EBD778",
                        "&:hover": { color: "#ffffff" },
                      }}
                    >
                      <item.icon sx={{ fontSize: 20 }} />
                      <Typography variant="body1" sx={{ fontSize: 16 }}>
                        {item.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                {/* ✅ زر تسجيل الدخول */}

                {/* <Button
                  variant="outlined"
                  sx={{
                    fontSize: "16px",
                    color: "white",
                    paddingX: "30px",

                    borderColor: "white",
                    "&:hover": { backgroundColor: "#eada79", color: "#001F3F" },
                  }}
                >
                  <Link href="/login">Login</Link>
                </Button> */}

                {/* ✅ البروفايل */}
                {/* <Box>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar
                        alt="User Avatar"
                        src="/static/images/avatar/2.jpg"
                      />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box> */}

                {user ? (
                  // ✅ مستخدم مسجل دخول - عرض صورة البروفايل
                  <Box>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="User Avatar"
                          src={
                            `https://egyptos.runasp.net/${profileImage}` ||
                            "/default-avatar.jpeg"
                          }
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                      disableScrollLock
                    >
                      {settings.map((setting) => (
                        <MenuItem
                          key={setting}
                          onClick={() => {
                            handleCloseUserMenu();

                            if (setting === "Dashboard") {
                              goToDashboard(); // ✅ هنا التوجيه حسب الـ role
                            } else if (setting === "Logout") {
                              // مثال لو عايز تضيف logout
                              localStorage.removeItem("User");
                              router.push("/auth/signin");
                            } else {
                              // باقي اللينكات تقدر توجهها حسب الحاجة
                              router.push(`/${setting.toLowerCase()}`);
                            }
                          }}
                        >
                          <Typography sx={{ textAlign: "center" }}>
                            {setting}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                ) : (
                  // ❌ مش مسجل دخول - زرار Login
                  <Button
                    variant="outlined"
                    sx={{
                      fontSize: "16px",
                      color: "white",
                      paddingX: "30px",
                      borderColor: "white",
                      "&:hover": {
                        backgroundColor: "#eada79",
                        color: "#001F3F",
                      },
                    }}
                  >
                    <Link href="/auth/signin">signin</Link>
                  </Button>
                )}
              </Toolbar>
            </Container>
          </AppBar>
          {/* </HideOnScroll> */}

          {/* ✅ شريط التنقل الأساسي */}
          <AppBar position="static" sx={{ backgroundColor: "#020032" }}>
            <Container maxWidth="xl">
              <Toolbar
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* ✅ اللوجو */}
                <Box sx={{ display: "flex", alignItems: "center", py: "0px" }}>
                  <Link
                    href="/"
                    className="relative block h-[40px]  w-[120px] ]  overflow-hidden rounded-tr-[57px] rounded-bl-[57px] border border-[#eada79]"
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-cover w-full h-full"
                    />
                  </Link>

                  {/* ✅ القائمة الرئيسية بجانب اللوجو */}
                  <Box
                    sx={{
                      display: { xs: "none", md: "flex" },
                      ml: 5,
                      gap: { xs: 1, lg: 3 },
                    }}
                  >
                    {pages.map((page) =>
                      subPages[page as keyof typeof subPages] ? (
                        <DropdownMenu
                          key={page}
                          title={page}
                          items={subPages[page as keyof typeof subPages]}
                        />
                      ) : (
                        <Button
                          key={page}
                          sx={{
                            fontSize: { xs: "16px", lg: "18px" },
                            color: "#D9D9D9",
                            textTransform: "capitalize",
                            "&:hover": { color: "#eada79" },
                          }}
                        >
                          <Link
                            href={
                              page.toLowerCase() === "home"
                                ? "/"
                                : `/${page.toLowerCase().replace(/\s+/g, "-")}`
                            }
                            style={{ color: "inherit", textDecoration: "none" }}
                          >
                            {page}
                          </Link>
                        </Button>
                      )
                    )}
                  </Box>
                </Box>

                {/* ✅ أيقونات البحث والمتجر (في أقصى اليمين) */}
                <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                  <IconButton color="inherit">
                    <ShoppingBasketIcon />
                  </IconButton>
                </Box>

                {/* ✅ زر القائمة المنسدلة في شاشات الموبايل */}
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorElNav}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                  >
                    {pages.map((page) => (
                      <div key={page}>
                        {subPages[page as keyof typeof subPages] ? (
                          <>
                            {/* ✅ اللينك الرئيسي مع السهم */}
                            <MenuItem
                              onClick={() => toggleSubMenu(page)}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              <Typography>{page}</Typography>
                              <ArrowDropDownIcon
                                sx={{
                                  transform:
                                    openSubMenu === page
                                      ? "rotate(180deg)"
                                      : "rotate(0deg)",
                                }}
                              />
                            </MenuItem>
                            {/* ✅ القوائم الفرعية تظهر فقط عند الضغط على اللينك الرئيسي */}
                            <Collapse in={openSubMenu === page}>
                              {subPages[page as keyof typeof subPages].map(
                                (subPage) => (
                                  <MenuItem
                                    key={subPage}
                                    onClick={handleCloseNavMenu}
                                    sx={{ pl: 4 }}
                                  >
                                    <Link
                                      href={`/${page.toLowerCase()}/${subPage
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}
                                      style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                      }}
                                    >
                                      - {subPage}
                                    </Link>
                                  </MenuItem>
                                )
                              )}
                            </Collapse>
                          </>
                        ) : (
                          <MenuItem onClick={handleCloseNavMenu}>
                            <Link
                              href={
                                page.toLowerCase() === "home"
                                  ? "/"
                                  : `/${page
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`
                              }
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              {page}
                            </Link>
                          </MenuItem>
                        )}
                      </div>
                    ))}
                    {/* ✅ إضافة البحث والمتجر كـ "كلمات" بدل الأيقونات في الموبايل */}
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Search</Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">Store</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </Box>
      </HideOnScroll>
      <Box sx={{ height: { xs: "100px", md: "124px" } }} />
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </header>
  );
}

export default Header;