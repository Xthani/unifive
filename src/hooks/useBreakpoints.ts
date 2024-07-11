import {useMemo} from 'react'


import {useWindowSize} from './useWindowSize'

export const breakpoints = {
	phone: 0,
	tabletV: 767,
	tabletH: 1024,
	web: 1181,
	fhd: 1920,
}
/**
 * returns object, that represents current window width state by breakpoints
 */
export const useBreakpoints = () => {
	const {width = 0} = useWindowSize()

	return useMemo(() => {
		/**
		 * @constant
		 * @type {boolean}
		 * isPhone - width >= 0 && width < 767
		 */
		const isPhone = width >= breakpoints.phone && width < breakpoints.tabletV
		/**
		 * @constant
		 * @type {boolean}
		 * isTabletV - width >= 767 && width < 1024
		 */
		const isTabletV = width >= breakpoints.tabletV && width < breakpoints.tabletH
		/**
		 * @constant
		 * @type {boolean}
		 * isTabletH - width >= 1024 && width < 1181
		 */
		const isTabletH = width >= breakpoints.tabletH && width < breakpoints.web
		/**
		 * @constant
		 * @type {boolean}
		 * isWeb - width >= 1181
		 */
		const isWeb = width >= breakpoints.web
		/**
		 * @constant
		 * @type {boolean}
		 * isGreaterThanTabletV - width >= 767
		 */
		const isGreaterThanTabletV = width >= breakpoints.tabletV
		/**
		 * @constant
		 * @type {boolean}
		 * isGreaterThanTabletH - width >= 767
		 */
		const isGreaterThanTabletH = width >= breakpoints.tabletH

		return {
			isTabletV,
			isTabletH,
			isPhone,
			isWeb,
			isGreaterThanTabletV,
			isGreaterThanTabletH,
		}
	}, [width])
}
