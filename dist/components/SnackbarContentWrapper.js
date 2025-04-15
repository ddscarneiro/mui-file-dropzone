import { __rest } from "tslib";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import { Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SnackbarContent from "@mui/material/SnackbarContent";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { forwardRef, useMemo } from "react";
const variantIcon = {
    error: ErrorIcon,
    info: InfoIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
};
const SnackbarContentWrapper = forwardRef(function SnackbarContentWrapper(props, ref) {
    const { classes, className, message, onClose, variant = "info" } = props, other = __rest(props, ["classes", "className", "message", "onClose", "variant"]);
    const Icon = variantIcon[variant];
    const sx = useMemo(() => ({
        icon: {
            fontSize: 20,
            opacity: 0.9,
        },
        message: {
            display: "flex",
            alignItems: "center",
            "& > svg": {
                marginRight: 1,
            },
        },
    }), []);
    const sxVariant = useMemo(() => ({ backgroundColor: `${variant}.main` }), [variant]);
    return (React.createElement(SnackbarContent, Object.assign({ ref: ref, sx: sxVariant, className: clsx(classes === null || classes === void 0 ? void 0 : classes[variant], className), "aria-describedby": "client-snackbar", message: React.createElement(Box, { component: "span", id: "client-snackbar", sx: sx.message, className: classes === null || classes === void 0 ? void 0 : classes.message },
            React.createElement(Icon, { sx: sx.icon, className: classes === null || classes === void 0 ? void 0 : classes.icon }),
            message), action: React.createElement(IconButton, { key: "close", "aria-label": "Close", color: "inherit", className: classes === null || classes === void 0 ? void 0 : classes.closeButton, onClick: onClose },
            React.createElement(CloseIcon, { sx: sx.icon, className: classes === null || classes === void 0 ? void 0 : classes.icon })) }, other)));
});
SnackbarContentWrapper.propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(["success", "warning", "error", "info"]),
};
export default SnackbarContentWrapper;
//# sourceMappingURL=SnackbarContentWrapper.js.map