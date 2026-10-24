import { type ComponentProps, type FC, useState } from "react";
import Icon from "../icon/Icon";
import Badge from "../badge/Badge";
import type { IconName } from "../../icons/IconRegistry";
import styles from "./SidebarNav.module.css";

const s = (cls: string): string => styles[cls] ?? '';

export type SidebarNavBadgeProps = ComponentProps<typeof Badge>;

export interface SidebarNavItem {
    id?: string;
    label: string;
    icon?: IconName;
    /** Without `to`, the item is not clickable and can't be selected */
    to?: string;
    disabled?: boolean;
    hide?: boolean;
    isActive?: boolean;
    /** Badge displayed next to the label */
    badge?: SidebarNavBadgeProps;
    subItems?: SidebarNavItem[];
}

export interface SidebarNavBlock {
    id?: string;
    title?: string;
    titleIcon?: IconName;
    items: SidebarNavItem[];
}

export interface SidebarNavProps {
    blocks: SidebarNavBlock[];
    /** Called when an item with `to` is clicked (useful for client-side routing) */
    onNavigate?: (to: string, item: SidebarNavItem) => void;
    className?: string;
}

interface NavItemProps {
    item: SidebarNavItem;
    depth: number;
    onNavigate?: SidebarNavProps["onNavigate"];
}

const hasActiveChild = (item: SidebarNavItem): boolean =>
    !!item.subItems?.some((sub) => sub.isActive || hasActiveChild(sub));

const NavItem: FC<NavItemProps> = ({ item, depth, onNavigate }) => {
    const subItems = item.subItems?.filter((sub) => !sub.hide) ?? [];
    const hasSub = subItems.length > 0;
    const [open, setOpen] = useState(() => hasActiveChild(item));

    const clickable = !item.disabled && (!!item.to || hasSub);
    const selectable = !item.disabled && !!item.to;

    const classes = [
        s('sidebar-nav__item'),
        item.isActive ? s('sidebar-nav__item--active') : '',
        clickable ? s('sidebar-nav__item--clickable') : '',
        item.disabled ? s('sidebar-nav__item--disabled') : '',
        depth > 0 ? s('sidebar-nav__item--sub') : '',
    ]
        .filter(Boolean)
        .join(' ');

    const content = (
        <>
            {item.icon && <Icon name={item.icon} size={16} />}
            <span className={s('sidebar-nav__label')}>{item.label}</span>
            {item.badge && <Badge size="sm" {...item.badge} />}
            {hasSub && (
                <span className={[s('sidebar-nav__chevron'), open ? s('sidebar-nav__chevron--open') : ''].filter(Boolean).join(' ')}>
                    <Icon name="chevronRight" size={14} />
                </span>
            )}
        </>
    );

    const handleClick = () => {
        if (hasSub) setOpen((o) => !o);
        if (selectable) onNavigate?.(item.to as string, item);
    };

    return (
        <li className={s('sidebar-nav__entry')}>
            {selectable && !hasSub ? (
                <a
                    href={item.to}
                    className={classes}
                    aria-current={item.isActive ? "page" : undefined}
                    onClick={(e) => {
                        if (onNavigate) {
                            e.preventDefault();
                            handleClick();
                        }
                    }}
                >
                    {content}
                </a>
            ) : (
                <button
                    type="button"
                    className={classes}
                    disabled={!clickable}
                    aria-expanded={hasSub ? open : undefined}
                    aria-current={item.isActive ? "page" : undefined}
                    onClick={handleClick}
                >
                    {content}
                </button>
            )}

            {hasSub && open && (
                <ul className={s('sidebar-nav__sub-list')}>
                    {subItems.map((sub, i) => (
                        <NavItem key={sub.id ?? `${sub.label}-${i}`} item={sub} depth={depth + 1} onNavigate={onNavigate} />
                    ))}
                </ul>
            )}
        </li>
    );
};

const SidebarNav: FC<SidebarNavProps> = ({ blocks, onNavigate, className = "" }) => {
    return (
        <nav className={[s('sidebar-nav'), className].filter(Boolean).join(' ')}>
            {blocks.map((block, index) => {
                const items = block.items.filter((item) => !item.hide);
                if (items.length === 0) return null;

                return (
                    <div key={block.id ?? `block-${index}`} className={s('sidebar-nav__block')}>
                        {block.title && (
                            <div className={s('sidebar-nav__title')}>
                                {block.titleIcon && <Icon name={block.titleIcon} size={14} />}
                                <span>{block.title}</span>
                            </div>
                        )}
                        <ul className={s('sidebar-nav__list')}>
                            {items.map((item, i) => (
                                <NavItem key={item.id ?? `${item.label}-${i}`} item={item} depth={0} onNavigate={onNavigate} />
                            ))}
                        </ul>
                    </div>
                );
            })}
        </nav>
    );
};

export default SidebarNav;
