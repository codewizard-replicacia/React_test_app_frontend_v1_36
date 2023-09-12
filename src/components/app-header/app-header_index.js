import { useState } from "react";
import clsx from "clsx";
import { Menu, ChevronLeft, ChevronRight, Pages, ExpandLess, ExpandMore, ShoppingBasket, Toc,Person, } from "@material-ui/icons";
import { AppBar, Avatar, Box, Button, Collapse, Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText,
  makeStyles, Popover, Toolbar, Typography, useTheme } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  listItemIcon: {
    paddingLeft: theme.spacing(1),
    color: theme.palette.secondary.main,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  typography: {
    padding: '8px 16px',
    textTransform: "none",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.caption.fontSize,
    fontWeight:700
  },
  profile: {
    fontSize: theme.typography.caption.fontSize,
    color: theme.palette.text.secondary,
  },
}));

function AppHeader({ onDrawerChange = () => {} }) {
  const theme = useTheme();
  const classes = useStyles();
  const navigate =  useNavigate();
  const [open, setOpen] = useState(false);
  const [pageSubMenuOpen, setPageSubMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePageMenuClick = () => {
    setOpen(true);
    onDrawerChange(true);
    setPageSubMenuOpen(!pageSubMenuOpen);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
    onDrawerChange(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onDrawerChange(false);
    setPageSubMenuOpen(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const popperOpen = Boolean(anchorEl);
  const id = popperOpen ? "simple-popover" : undefined;

  const navigationMenu = [
    <div key="Pages">
      <ListItem button onClick={handlePageMenuClick}>
        <ListItemIcon className={classes.listItemIcon}>
          <Pages />
        </ListItemIcon>
        <ListItemText primary="Pages" />
        {pageSubMenuOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={pageSubMenuOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => navigate("/Restuarants")}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Toc />
            </ListItemIcon>
            <ListItemText primary="Restuarant" />
          </ListItem>
          <ListItem
            button
            className={classes.nested}
            onClick={() => navigate("/Products")}
          >
            <ListItemIcon className={classes.listItemIcon}>
              <Toc />
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>
        </List>
      </Collapse>
    </div>,
  ];

  return (
    <>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Box display="flex" className="header-items" flexGrow={1} justifyContent="space-between">
              <img
                src={"../logo-main.png"}
                width="40px"
                alt="Logo"
                style={{ marginRight: 16 }}
              />
            <Box display="flex" className="profile-items"alignItems="center">
              <Typography className={classes.profile} noWrap>
                Sarah Kortney
              </Typography>
              <Avatar
                aria-describedby={id}
                onClick={handleClick}
                style={{
                  marginLeft: 16,
                  backgroundColor: theme.palette.secondary.main,
                  cursor: "pointer",
                }}
              >
                <Person />
              </Avatar>
              <Popover
                id={id}
                open={popperOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                style={{ cursor: "pointer" }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Button className={classes.typography} onClick={() => {}}>
                  Sign Out
                </Button>
              </Popover>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme?.direction === "rtl" ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
          <Typography variant="h6" noWrap style={{ fontWeight: "bold" }}>
                
              </Typography>
        </div>
        <Divider />
        <List>{navigationMenu.map((item) => item)}</List>
      </Drawer>
    </>
  );
}

export default AppHeader;
