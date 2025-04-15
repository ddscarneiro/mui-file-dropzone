import { __awaiter } from "tslib";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createFileFromUrl, readFile } from "../helpers";
import DropzoneDialogBase from "./DropzoneDialogBase";
/**
 * This component provides an uncontrolled version of the DropzoneDialogBase component.
 *
 * It supports all the Props and Methods from `DropzoneDialogBase` but keeps the files state internally.
 *
 * **Note** The `onSave` handler also returns `File[]` with all the accepted files.
 */
class DropzoneDialog extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            fileObjects: [],
        };
        this.notifyFileChange = () => {
            const { onChange } = this.props;
            const { fileObjects } = this.state;
            if (onChange) {
                onChange(fileObjects.map((fileObject) => fileObject.file));
            }
        };
        this.loadInitialFiles = () => __awaiter(this, void 0, void 0, function* () {
            const { initialFiles = DropzoneDialog.defaultProps.initialFiles } = this.props;
            try {
                const fileObjs = yield Promise.all(initialFiles.map((initialFile) => __awaiter(this, void 0, void 0, function* () {
                    let file;
                    if (typeof initialFile === "string") {
                        file = yield createFileFromUrl(initialFile);
                    }
                    else {
                        file = initialFile;
                    }
                    const data = yield readFile(file);
                    const fileObj = { file, data };
                    return fileObj;
                })));
                this.setState((state) => ({
                    fileObjects: [...state.fileObjects, ...fileObjs],
                }), this.notifyFileChange);
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        });
        this.addFiles = (newFileObjects) => __awaiter(this, void 0, void 0, function* () {
            const { filesLimit = DropzoneDialog.defaultProps.filesLimit } = this.props;
            // Update component state
            this.setState((state) => {
                // Handle a single file
                if (filesLimit <= 1) {
                    return {
                        fileObjects: [newFileObjects[0]],
                    };
                }
                // Handle multiple files
                return {
                    fileObjects: [...state.fileObjects, ...newFileObjects],
                };
            }, this.notifyFileChange);
        });
        this.deleteFile = (removedFileObj, removedFileObjIdx) => {
            event === null || event === void 0 ? void 0 : event.stopPropagation();
            const { onDelete } = this.props;
            const { fileObjects } = this.state;
            // Calculate remaining fileObjects array
            const remainingFileObjs = fileObjects.filter((fileObject, i) => {
                return i !== removedFileObjIdx;
            });
            // Notify removed file
            if (onDelete) {
                onDelete(removedFileObj.file);
            }
            // Update local state
            this.setState({ fileObjects: remainingFileObjs }, this.notifyFileChange);
        };
        this.handleClose = (evt, reason) => {
            const { clearOnUnmount, onClose } = this.props;
            if (onClose) {
                onClose(evt, reason);
            }
            if (clearOnUnmount) {
                this.setState({ fileObjects: [] }, this.notifyFileChange);
            }
        };
        this.handleSave = (evt) => {
            const { clearOnUnmount, onSave } = this.props;
            const { fileObjects } = this.state;
            if (onSave) {
                onSave(fileObjects.map((fileObject) => fileObject.file), evt);
            }
            if (clearOnUnmount) {
                this.setState({ fileObjects: [] }, this.notifyFileChange);
            }
        };
    }
    componentDidMount() {
        this.loadInitialFiles();
    }
    componentWillUnmount() {
        const { clearOnUnmount } = this.props;
        if (clearOnUnmount) {
            this.setState({ fileObjects: [] }, this.notifyFileChange);
        }
    }
    render() {
        const { fileObjects } = this.state;
        return (React.createElement(DropzoneDialogBase, Object.assign({}, this.props, { fileObjects: fileObjects, onAdd: this.addFiles, onDelete: this.deleteFile, onClose: this.handleClose, onSave: this.handleSave })));
    }
}
DropzoneDialog.propTypes = Object.assign(Object.assign({}, DropzoneDialogBase.propTypes), { clearOnUnmount: PropTypes.bool, filesLimit: PropTypes.number, initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])), onSave: PropTypes.func });
DropzoneDialog.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
};
export default DropzoneDialog;
//# sourceMappingURL=DropzoneDialog.js.map