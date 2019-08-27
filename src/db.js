const users = [
	{
		id: '1',
		name: 'Mago',
		email: 'mago@test.com'
	},
	{
		id: '2',
		name: 'Sarah',
		email: 'sarah@test.com',
		age: 24
	},
	{
		id: '3',
		name: 'Mike',
		email: 'mike@test.com'
	}
]

const posts = [
	{
		id: '10',
		title: 'GraphQL 101',
		body: 'This is how to use GraphQL...',
		published: false,
		author: '1'
	},
	{
		id: '11',
		title: 'GraphQL 201',
		body: 'Advanced features with GraphQL...',
		published: true,
		author: '1'
	},
	{
		id: '12',
		title: 'Programming music',
		body: '',
		published: false,
		author: '2'
	}
]

const comments = [
	{
		id: '100',
		text: 'This worked well for me. Thanks!',
		author: '1',
		post: '11'
	},
	{
		id: '101',
		text: 'Glad you enjoyed it!',
		author: '2',
		post: '11'
	},
	{
		id: '102',
		text: 'This not work!',
		author: '3',
		post: '11'
	},
	{
		id: '103',
		text: 'Oh, nevermind i solved!',
		author: '3',
		post: '11'
	},
	{
		id: '104',
		text: 'Cool post!',
		author: '3',
		post: '12'
	}
]

const db = {
	users,
	posts,
	comments
}

export { db as default }
