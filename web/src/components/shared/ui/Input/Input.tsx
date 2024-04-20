import clsx from 'clsx';
import React, { useState, useEffect, ChangeEvent } from 'react';

// Define generic props with a type parameter T
interface InputProps<T> {
	id?: string;
	defaultValue?: T;
	value?: T;
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	placeholder?: string;
	className?: string;
}

// Use the generic type parameter T for the component
export const Input = <T extends {}>({
	id,
	defaultValue,
	value,
	onChange,
	type = 'text',
	placeholder = '',
	className
}: InputProps<T>) => {
	// Internal state to manage uncontrolled component, using the generic type T
	const [internalValue, setInternalValue] = useState<T | undefined>(defaultValue);

	// Effect to sync internal state with controlled value prop, also using T
	useEffect(() => {
		if (value !== undefined) {
			setInternalValue(value);
		}
	}, [value]);

	// Handle input change
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		// Update internal state if uncontrolled
		if (onChange === undefined) {
			// Need to cast the value to type T
			// This might require a more specific handling based on the type of T
			setInternalValue(event.target.value as unknown as T);
		} else {
			// Call parent onChange handler if controlled
			onChange(event);
		}
	};

	return (
		<input
			id={id}
			type={type}
			placeholder={placeholder}
			className={clsx('rounded-2xl bg-white text-black p-4', className)}
			// Convert value to string for input value attribute
			value={(value !== undefined ? value : internalValue) as unknown as string}
			onChange={handleChange}
		/>
	);
};
