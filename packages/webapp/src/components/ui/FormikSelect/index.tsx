/*!
 * Copyright (c) Microsoft. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project.
 */
import { Field } from 'formik'
import { memo } from 'react'
import Select from 'react-select'
import type { StandardFC } from '~types/StandardFC'
import { noop } from '~utils/noop'

// React select users js object style notation :(
export const reactSelectStyles = {
	valueContainer: (base: Record<string, any>): Record<string, any> => ({
		...base,
		paddingTop: '1px',
		paddingBottom: '1px'
	}),
	control: (base: Record<string, any>, state: { isFocused: boolean }): Record<string, any> => ({
		...base,
		border: state.isFocused ? '1px solid var(--bs-primary)' : '1px solid var(--bs-gray-4)',
		fontSize: '14px',
		lineHeight: '21px',
		minHeight: 43,
		borderRadius: '0.25rem',
		// This line disables the blue border
		boxShadow: 'none',
		'&:hover': {
			boxShadow: 'none',
			border: '1px solid var(--bs-primary)'
		}
	}),
	clearIndicator: (base: Record<string, any>): Record<string, any> => ({
		...base,
		padding: 4
	}),
	indicatorContainer: (base: Record<string, any>): Record<string, any> => ({
		...base,
		padding: 4
	}),
	dropdownIndicator: (base: Record<string, any>): Record<string, any> => ({
		...base,
		padding: 4
	}),
	menu: (base: Record<string, any>): Record<string, any> => ({
		...base,
		borderRadius: 0,
		padding: 0
	}),
	menuList: (base: Record<string, any>): Record<string, any> => ({
		...base,
		paddingTop: 0,
		paddingBottom: 0
	}),
	multiValue: (base: Record<string, any>): Record<string, any> => ({
		...base,
		borderRadius: '3rem',
		backgroundColor: 'var(--bs-dark)', // Taken from designs. would put in bootstrap styles if react select accepted css styles :(
		color: 'var(--bs-white)',
		paddingLeft: '4px',
		paddingRight: '4px'
	}),
	multiValueLabel: (base: Record<string, any>): Record<string, any> => ({
		...base,
		color: 'var(--bs-white)'
	}),
	multiValueRemove: (base: Record<string, any>): Record<string, any> => ({
		...base,
		backgroundColor: 'var(--bs-white)', // Taken from designs. would put in bootstrap styles if react select accepted css styles :(
		color: 'var(--bs-dark)',
		borderRadius: '100%',
		height: '18px',
		width: '18px',
		margin: 'auto'
	}),
	placeholder: (base: Record<string, any>): Record<string, any> => ({
		...base,
		color: 'var(--bs-text-muted)'
	})
}

export interface FormikSelectProps {
	name?: string
	placeholder?: string
	error?: string
	options?: Record<string, any>[]
	defaultValue?: {
		value: any
		label: string
	}
	onChange?: (any) => void
	onInputChange?: (any) => void
	loadOptions?: (inputValue: string, callback: () => void) => void
	isMulti?: boolean
}

export interface OptionType {
	label: string
	value: string
	__isNew__?: boolean
}

export const FormikSelect: StandardFC<FormikSelectProps> = memo(function FormikSelect({
	name,
	placeholder,
	onChange = noop,
	options,
	onInputChange = noop,
	loadOptions = noop,
	defaultValue,
	isMulti = false,
	...props
}) {
	return (
		<Field name={name}>
			{({
				field, // { name, value, onChange, onBlur }
				form,
				meta
			}) => {
				const d = (newValue: OptionType | OptionType[]) => {
					onChange(newValue)
					form.setFieldValue(field.name, (newValue as OptionType)?.value)
				}

				return (
					<>
						{/* <input type='text' placeholder='Email' {...field} /> */}
						<Select
							{...field}
							{...props}
							isClearable
							styles={reactSelectStyles}
							onChange={d}
							placeholder={placeholder}
							defaultValue={defaultValue}
							options={options}
							cacheOptions
							label={field?.value?.label}
							value={field?.value?.value}
							components={{
								IndicatorSeparator: () => null
							}}
						/>
						{meta.touched && meta.error && <div className='mt-2 text-danger'>{meta.error}</div>}
					</>
				)
			}}
		</Field>
	)
})
