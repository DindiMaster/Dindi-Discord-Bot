const Discord = require('discord.js');
const fetch = require("node-fetch");
const client = new Discord.Client();

const ms = require("ms");

const bot = new Discord.Client();
const prefix = "d!"

let { welcomeChannel } = require('./channel.json')
let { goodbyeChannel } = require('./channel.json')
let { logsChannel } = require('./channel.json')

client.once("ready", () => {
	console.log("I am online!");
});

client.login(process.env.token);


client.on("ready", () => {
	client.user.setActivity('d!help' , { type: 'STREAMING'})
})

client.on("message", async message => {
	const bot = new Discord.Client();
	if(message.author.bot) return;

	// HELP COMMANDS

	if(message.content === ("d!help")) {
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!quiz \n d!8ball (question) \n d!randomnumber \n d!howcoolami \n d!howcoolis (@user) \n d!react (message)")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink \n d!ping")
		.addField(":wave: **WELCOME & GOODBYE**", "d!welcomechannelsetup #(channel) \n d!goodbyechannelsetup #(channel) \n d!greetings support")
		.addField(":e_mail: **LOGS**", "d!logschannelsetup #(channel)")
		.addField("**Dindi Bot needs the following permissions for all the commands to work properly:**", "Read Messages \n Send Messages \n Embed Links \n Manage Messages \n Add Reactions \n Read Message History \n Ban Members \n Kick Members")
		.addField("***Don't forget to support the development of Dindi Bot by voting for it on the following website:***", "https://top.gg/bot/722395531971657738")
		message.member.send(helpembed);
		message.channel.send("Help menu sent! If you don't get a DM with it try to type d!helpinchannel to show the help menu in your current channel!")
	}

	if(message.content === ("d!helpinchannel")) {
		if(!message.bot.hasPermission("EMBED_LINKS"))return channel.message.send("I need the Embed Links permission to do this!");
		const helpembed = new Discord.MessageEmbed()
		.setTitle("HELP MENU")
		.addField(":smile: **FUN**", "d!say \n d!quiz \n d!8ball (question) \n d!randomnumber \n d!howcoolami \n d!howcoolis (@user) \n d!react (message)")
		.addField(":hammer: **MODERATION**", "d!kick (user) (reason) \n d!ban (user) (reason)")
		.addField(":scroll: **INFO**", "d!help \n d!poll (question) \n d!version \n d!discord \n d!creator \n d!invitelink \n d!ping")
		.addField(":wave: **WELCOME & GOODBYE**", "d!welcomechannelsetup #(channel) \n d!goodbyechannelsetup #(channel) \n d!greetings support")
		.addField(":e_mail: **LOGS**", "d!logschannelsetup #(channel)")
		.addField("**Dindi Bot needs the following permissions for all the commands to work properly:**", "Read Messages \n Send Messages \n Embed Links \n Manage Messages \n Add Reactions \n Read Message History \n Ban Members \n Kick Members")
		.addField("***Don't forget to support the development of Dindi Bot by voting for it on the following website:***", "https://top.gg/bot/722395531971657738")
		message.channel.send(helpembed);
	}

	// CONVERSATION COMMANDS

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

	// INFORMATION COMMANDS

	if(message.content === ("d!creator")) {
		message.channel.send("This bot is made by **Dindi**, you can visit his youtube channel on https://www.youtube.com/channel/UCjqnUsIVtXHGyCd3q_qvqYQ");
	}

	if(message.content === ("d!support")) {
		message.channel.send("You can visit the official Dindi Bot disord server on https://discord.gg/NddGpqR");
	}

	if(message.content === ("d!greetings support")){
		message.channel.send("**These are the following problems that could be blocking Dindi Bot from sending welcome and goodbye messages:** \n \n \n **The bot doesn't have the permission to send or view messages in the 👋-welcome-goodbye channel** \n in this case you need to go to the channels permission settings and enable the following permissions for the Dindi Bot role: **Read Messages** and **Send Messages** \n \n **The bot got a new update and the channels reset** \n In this case you just need to reset the welcome/goodbye channel with d!welcomechannelsetup and d!goodbyechannelsetup commands \n \n If you everything on the list and the bot still isn't working type d!discord and join the Dindi Bot discord support server, you will get direct help from there.");
	}

	if(message.content === ("d!version")) {
		message.channel.send("The current version is **0.1.7**");
	}

	if(message.content === ("d!invite")) {
		message.channel.send("You can invite Dindi Bot to your own server via the following link: \n https://discord.com/oauth2/authorize?client_id=722395531971657738&scope=bot&permissions=2146958847");
	}

	if(message.content == ("d!ping")){
		const msg = await message.channel.send("Pinging...");
		const latency = msg.createdTimestamp - message.createdTimestamp;
		msg.edit(`My current latency is ${latency}ms`);
	}

	// POLLS
	if(message.content.startsWith("d!poll")){
		if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This command requires the permission: **Manage Messages**");
		var pollargs = message.content.split(" ").slice(1).join(" ");
		if(!pollargs[0]) return message.channel.send("Proper Usage: d!poll (question)");
		const pollembed = new Discord.MessageEmbed()
		.setTitle(`Poll by ${message.author.tag}`)
		.addField(`Question:`, `${pollargs}`)
		.setFooter("React to vote!")
		const pollmsg = await message.channel.send(pollembed);
		pollmsg.react("👍");
		pollmsg.react("👎");
		message.delete();

	}


	// FUN COMMANDS

	// QUIZ
	if(message.content === ("d!quiz")){
		message.channel.send("In the process of making...")
	}

	if(message.content === ("d!randomnumber")) {
		message.channel.send(Math.floor(Math.random() * 1000000 + 1));
	}

	if(message.content === ("d!howcoolami")) {
		coolness = (Math.floor(Math.random() * 100 + 1));
		message.channel.send("You are " + coolness + "% cool");
	}

	if(message.content.startsWith("d!howcoolis")) {
		coolness = (Math.floor(Math.random() * 100 + 1));
		message.channel.send("They are " + coolness + "% cool");
	}

	if(message.content.startsWith("d!react")){
		var reactions = ["😄", "😎", "🤡", "😂", "👍", "👎", "😢", "👏", "⭐", "🤦‍♂️"];
		var reaction = reactions[Math.floor(Math.random() * reactions.length)-1];
		message.react(reaction);
	}

	// 8ball
	if(message.content.startsWith("d!8ball")){
		var ListAnswers = ["Yes", "No", "Maybe", "I don't know", "Cool", "Maybe yes", "Maybe no", "Probably", "Probably not", "Ask again later"];
		var answer = ListAnswers[Math.floor(Math.random() * ListAnswers.length)-1];
		var arguments = message.content.split(" ").slice(1).join(" ");
		if(!arguments)return message.reply("Specify your question.");
		const ballembed = new Discord.MessageEmbed()
		.setTitle("8Ball")
		.addField("Your question: ", arguments)
		.addField("My answer: ", answer)
		message.channel.send(ballembed);
	}

	// Say Command
	const sayPrefix = "d!say";
	const PREFIX = "d!";
	const args = message.content.substring(PREFIX.length).split(" ");
	const args2 = message.content.slice(sayPrefix.length).trim().split();
	if(args.content === "@everyone" || args.content === "@here"){
		return;
	}
	if(message.author.bot){
		return;
	}

	switch(args[0]) {
	case "say":
		if(!message.client.bot) {
			message.channel.send(args2);
		}

		message.delete();
		break;


	}

	// WELCOME & GOODBYE SETUP

	if(message.content.startsWith(`${prefix}welcomechannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS']))return message.channel.send("You do not have the Manage Channels permission!");

		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet = args[0].replace("<#", "");
		channelSet = channelSet.replace(">", "");
		welcomeChannel = channelSet;
		
		message.channel.send("#"+welcomeChannel + " now set as the welcome channel! If the bot isn't sending welcome messages do d!greetings support.");
	}

	if(message.content.startsWith(`${prefix}goodbyechannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS'])){
			message.channel.send("You do not have the Manage Channels permission!");
			return;
		}
		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet2 = args[0].replace("<#", "");
		channelSet2 = channelSet2.replace(">", "");
		goodbyeChannel = channelSet2;
		
		message.channel.send("#"+goodbyeChannel + " now set as the goodbye channel! If the bot isn't sending goodbye messages do d!greetings support.");
	}

	// LOGS CHANNEL SETUP
	if(message.content.startsWith(`${prefix}logschannelsetup`))
	{
		if(!message.member.hasPermission(['MANAGE_CHANNELS']))return message.channel.send("You do not have the Manage Channels permission!");

		let numberOfLine =    message.content.slice(prefix.lenght).split(" ");
		let args = numberOfLine.slice(1);

		let channelSet3 = args[0].replace("<#", "");
		channelSet3 = channelSet3.replace(">", "");
		logsChannel = channelSet3;
		
		message.channel.send("#"+logsChannel + " now set as the logs channel! If the bot isn't sending log messages do d!greetings support.");
	}

	// BAN/KICK
	mention = message.mentions.users.first();

	if(message.content.startsWith (PREFIX + "ban")){
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
		message.channel.send(mention.username + " has been banned :hammer: for " + reason);
		message.guild.member(mention).ban(reason);
		const logchannel = message.guild.channels.cache.find(channel => channel.id === logsChannel);
		if(!logchannel) return;
		logchannel.send(mention.username + " has been banned for " + reason);
	}

	if(message.content.startsWith (PREFIX + "kick")){
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
		message.channel.send(mention.username + " has been kicked :hammer: for " + reason);
		message.guild.member(mention).kick(reason);
		const logchannel = message.guild.channels.cache.find(channel => channel.id === logsChannel);
		if(!logchannel) return;
		logchannel.send(mention.username + " has been kicked for " + reason);
	}

	// BAD WORDS
	if(message.content.includes("nigga") || message.content.includes("niggar") || message.content.includes("ni gga") || message.content.includes("ni ggar") || message.content.includes("Nigga") || message.content.includes("Niggar")){
		message.delete();
		message.channel.send("Hey! Watch your language you racist 😠");
	}
});

client.on("guildMemberAdd", member => {
	const channel = member.guild.channels.cache.find(channel => channel.id === welcomeChannel);
	if(!channel) return;

	channel.send(`${member} just joined! Give them a warm welcome :wave:`);
});

client.on("guildMemberRemove", member => {
	const channel = member.guild.channels.cache.find(channel => channel.id === goodbyeChannel);
	if(!channel) return;

	channel.send(`${member} just left :cry:`);
});
