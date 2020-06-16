const Discord = require('discord.js');
const client = new Discord.Client();


client.once("ready", () => {
	console.log("I am online!");
});

client.login(process.env.token);

client.on("message", message => {
	console.log(message.content);
	if(message.content === "ping") {
		message.channel.send("Pong!");
	}

	if(message.content === "d!stop") {
		client.off();
	}

	if(message.content === "d!help") {
		message.member.send(":hammer: The current commands are:");
		message.member.send("**d!help**");
		message.member.send("**d!say**");
		message.member.send("**d!version**");
		message.member.send("**d!discord**");
		message.member.send("**d!creator**");
		message.member.send(":smile: To setup a welcome and goodbye channel type d!join/leave setup");
		message.member.send("*More coming soon!*");
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

	if(message.content === "d!join/leave setup") {
		message.channel.send("Please create a new channel under the name welcome-goodbye, when you are done type d!yes");
		if(message.content === "d!yes") {
			message.channel.send("Setup complete...");
		}
	}

	if(message.content === "d!version") {
		message.channel.send("The current version is **0.1.1**");
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

});

client.on("guildMemberAdd", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`Welcome to our server, ${member}`);
});

client.on("guildMemberRemove", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`${member} just left`);
});