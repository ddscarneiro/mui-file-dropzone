import { SnackbarContentProps } from "@mui/material/SnackbarContent";
import React from "react";
import { AlertType } from "../types";
export interface SnackbarContentWrapperProps extends Omit<SnackbarContentProps, "variant"> {
    classes?: {
        closeButton?: string;
        icon?: string;
        message?: string;
    } & Partial<Record<AlertType, string>>;
    onClose?: () => void;
    variant?: AlertType;
}
declare const SnackbarContentWrapper: React.ForwardRefExoticComponent<Omit<SnackbarContentWrapperProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
export default SnackbarContentWrapper;
//# sourceMappingURL=SnackbarContentWrapper.d.ts.map