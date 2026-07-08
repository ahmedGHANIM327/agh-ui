import PlusIcon from "./elements/PlusIcon";
import EditIcon from "./elements/EditIcon";
import SpinnerIcon from "./elements/SpinnerIcon";
import EyeIcon from "./elements/EyeIcon.tsx";
import EyeOffIcon from "./elements/EyeOffIcon.tsx";
import ChevronUpIcon from "./elements/ChevronUpIcon.tsx";
import ChevronDownIcon from "./elements/ChevronDownIcon.tsx";
import TrashIcon from "./elements/TrashIcon.tsx";
import CheckIcon from "./elements/CheckIcon.tsx";
import XIcon from "./elements/XIcon.tsx";
import ChevronLeftIcon from "./elements/ChevronLeftIcon.tsx";
import ChevronRightIcon from "./elements/ChevronRightIcon.tsx";
import SearchIcon from "./elements/SearchIcon.tsx";
import AlertCircleIcon from "./elements/AlertCircleIcon.tsx";
import AlertTriangleIcon from "./elements/AlertTriangleIcon.tsx";
import InfoIcon from "./elements/InfoIcon.tsx";
import SettingsIcon from "./elements/SettingsIcon.tsx";
import UserIcon from "./elements/UserIcon.tsx";
import HomeIcon from "./elements/HomeIcon.tsx";
import MenuIcon from "./elements/MenuIcon";
import ChevronsUpDownIcon from "./elements/ChevronsUpDownIcon";
import ChevronsLeftIcon from "./elements/ChevronsLeftIcon";
import ChevronsRightIcon from "./elements/ChevronsRightIcon";
import SunIcon from "./elements/SunIcon";
import MoonIcon from "./elements/MoonIcon";
import CopyIcon from "./elements/CopyIcon";

export const IconRegistry = {
    plus: PlusIcon,
    edit: EditIcon,
    trash: TrashIcon,
    check: CheckIcon,
    x: XIcon,

    spinner: SpinnerIcon,

    eye: EyeIcon,
    eyeOff: EyeOffIcon,

    chevronUp: ChevronUpIcon,
    chevronDown: ChevronDownIcon,
    chevronLeft: ChevronLeftIcon,
    chevronRight: ChevronRightIcon,

    search: SearchIcon,
    alertCircle: AlertCircleIcon,
    alertTriangle: AlertTriangleIcon,
    info: InfoIcon,

    settings: SettingsIcon,
    user: UserIcon,
    home: HomeIcon,
    menu: MenuIcon,
    chevronsUpDown: ChevronsUpDownIcon,
    chevronsLeft: ChevronsLeftIcon,
    chevronsRight: ChevronsRightIcon,
    sun: SunIcon,
    moon: MoonIcon,
    copy: CopyIcon,
} as const;

export type IconName = keyof typeof IconRegistry;


export const ICON_NAMES = Object.keys(
    IconRegistry,
) as IconName[];