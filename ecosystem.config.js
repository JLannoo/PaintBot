module.exports = {
	apps: [{
		name: 'PaintBot',
		watch: '.',
		ignore_watch: ['node_modules', 'public', 'build', 'ecosystem.config.js'],
		script: './build/index.js',
		log_date_format: 'YYYY-MM-DD HH:mm',
		env: {
			NODE_ENV: 'production',
		},
	}],

	deploy: {
		production: {
			'user': 'SSH_USERNAME',
			'host': 'SSH_HOSTMACHINE',
			'ref': 'origin/master',
			'repo': 'GIT_REPOSITORY',
			'path': 'DESTINATION_PATH',
			'pre-deploy-local': '',
			'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
		},
	},
};
