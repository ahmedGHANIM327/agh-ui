import type { FC } from "react";
import type { IconProps } from "../../icons/types.ts";
import { IconRegistry, type IconName } from "../../icons/IconRegistry.ts";

interface Props extends IconProps {
    name: IconName;
}

const Icon: FC<Props> = ({ name, ...props }) => {
    const IconComponent = IconRegistry[name];
    return <>
        <IconComponent {...props} />
    </>;
};

export default Icon;
