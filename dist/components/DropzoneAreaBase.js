import { __awaiter } from "tslib";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { Fragment, PureComponent, } from "react";
import Dropzone from "react-dropzone";
import { convertBytesToMbsOrKbs, isImage, readFile } from "../helpers";
import { withTheme } from "../withTheme";
import PreviewList from "./PreviewList";
import SnackbarContentWrapper from "./SnackbarContentWrapper";
const defaultSnackbarAnchorOrigin = {
    horizontal: "left",
    vertical: "bottom",
};
const defaultGetPreviewIcon = (fileObject, classes) => {
    const { data, file } = fileObject || {};
    if (isImage(file)) {
        const src = typeof data === "string" ? data : undefined;
        return React.createElement("img", { className: classes === null || classes === void 0 ? void 0 : classes.image, role: "presentation", src: src });
    }
    return (React.createElement(AttachFileIcon, { sx: {
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
        }, className: classes === null || classes === void 0 ? void 0 : classes.image }));
};
export const FileObjectShape = PropTypes.shape({
    file: PropTypes.object,
    data: PropTypes.any,
});
/**
 * This components creates a Material-UI Dropzone, with previews and snackbar notifications.
 */
class DropzoneAreaBase extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            openSnackBar: false,
            snackbarMessage: "",
            snackbarVariant: "success",
        };
        this.handleDropAccepted = (acceptedFiles, evt) => __awaiter(this, void 0, void 0, function* () {
            const { fileObjects, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, getFileAddedMessage = DropzoneAreaBase.defaultProps.getFileAddedMessage, getFileLimitExceedMessage = DropzoneAreaBase.defaultProps
                .getFileLimitExceedMessage, onAdd, onDrop, } = this.props;
            if (filesLimit > 1 &&
                fileObjects.length + acceptedFiles.length > filesLimit) {
                this.setState({
                    openSnackBar: true,
                    snackbarMessage: getFileLimitExceedMessage(filesLimit),
                    snackbarVariant: "error",
                }, this.notifyAlert);
                return;
            }
            // Notify Drop event
            if (onDrop) {
                onDrop(acceptedFiles, evt);
            }
            // Retrieve fileObjects data
            const fileObjs = yield Promise.all(acceptedFiles.map((file) => __awaiter(this, void 0, void 0, function* () {
                const data = yield readFile(file);
                return {
                    file,
                    data,
                };
            })));
            // Notify added files
            if (onAdd) {
                onAdd(fileObjs);
            }
            // Display message
            const message = fileObjs.reduce((msg, fileObj) => msg + getFileAddedMessage(fileObj.file.name), "");
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "success",
            }, this.notifyAlert);
        });
        this.handleDropRejected = (rejectedFiles, evt) => {
            const { acceptedFiles, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, fileObjects, getDropRejectMessage = DropzoneAreaBase.defaultProps.getDropRejectMessage, getFileLimitExceedMessage = DropzoneAreaBase.defaultProps
                .getFileLimitExceedMessage, maxFileSize = DropzoneAreaBase.defaultProps.maxFileSize, onDropRejected, } = this.props;
            let message = "";
            if (fileObjects.length + rejectedFiles.length > filesLimit) {
                message = getFileLimitExceedMessage(filesLimit);
            }
            else {
                rejectedFiles.forEach((rejectedFile) => {
                    message = getDropRejectMessage(rejectedFile, acceptedFiles || [], maxFileSize);
                });
            }
            if (onDropRejected) {
                onDropRejected(rejectedFiles, evt);
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: message,
                snackbarVariant: "error",
            }, this.notifyAlert);
        };
        this.handleRemove = (fileIndex) => (event) => {
            event.stopPropagation();
            const { fileObjects, getFileRemovedMessage = DropzoneAreaBase.defaultProps
                .getFileRemovedMessage, onDelete, } = this.props;
            // Find removed fileObject
            const removedFileObj = fileObjects[fileIndex];
            // Notify removed file
            if (onDelete) {
                onDelete(removedFileObj, fileIndex);
            }
            this.setState({
                openSnackBar: true,
                snackbarMessage: getFileRemovedMessage(removedFileObj.file.name),
                snackbarVariant: "info",
            }, this.notifyAlert);
        };
        this.handleCloseSnackbar = () => {
            this.setState({
                openSnackBar: false,
            });
        };
        this.defaultSx = {
            root: {
                "@keyframes progress": {
                    "0%": {
                        backgroundPosition: "0 0",
                    },
                    "100%": {
                        backgroundPosition: "-70px 0",
                    },
                },
                position: "relative",
                width: "100%",
                minHeight: "250px",
                backgroundColor: "background.paper",
                border: "dashed",
                borderColor: "divider",
                borderRadius: 1,
                boxSizing: "border-box",
                cursor: "pointer",
                overflow: "hidden",
            },
            active: {
                animation: "$progress 2s linear infinite !important",
                backgroundImage: `repeating-linear-gradient(-45deg, ${this.props.theme.palette.background.paper}, ${this.props.theme.palette.background.paper} 25px, ${this.props.theme.palette.divider} 25px, ${this.props.theme.palette.divider} 50px)`,
                backgroundSize: "150% 100%",
                border: "solid",
                borderColor: "primary.light",
            },
            invalid: {
                backgroundImage: `repeating-linear-gradient(-45deg, ${this.props.theme.palette.error.light}, ${this.props.theme.palette.error.light} 25px, ${this.props.theme.palette.error.dark} 25px, ${this.props.theme.palette.error.dark} 50px)`,
                borderColor: "error.main",
            },
            textContainer: {
                textAlign: "center",
            },
            text: {
                marginBottom: 3,
                marginTop: 3,
            },
            icon: {
                width: 51,
                height: 51,
                color: "text.primary",
            },
        };
    }
    notifyAlert() {
        const { onAlert } = this.props;
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state;
        if (openSnackBar && onAlert) {
            onAlert(snackbarMessage, snackbarVariant);
        }
    }
    render() {
        const { acceptedFiles, alertSnackbarProps, classes = {}, disableRejectionFeedback, dropzoneClass, dropzoneParagraphClass, dropzoneProps, dropzoneText, fileObjects, filesLimit = DropzoneAreaBase.defaultProps.filesLimit, getPreviewIcon = DropzoneAreaBase.defaultProps.getPreviewIcon, Icon, inputProps, maxFileSize, previewChipProps, previewGridClasses, previewGridProps, previewText, showAlerts, showFileNames, showFileNamesInPreview, showPreviews, showPreviewsInDropzone, useChipsForPreview, } = this.props;
        const { openSnackBar, snackbarMessage, snackbarVariant } = this.state;
        const acceptFiles = acceptedFiles === null || acceptedFiles === void 0 ? void 0 : acceptedFiles.join(",");
        const isMultiple = filesLimit > 1;
        const previewsVisible = showPreviews && fileObjects.length > 0;
        const previewsInDropzoneVisible = showPreviewsInDropzone && fileObjects.length > 0;
        return (React.createElement(Fragment, null,
            React.createElement(Dropzone, Object.assign({}, dropzoneProps, { accept: acceptFiles, onDropAccepted: this.handleDropAccepted, onDropRejected: this.handleDropRejected, maxSize: maxFileSize, multiple: isMultiple }), ({ getRootProps, getInputProps, isDragActive, isDragReject }) => {
                const isActive = isDragActive;
                const isInvalid = !disableRejectionFeedback && isDragReject;
                return (React.createElement(Box, Object.assign({ sx: Object.assign(Object.assign(Object.assign({}, this.defaultSx.root), (isActive ? this.defaultSx.active : {})), (isInvalid ? this.defaultSx.invalid : {})) }, getRootProps({
                    className: clsx(classes.root, dropzoneClass, isActive && classes.active, isInvalid && classes.invalid),
                })),
                    React.createElement("input", Object.assign({}, getInputProps(inputProps))),
                    React.createElement(Box, { sx: this.defaultSx.textContainer, className: classes.textContainer },
                        React.createElement(Typography, { variant: "h5", component: "p", sx: this.defaultSx.text, className: clsx(classes.text, dropzoneParagraphClass) }, dropzoneText),
                        Icon ? (React.createElement(Icon, { sx: this.defaultSx.icon, className: classes.icon })) : (React.createElement(CloudUploadIcon, { sx: this.defaultSx.icon, className: classes.icon }))),
                    previewsInDropzoneVisible ? (React.createElement(PreviewList, { fileObjects: fileObjects, handleRemove: this.handleRemove, getPreviewIcon: getPreviewIcon, showFileNames: showFileNames, useChipsForPreview: useChipsForPreview, previewChipProps: previewChipProps, previewGridClasses: previewGridClasses, previewGridProps: previewGridProps })) : null));
            }),
            previewsVisible ? (React.createElement(Fragment, null,
                React.createElement(Typography, { variant: "subtitle1", component: "span" }, previewText),
                React.createElement(PreviewList, { fileObjects: fileObjects, handleRemove: this.handleRemove, getPreviewIcon: getPreviewIcon, showFileNames: showFileNamesInPreview, useChipsForPreview: useChipsForPreview, previewChipProps: previewChipProps, previewGridClasses: previewGridClasses, previewGridProps: previewGridProps }))) : null,
            (typeof showAlerts === "boolean" && showAlerts) ||
                (Array.isArray(showAlerts) && showAlerts.includes(snackbarVariant)) ? (React.createElement(Snackbar, Object.assign({ anchorOrigin: defaultSnackbarAnchorOrigin, autoHideDuration: 6000 }, alertSnackbarProps, { open: openSnackBar, onClose: this.handleCloseSnackbar }),
                React.createElement(SnackbarContentWrapper, { onClose: this.handleCloseSnackbar, variant: snackbarVariant, message: snackbarMessage }))) : null));
    }
}
DropzoneAreaBase.propTypes = {
    classes: PropTypes.object,
    acceptedFiles: PropTypes.arrayOf(PropTypes.string),
    filesLimit: PropTypes.number,
    Icon: PropTypes.elementType,
    fileObjects: PropTypes.arrayOf(FileObjectShape),
    maxFileSize: PropTypes.number,
    dropzoneText: PropTypes.string,
    dropzoneClass: PropTypes.string,
    dropzoneParagraphClass: PropTypes.string,
    disableRejectionFeedback: PropTypes.bool,
    showPreviews: PropTypes.bool,
    showPreviewsInDropzone: PropTypes.bool,
    showFileNames: PropTypes.bool,
    showFileNamesInPreview: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    previewText: PropTypes.string,
    showAlerts: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.arrayOf(PropTypes.oneOf(["error", "success", "info", "warning"])),
    ]),
    alertSnackbarProps: PropTypes.object,
    dropzoneProps: PropTypes.object,
    inputProps: PropTypes.object,
    getFileLimitExceedMessage: PropTypes.func,
    getFileAddedMessage: PropTypes.func,
    getFileRemovedMessage: PropTypes.func,
    getDropRejectMessage: PropTypes.func,
    getPreviewIcon: PropTypes.func,
    onAdd: PropTypes.func,
    onDelete: PropTypes.func,
    onDrop: PropTypes.func,
    onDropRejected: PropTypes.func,
    onAlert: PropTypes.func,
};
DropzoneAreaBase.defaultProps = {
    acceptedFiles: [],
    filesLimit: 3,
    fileObjects: [],
    maxFileSize: 3000000,
    dropzoneText: "Drag and drop a file here or click",
    previewText: "Preview:",
    disableRejectionFeedback: false,
    showPreviews: false,
    showPreviewsInDropzone: true,
    showFileNames: false,
    showFileNamesInPreview: false,
    useChipsForPreview: false,
    previewChipProps: {},
    previewGridClasses: {},
    previewGridProps: {},
    showAlerts: true,
    alertSnackbarProps: {
        anchorOrigin: {
            horizontal: "left",
            vertical: "bottom",
        },
        autoHideDuration: 6000,
    },
    getFileLimitExceedMessage: ((filesLimit) => `Maximum allowed number of files exceeded. Only ${filesLimit} allowed`),
    getFileAddedMessage: ((fileName) => `File ${fileName} successfully added.`),
    getPreviewIcon: defaultGetPreviewIcon,
    getFileRemovedMessage: ((fileName) => `File ${fileName} removed.`),
    getDropRejectMessage: ((rejectedFile, acceptedFiles, maxFileSize) => {
        let message = `File ${rejectedFile.name} was rejected. `;
        if (!acceptedFiles.includes(rejectedFile.type)) {
            message += "File type not supported. ";
        }
        if (rejectedFile.size > maxFileSize) {
            message +=
                "File is too big. Size limit is " +
                    convertBytesToMbsOrKbs(maxFileSize) +
                    ". ";
        }
        return message;
    }),
};
// @ts-expect-error
const ThemedDropzoneAreaBase = withTheme(DropzoneAreaBase);
export default ThemedDropzoneAreaBase;
//# sourceMappingURL=DropzoneAreaBase.js.map