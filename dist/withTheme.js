import { useTheme } from "@mui/material";
import React, { forwardRef } from "react";
function withTheme(Component) {
    return forwardRef(function ComponentWithTheme(props, ref) {
        const theme = useTheme();
        const combinedProps = Object.assign(Object.assign({}, props), { theme });
        return React.createElement(Component, Object.assign({ ref: ref }, combinedProps));
    });
}
export { withTheme };
//# sourceMappingURL=withTheme.js.map