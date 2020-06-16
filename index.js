const Discord = require('discord.js');
const client = new Discord.Client();


client.once("ready", () => {
	console.log("I am online!");
});

client.login(process.env.token);

client.on("message", message => {
	if(message.content === "ping") {
		message.channel.send("Pong!");
	}

	if(message.content === "d!help") {
		message.member.send(":smile: **FUN** \n d!say \n :scroll: **INFO** \n d!help \n d!version \n d!discord \n d!creator \n :wave: **WELCOME & GOODBYE** \n d!join leave setup");
	}

	if(message.content === "d!nuke") {
		message.channel.send("LOL YOU THOUGHT, banned l o l");
	}

	if(message.content === "Hi") {
		message.channel.send("Yo, hi!");
	}

	if(message.content === "How are you?") {
		message.channel.send("Im very electronic, hbu?");
	}

	if(message.content === "Im good" || message.content === "Im awesome" || message.content === "Im great") {
		message.channel.send(":O Thats great!");
	}

	if(message.content === "Im bad" || message.content === "Im sad" || message.content === "Im auful") {
		message.channel.send("Oh no! Now im sad :crying_cat_face:");
	}

	if(message.content === "d!creator") {
		message.channel.send("This bot is made by **Dindi**, you can visit his youtube channel on https://www.youtube.com/channel/UCjqnUsIVtXHGyCd3q_qvqYQ");
	}

	if(message.content === "d!discord") {
		message.channel.send("You can visit the official Dindi Bot disord server on https://discord.gg/NddGpqR");
	}

	if(message.content === "d!join leave setup") {
		message.channel.send("Please create a new channel under the name welcome-goodbye, when you are done the bot will automaticly be sending welcome and goodbye messages to that channel. If it doesn't, check if the channel name is correct!");

	}

	if(message.content === "d!version") {
		message.channel.send("The current version is **0.1.2**");
	}

	// Say Command
	const sayPrefix = "d!say";
	const PREFIX = "d!";
	const args = message.content.substring(PREFIX.length).split(" ");
	const args2 = message.content.slice(sayPrefix.length).trim().split();

	switch(args[0]) {
	case "say":
		if(!message.client.bot) {
			message.channel.send(args2);
		}


		break;


	}

	// KICK AND BAN
	mention = message.mentions.users.first();

	if(message.startsWith (PREFIX + "ban")){
		if(!message.member.hasPermission("BAN_MEMBERS")){
			message.channel.send("You do not have the BAN_MEMBERS permission!")
			return;
		}
		if(mention == null){
			message.channel.send("You need to mention the member you want to ban!")
			return;
		}
		if(message.guild.member(mention).hasPermission("ADMINISTRATOR")){
			message.channel.send("You cannot ban this person.")
			return;
		}
		let reason = message.content.slice (PREFIX.length + mention.toString().length + 5);
		message.channel.send(mention.username + "has been banned :hammer:");
		mention.message.send("You have been banned because \n" + reason).then (d_msg => {
			message.guild.member(mention).ban(reason);
		})
	}

	if(message.startsWith (PREFIX + "kick")){
		if(!message.member.hasPermission("KICK_MEMBERS")){
			message.channel.send("You do not have the KICK_MEMBERS permission!")
			return;
		}
		if(mention == null){
			message.channel.send("You need to mention the member you want to kick!")
			return;
		}
		if(message.guild.member(mention).hasPermission("ADMINISTRATOR")){
			message.channel.send("You cannot kick this person.")
			return;
		}
		let reason = message.content.slice (PREFIX.length + mention.toString().length + 5);
		message.channel.send(mention.username + "has been kicked :hammer:");
		mention.message.send("You have been kicked because \n" + reason).then (d_msg => {
			message.guild.member(mention).kick(reason);
		})
	}
});

client.on("guildMemberAdd", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`Welcome to ${server}, ${member}`);
});

client.on("guildMemberRemove", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`${member} just left`);
});