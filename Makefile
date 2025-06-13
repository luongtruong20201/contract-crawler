dev:
	yarn start:dev
	
producer:
	yarn console -- crawler --name producer

consumer:
	yarn console -- crawler --name consumer

pm2:
	pm2 start pm2.json