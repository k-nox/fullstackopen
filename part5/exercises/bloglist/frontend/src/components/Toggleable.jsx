import { useImperativeHandle } from 'react'
import { forwardRef, useState } from 'react'

export const Toggleable = forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false)

	const toggleVisibility = () => {
		setVisible(!visible)
	}

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility,
		}
	})

	return (
		<div>
			<div className={visible ? 'hide' : ''}>
				<button onClick={toggleVisibility}>{props.showLabel}</button>
			</div>
			<div className={visible ? '' : 'hide'}>
				{props.children}
				<button onClick={toggleVisibility}>{props.cancelLabel}</button>
			</div>
		</div>
	)
})
