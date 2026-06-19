import {
    createContext,
    useContext,
    Children,
    cloneElement,
    isValidElement,
    Fragment,
    type FC,
    type ReactNode,
    type ReactElement,
} from "react";
import styles from "./Stepper.module.css";
import Icon from "../icon/Icon";

const s = (cls: string): string => styles[cls] ?? '';

/* ── Types ── */

export type StepperDirection = "horizontal" | "vertical";

/* ── Context ── */

interface StepperContextValue {
    current: number;
    direction: StepperDirection;
    total: number;
}

const StepperContext = createContext<StepperContextValue | null>(null);

const useStepper = (): StepperContextValue => {
    const ctx = useContext(StepperContext);
    if (!ctx) throw new Error("Step must be used inside <Stepper>.");
    return ctx;
};

/* ── Stepper (root) ── */

export interface StepperProps {
    /** 0-based index of the active step. */
    current: number;
    direction?: StepperDirection;
    children: ReactNode;
    className?: string;
}

const Stepper: FC<StepperProps> = ({
    current,
    direction = "horizontal",
    children,
    className = "",
}) => {
    const steps = Children.toArray(children);
    const total = steps.length;

    return (
        <StepperContext.Provider value={{ current, direction, total }}>
            <div
                className={[
                    s('stepper'),
                    s(`stepper--${direction}`),
                    className,
                ].filter(Boolean).join(' ')}
            >
                {steps.map((step, index) => {
                    const isLast        = index === total - 1;
                    const connectorFilled = index < current;

                    const stepEl = isValidElement(step)
                        ? cloneElement(step as ReactElement<StepProps & { _index: number }>, { _index: index })
                        : step;

                    return (
                        <Fragment key={index}>
                            {stepEl}
                            {/* Horizontal connector — rendered by Stepper between steps */}
                            {!isLast && direction === 'horizontal' && (
                                <div
                                    className={[
                                        s('stepper__connector'),
                                        connectorFilled ? s('stepper__connector--filled') : '',
                                    ].filter(Boolean).join(' ')}
                                />
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </StepperContext.Provider>
    );
};

/* ── Step ── */

export interface StepProps {
    /** Text label of the step. */
    title?: string;
    /** Helper text below the title. */
    description?: string;
    /**
     * Badge content: a number, a string, or any ReactNode.
     * If omitted: a dot is shown when upcoming, a check icon when attended.
     */
    step?: ReactNode;
    className?: string;
    /** @internal — injected by Stepper via cloneElement */
    _index?: number;
}

const Step: FC<StepProps> = ({
    title,
    description,
    step,
    className = "",
    _index = 0,
}) => {
    const { current, direction, total } = useStepper();

    const isAttended       = _index <= current; // active + completed
    const isActive         = _index === current;
    const isCompleted      = _index < current;
    const isLast           = _index === total - 1;
    const isConnectorFilled = _index < current;

    /* Badge default: dot when upcoming, check when attended */
    const badgeContent =
        step !== undefined
            ? step
            : isCompleted
                ? <Icon name="check" size={14} />
                : isActive
                    ? <span className={s('step__dot')} />  // primary-colored dot
                    : <span className={s('step__dot')} />; // muted dot

    return (
        <div
            data-state={isActive ? 'active' : isAttended ? 'attended' : 'upcoming'}
            className={[
                s('step'),
                s(`step--${direction}`),
                isAttended ? s('step--attended') : s('step--upcoming'),
                isActive   ? s('step--active')   : '',
                className,
            ].filter(Boolean).join(' ')}
        >
            {/* Left/top track: badge + vertical connector */}
            <div className={s('step__track')}>
                <span
                    className={[
                        s('step__badge'),
                        isAttended ? s('step__badge--attended') : s('step__badge--upcoming'),
                    ].filter(Boolean).join(' ')}
                >
                    {badgeContent}
                </span>

                {/* Vertical connector lives inside the track so it grows with content */}
                {!isLast && direction === 'vertical' && (
                    <div
                        className={[
                            s('step__v-connector'),
                            isConnectorFilled ? s('step__v-connector--filled') : '',
                        ].filter(Boolean).join(' ')}
                    />
                )}
            </div>

            {/* Text content */}
            {(title || description) && (
                <div
                    className={[
                        s('step__content'),
                        s(`step__content--${direction}`),
                        isLast ? s('step__content--last') : '',
                    ].filter(Boolean).join(' ')}
                >
                    {title && (
                        <span
                            className={[
                                s('step__title'),
                                isAttended ? s('step__title--attended') : s('step__title--upcoming'),
                            ].filter(Boolean).join(' ')}
                        >
                            {title}
                        </span>
                    )}
                    {description && (
                        <span className={s('step__description')}>
                            {description}
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

/* ── Exports ── */

export { Step };
export default Stepper;
