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
		message.channel.send("Help is sent your way!");
		message.member.send(":smile: **FUN** \n d!say \n d!8ball (text) \n d!randomnumber \n d!howcoolami \n \n :scroll: **INFO** \n d!help \n d!version \n d!discord \n d!creator \n d!logs setup \n \n :wave: **WELCOME & GOODBYE** \n d!join leave setup");
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
		message.channel.send("The current version is **0.1.25**");
	}

	if(message.content === "d!logs setup") {
		message.channel.send("Create a channel named logs, the bot should automatically start sending edit/delted messages logs. If it doesn't, check if the channel name is correct.");
	}

	if(message.content === "d!8ball") {
		message.channel.send((new Date()).toString);
	}

	if(message.content === "d!randomnumber") {
		message.channel.send(Math.floor(Math.random() * 1000000 + 1));
	}

	if(message.content === "d!howcoolami") {
		coolness = (Math.floor(Math.random() * 100 + 1));
		message.channel.send("You are " + coolness + "% cool");
	}

	// 8ball
	if(message.content.startsWith(PREFIX + "8ball")){
		var ListAnswers = ["Yes", "No", "Maybe", "I don't know", "Cool", "Maybe yes", "Maybe no", "Probably", "Probably not", "Ask again later"];
		var answers = Math.floor((Math.random() * ListAnswers.length));
		var arguments = message.content.split(" ").slice(1).join(" ");
		if(!arguments)return message.reply("Specify your question.");
		var embed = new Discord.RichEmbed()
		.setColor("BLUE")
		.setTitle("8Ball")
		.setThumbnail(message.author.avatarURL)
		.addField("Question", arguments, false)
		.addField("asked by", message.author.tag, false)
		.addField("Answer:", answers[ListAnswers], false)
		.setFooter(message.author.tag, message.author.avatarURL)

		message.channel.send(embed);
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

	channel.send(`Welcome to ${server}, ${member}`);
});

client.on("guildMemberRemove", member => {
	// eslint-disable-next-line no-shadow
	const channel = member.guild.channels.cache.find(channel => channel.name === "welcome-goodbye");
	if(!channel) return;

	channel.send(`${member} just left`);
});

client.on("messageUpdate", async(oldMessage, newMessage) => {
	if(oldMessage.content === newMessage.content){
		return;
	}
	var logChannel = client.channels.find(channel => channel.name === "logs");
	let logEmbed = new Discord.RichEmbed()
	.setAuthor(oldMessage.setAuthor.tag, oldMessage.author.avatarURL)
	.setThumbnail(oldMessage.author.avatarURL)
	.setcolor("BLUE")
	.setDescription("Message Edited")
	.addField("Before", oldMessage.content, true)
	.addField("After", newMessage.content, true)
	logChannel.send(logEmbed);
})

client.on("messageDelete", async message => {
	var logChannel = client.channels.find(channel => channel.name === "logs");
	let logEmbed = new Discord.RichEmbed()
	.setAuthor(oldMessage.setAuthor.tag, oldMessage.author.avatarURL)
	.setThumbnail(oldMessage.author.avatarURL)
	.setcolor("RED")
	.setDescription(":no_entry_sign: Message Deleted")
	.addField("Message", message.content, true)
	logChannel.send(logEmbed);
})