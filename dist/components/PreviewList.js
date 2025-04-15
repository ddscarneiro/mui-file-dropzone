import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
function PreviewList(props) {
    const { fileObjects, handleRemove, showFileNames, useChipsForPreview, previewChipProps, previewGridClasses, previewGridProps, classes, getPreviewIcon, } = props;
    const sxGridContainer = useMemo(() => ({
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        gap: useChipsForPreview ? 1 : 8,
    }), [useChipsForPreview]);
    const sxImageContainer = useMemo(() => ({
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        "& img": {
            height: 100,
            width: "initial",
            maxWidth: "100%",
            color: "text.primary",
            transition: "all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms",
            boxSizing: "border-box",
            boxShadow: "rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px",
            borderRadius: 1,
            zIndex: 5,
            opacity: 1,
        },
        "&:hover svg": {
            opacity: 0.3,
        },
        "&:hover button": {
            opacity: 1,
        },
    }), []);
    const sxRemoveButton = useMemo(() => ({
        transition: ".5s ease",
        position: "absolute",
        opacity: 0,
        top: -16,
        right: -16,
        width: 40,
        height: 40,
        "&:focus": {
            opacity: 1,
        },
    }), []);
    if (useChipsForPreview) {
        return (React.createElement(Box, Object.assign({ sx: sxGridContainer }, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.container, { className: clsx(classes === null || classes === void 0 ? void 0 : classes.root, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.container) }), fileObjects.map((fileObject, i) => {
            return (React.createElement(Box, Object.assign({}, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.item, { key: i, sx: sxImageContainer, className: classes === null || classes === void 0 ? void 0 : classes.imageContainer }),
                React.createElement(Chip, Object.assign({ variant: "outlined" }, previewChipProps, { label: fileObject.file.name, onDelete: handleRemove(i) }))));
        })));
    }
    return (React.createElement(Box, Object.assign({ sx: sxGridContainer }, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.container, { className: clsx(classes === null || classes === void 0 ? void 0 : classes.root, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.container) }), fileObjects.map((fileObject, i) => {
        return (React.createElement(Box, Object.assign({}, previewGridProps === null || previewGridProps === void 0 ? void 0 : previewGridProps.item, { key: i, sx: sxImageContainer, className: clsx(classes === null || classes === void 0 ? void 0 : classes.imageContainer, previewGridClasses === null || previewGridClasses === void 0 ? void 0 : previewGridClasses.item) }),
            getPreviewIcon(fileObject, classes),
            showFileNames ? (React.createElement(Typography, { component: "p" }, fileObject.file.name)) : null,
            React.createElement(Fab, { onClick: handleRemove(i), "aria-label": "Delete", sx: sxRemoveButton, className: classes === null || classes === void 0 ? void 0 : classes.removeButton },
                React.createElement(DeleteIcon, null))));
    })));
}
PreviewList.propTypes = {
    classes: PropTypes.object,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPreviewIcon: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
};
export default PreviewList;
//# sourceMappingURL=PreviewList.js.map