import routesComponent from './routesComponent.js'

export default [{
		path: '/',
		name: 'Main',
		component: routesComponent.Main

	},
	{
		path: '/nav',
		name: 'Nav',
		component: routesComponent.Nav,

	},
	{
		path: '/detail/:pid',
		name: 'Detail',
		component: routesComponent.Detail
	},
	{
		path: '/intro/:pid',
		name: 'Intro',
		component: routesComponent.Intro
	},
	{
		path: '/chapter/:pid',
		name: 'Chapter',
		component: routesComponent.Chapter
	},
	{
		path: '/setion/:pid',
		name: 'Setion',
		component: routesComponent.Setion
	},
	{
		path: '/ranking/:pid',
		name: 'Ranking',
		component: routesComponent.Ranking
	}, {
		path: '/bookstrap',
		name: 'Bookstrap',
		component: routesComponent.Bookstrap

	},
	{
		path: '/booklist',
		name: 'Booklist',
		component: routesComponent.Booklist

	},
	{
		path: '/carttoon',
		name: 'Carttoon',
		component: routesComponent.Carttoon

	},
	{
		path: '/mine',
		name: 'Mine',
		component: routesComponent.Mine

	},
	{
		path: '/search',
		name: 'Search',
		component: routesComponent.Search

	},
	{
		path: '/login',
		name: 'Login',
		component: routesComponent.Login

	},
	{
		path: '/register',
		name: 'Register',
		component: routesComponent.Register

	}
]