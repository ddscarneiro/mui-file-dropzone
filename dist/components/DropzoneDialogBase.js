import { __rest } from "tslib";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import DropzoneAreaBase from "./DropzoneAreaBase";
// Split props related to DropzoneDialog from DropzoneArea ones
function splitDropzoneDialogProps(allProps) {
    const defaults = DropzoneDialogBase.defaultProps;
    const { cancelButtonText = defaults.cancelButtonText, dialogProps = defaults.dialogProps, dialogTitle = defaults.dialogTitle, fullWidth = defaults.fullWidth, maxWidth = defaults.maxWidth, onClose, onSave, open = defaults.open, submitButtonText = defaults.submitButtonText } = allProps, dropzoneAreaProps = __rest(allProps, ["cancelButtonText", "dialogProps", "dialogTitle", "fullWidth", "maxWidth", "onClose", "onSave", "open", "submitButtonText"]);
    const dropzoneDialogProps = {
        cancelButtonText,
        dialogProps,
        dialogTitle,
        fullWidth,
        maxWidth,
        onClose,
        onSave,
        open,
        submitButtonText,
    };
    const splitProps = [dropzoneDialogProps, dropzoneAreaProps];
    return splitProps;
}
/**
 * This component provides the DropzoneArea inside of a Material-UI Dialog.
 *
 * It supports all the Props and Methods from `DropzoneAreaBase`.
 */
class DropzoneDialogBase extends PureComponent {
    constructor() {
        super(...arguments);
        this.handlePressClose = (e) => {
            const { onClose } = this.props;
            onClose === null || onClose === void 0 ? void 0 : onClose(e, "backdropClick");
        };
    }
    render() {
        const [dropzoneDialogProps, dropzoneAreaProps] = splitDropzoneDialogProps(this.props);
        const { cancelButtonText, dialogProps, dialogTitle, fullWidth, maxWidth, onClose, onSave, open, submitButtonText, } = dropzoneDialogProps;
        // Submit button state
        const submitDisabled = dropzoneAreaProps.fileObjects.length === 0;
        return (React.createElement(Dialog, Object.assign({}, dialogProps, { fullWidth: fullWidth, maxWidth: maxWidth, onClose: onClose, open: open }),
            React.createElement(DialogTitle, null, dialogTitle),
            React.createElement(DialogContent, null,
                React.createElement(DropzoneAreaBase, Object.assign({}, dropzoneAreaProps))),
            React.createElement(DialogActions, null,
                React.createElement(Button, { onClick: this.handlePressClose }, cancelButtonText),
                React.createElement(Button, { variant: "contained", disabled: submitDisabled, onClick: onSave }, submitButtonText))));
    }
}
DropzoneDialogBase.propTypes = Object.assign(Object.assign({}, DropzoneAreaBase.propTypes), { open: PropTypes.bool, dialogTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]), dialogProps: PropTypes.object, fullWidth: PropTypes.bool, maxWidth: PropTypes.string, cancelButtonText: PropTypes.string, submitButtonText: PropTypes.string, onClose: PropTypes.func, onSave: PropTypes.func, showPreviews: PropTypes.bool, showPreviewsInDropzone: PropTypes.bool, showFileNamesInPreview: PropTypes.bool });
DropzoneDialogBase.defaultProps = {
    open: false,
    dialogTitle: "Upload file",
    dialogProps: {},
    fullWidth: true,
    maxWidth: "sm",
    cancelButtonText: "Cancel",
    submitButtonText: "Submit",
    showPreviews: true,
    showPreviewsInDropzone: false,
    showFileNamesInPreview: true,
};
export default DropzoneDialogBase;
//# sourceMappingURL=DropzoneDialogBase.js.map