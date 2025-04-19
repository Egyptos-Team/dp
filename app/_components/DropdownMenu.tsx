import React from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; // 🔽 استيراد أيقونة السهم
import Link from "next/link";

// ✅ تحديد نوع البيانات التي يستقبلها المكون
interface DropdownMenuProps {
  title: string; // العنوان يجب أن يكون نص
  items: string[]; // العناصر يجب أن تكون مصفوفة من النصوص
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* زر القائمة الرئيسي مع السهم */}
      <Button 
        onClick={handleOpen}
        sx={{
          my: 2,
          fontSize: { xs: "16px", lg: "20px" },
          textTransform: "capitalize",
          color: "#D9D9D9",
          "&:hover": { color: "#eada79" },
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {title} <ArrowDropDownIcon />  {/* 🔽 السهم */}
      </Button>

      {/* القائمة المنسدلة */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {items.map((item) => (
          <MenuItem key={item} onClick={handleClose} sx={{ "&:hover": { color: "#eada79", backgroundColor: "#020032" } }}>
            <Link
              href={`/${title.toLowerCase()}/${item.toLowerCase().replace(/\s+/g, "-")}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default DropdownMenu;
