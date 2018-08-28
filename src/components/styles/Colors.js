




class Colors {
	constructor() {

		this.primary = {
			defaultColor : '#b71c1c',
			lightColor:	'#f05545',
			darkColor: '#7f0000',
			textOnPrimary: '#ffffff',
			textInactiveOnPrimary:  "#fafafa",
			containerColor:'#fff',
			containerColorInverse:'#fff',
			barStyle: "dark-content",
			textDark: "rgba(0,0,0,0.6)",
			containerDark: "#000"

		}
		this.secondary = {
			textOnSecondary:  "#000000",
			defaultColor: '#ffab00'
		}

	}

	setDarkTheme(){
		this.primary = {
			defaultColor : '#e65100',
			lightColor:	'#ff833a',
			darkColor: '#ac1900',
			textOnPrimary: '#ffffff',
			textInactiveOnPrimary:  "#fafafa",
			containerColor:'#212121',
			containerColorInverse:'#000',
			barStyle: "light-content",
			textDark: "#fff",
			containerDark: "#000"
		}
		this.secondary = {
			textOnSecondary:  "#fff",
			defaultColor: '#ffab00'
		}
	}
}



export default  new Colors()