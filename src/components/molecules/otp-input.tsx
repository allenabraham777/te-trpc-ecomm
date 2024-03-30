import React, {
    memo,
    useState,
    useCallback,
    useRef,
    useLayoutEffect,
} from 'react';
import Input, { InputProps } from '../atoms/input';
import usePrevRef from '@/hooks/usePrevRef';

export interface OTPInputProps {
    label?: string;
    length?: number;
    isNumberInput?: boolean;
    disabled?: boolean;
    onChange?: (otp: string) => any;
}

interface BaseInputProps extends InputProps {
    focus?: boolean;
}

const BaseInput = ({ focus, ...props }: BaseInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const prevFocus = usePrevRef(!!focus);
    useLayoutEffect(() => {
        if (inputRef.current) {
            if (focus && props.autoFocus) {
                inputRef.current.focus();
            }
            if (focus && props.autoFocus && focus !== prevFocus) {
                inputRef.current.focus();
                inputRef.current.select();
            }
        }
    }, [props.autoFocus, focus, prevFocus, inputRef]);
    return <Input ref={inputRef} {...props} />;
};

const OTPInputComponent = ({
    label,
    length = 8,
    isNumberInput,
    disabled,
    onChange,
}: OTPInputProps) => {
    const [activeInput, setActiveInput] = useState(0);
    const [otpValues, setOTPValues] = useState(Array<string>(length).fill(''));

    const handleOtpChange = useCallback(
        (otp: string[]) => {
            const otpValue = otp.join('');
            onChange?.(otpValue);
        },
        [onChange],
    );

    const getRightValue = useCallback(
        (str: string) => {
            let changedValue = str;
            if (!isNumberInput) {
                return changedValue;
            }
            return !changedValue || /\d/.test(changedValue) ? changedValue : '';
        },
        [isNumberInput],
    );

    const changeCodeAtFocus = useCallback(
        (str: string) => {
            const updatedOTPValues = [...otpValues];
            updatedOTPValues[activeInput] = str[0] || '';
            setOTPValues(updatedOTPValues);
            handleOtpChange(updatedOTPValues);
        },
        [activeInput, handleOtpChange, otpValues],
    );

    const focusInput = useCallback(
        (inputIndex: number) => {
            const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
            setActiveInput(selectedIndex);
        },
        [length],
    );

    const focusPrevInput = useCallback(() => {
        focusInput(activeInput - 1);
    }, [activeInput, focusInput]);

    const focusNextInput = useCallback(() => {
        focusInput(activeInput + 1);
    }, [activeInput, focusInput]);

    const handleOnFocus = useCallback(
        (index: number) => () => {
            focusInput(index);
        },
        [focusInput],
    );

    const handleOnChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = getRightValue(e.currentTarget.value);
            if (!val) {
                e.preventDefault();
                return;
            }
            changeCodeAtFocus(val);
            focusNextInput();
        },
        [changeCodeAtFocus, focusNextInput, getRightValue],
    );

    const onBlur = useCallback(() => {
        setActiveInput(-1);
    }, []);

    const handleOnKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            switch (e.key) {
                case 'Backspace':
                case 'Delete': {
                    e.preventDefault();
                    if (otpValues[activeInput]) {
                        changeCodeAtFocus('');
                    } else {
                        focusPrevInput();
                    }
                    break;
                }
                case 'ArrowLeft': {
                    e.preventDefault();
                    focusPrevInput();
                    break;
                }
                case 'ArrowRight': {
                    e.preventDefault();
                    focusNextInput();
                    break;
                }
                case ' ': {
                    e.preventDefault();
                    break;
                }
                default:
                    break;
            }
        },
        [
            activeInput,
            changeCodeAtFocus,
            focusNextInput,
            focusPrevInput,
            otpValues,
        ],
    );

    const handleOnPaste = useCallback(
        (e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            const pastedData = e.clipboardData
                .getData('text/plain')
                .trim()
                .slice(0, length - activeInput)
                .split('');
            if (pastedData) {
                let nextFocusIndex = 0;
                const updatedOTPValues = [...otpValues];
                updatedOTPValues.forEach((val, index) => {
                    if (index >= activeInput) {
                        const changedValue = getRightValue(
                            pastedData.shift() || val,
                        );
                        if (changedValue) {
                            updatedOTPValues[index] = changedValue;
                            nextFocusIndex = index;
                        }
                    }
                });
                setOTPValues(updatedOTPValues);
                setActiveInput(Math.min(nextFocusIndex + 1, length - 1));
            }
        },
        [activeInput, getRightValue, length, otpValues],
    );

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="text-base">{label}</label>}
            <div className="grid grid-cols-8 gap-2">
                {Array(length)
                    .fill('')
                    .map((_, index) => (
                        <BaseInput
                            key={index}
                            focus={activeInput === index}
                            autoFocus={true}
                            value={otpValues?.[index]}
                            onFocus={handleOnFocus(index)}
                            onChange={handleOnChange}
                            onKeyDown={handleOnKeyDown}
                            onBlur={onBlur}
                            onPaste={handleOnPaste}
                            disabled={disabled}
                        />
                    ))}
            </div>
        </div>
    );
};

const OTPInput = memo(OTPInputComponent);
export default OTPInput;
