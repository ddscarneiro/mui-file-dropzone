import { __awaiter, __rest } from "tslib";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { createFileFromUrl, readFile } from "../helpers";
import DropzoneAreaBase from "./DropzoneAreaBase";
const splitDropzoneAreaProps = (props) => {
    const { clearOnUnmount, initialFiles, onChange, onDelete } = props, dropzoneAreaBaseProps = __rest(props, ["clearOnUnmount", "initialFiles", "onChange", "onDelete"]);
    const dropzoneAreaProps = {
        clearOnUnmount,
        initialFiles,
        onChange,
        onDelete,
    };
    const splitProps = [
        dropzoneAreaProps,
        dropzoneAreaBaseProps,
    ];
    return splitProps;
};
/**
 * This components creates an uncontrolled Material-UI Dropzone, with previews and snackbar notifications.
 *
 * It supports all props of `DropzoneAreaBase` but keeps the files state internally.
 *
 * **Note** To listen to file changes use `onChange` event handler and notice that `onDelete` returns a `File` instance instead of `FileObject`.
 */
class DropzoneArea extends PureComponent {
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
            const { initialFiles = DropzoneArea.defaultProps.initialFiles } = this.props;
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
                this.setState((prevState) => ({
                    fileObjects: [...prevState.fileObjects, ...fileObjs],
                }), this.notifyFileChange);
            }
            catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            }
        });
        this.addFiles = (newFileObjects) => __awaiter(this, void 0, void 0, function* () {
            const { filesLimit = DropzoneArea.defaultProps.filesLimit } = this.props;
            // Update component state
            this.setState((prevState) => {
                // Handle a single file
                if (filesLimit <= 1) {
                    return {
                        fileObjects: [newFileObjects[0]],
                    };
                }
                // Handle multiple files
                return {
                    fileObjects: [...prevState.fileObjects, ...newFileObjects],
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
        const [, dropzoneAreaBaseProps] = splitDropzoneAreaProps(this.props);
        const { fileObjects } = this.state;
        return (React.createElement(DropzoneAreaBase, Object.assign({}, dropzoneAreaBaseProps, { fileObjects: fileObjects, onAdd: this.addFiles, onDelete: this.deleteFile })));
    }
}
DropzoneArea.propTypes = Object.assign(Object.assign({}, DropzoneAreaBase.propTypes), { clearOnUnmount: PropTypes.bool, initialFiles: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.any])), filesLimit: PropTypes.number, onChange: PropTypes.func, onDelete: PropTypes.func });
DropzoneArea.defaultProps = {
    clearOnUnmount: true,
    filesLimit: 3,
    initialFiles: [],
};
export default DropzoneArea;
//# sourceMappingURL=DropzoneArea.js.map