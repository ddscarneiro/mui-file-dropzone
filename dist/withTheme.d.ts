import { Theme } from "@mui/material";
import React, { ComponentType } from "react";
declare function withTheme<P extends {
    theme?: Theme;
}>(Component: ComponentType<P>): React.ForwardRefExoticComponent<Omit<any, "ref"> & React.RefAttributes<unknown>>;
export { withTheme };
//# sourceMappingURL=withTheme.d.ts.map